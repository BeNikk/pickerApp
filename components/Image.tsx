"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

const Image = ({
  files,
  setFiles,
  loading,
}: {
  loading: boolean;
  files: string[];
  setFiles: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [flashlight, setFlashlight] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  const handleDevices = React.useCallback(
    (mediaDevices: any) =>
      setDevices(
        mediaDevices.filter(
          ({ kind }: { kind: MediaDeviceKind }) => kind === "videoinput"
        )
      ),
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const removeHandler = (image: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== image));
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    deviceId: selectedDeviceId!,
    facingMode: "environment",
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot()!;
    console.log(imageSrc);
    setUploading(imageSrc);
    if (imageSrc) {
      const formData = new FormData();
      const file = dataURItoFile(imageSrc, `webcam_${Date.now()}.jpeg`);
      formData.append("file", file);
      formData.append("upload_preset", "xegfefoc");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dfvyupsy0/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const imageUrl = data.secure_url;
      setFiles((prevFiles) => [...prevFiles, imageUrl]);
    }
    setUploading(null);
  }, [webcamRef, setFiles]);

  const dataURItoFile = (dataURI: string, filename: string) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([ab], filename, { type: mimeString });
  };

  const toggleFlashlight = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const videoTrack = webcamRef.current?.stream?.getVideoTracks()[0];
    if (videoTrack) {
      const capabilities = videoTrack.getCapabilities();
      //@ts-ignore
      if (capabilities.torch) {
        try {
          await videoTrack.applyConstraints({
            //@ts-ignore
            advanced: [{ torch: !flashlight }],
          });
          setFlashlight(!flashlight);
        } catch (error) {
          console.error("Failed to toggle flashlight:", error);
          alert("Failed to toggle flashlight.");
        }
      } else {
        console.log("Flashlight not supported");
        alert("Flashlight not supported on this device.");
      }
    } else {
      console.log("No video track found");
      alert("No video track found.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="flex flex-row flex-wrap justify-center items-center gap-5 w-full">
        {files.map((image: string, index: number) => (
          <div
            key={index}
            className="relative flex gap-1 flex-wrap flex-col items-center justify-center"
          >
            <img
              className="max-h-[200px] max-w-[200px]"
              src={image}
              alt="image"
            />
            <button
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                removeHandler(image);
              }}
              className="text-white absolute -top-2 -right-1 flex items-center justify-center bg-pink-700 cursor-pointer w-5 h-5 rounded-full text-sm px-2 py-2"
            >
              X
            </button>
          </div>
        ))}
        {uploading && (
          <div className="shimmer">
            <img src={uploading} className="opacity-0" alt="" />
          </div>
        )}
        <div className="w-[320px]">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        </div>
      </div>

      <div>
        <select
          id="camera"
          onChange={(e) => setSelectedDeviceId(e.target.value)}
          value={selectedDeviceId || ""}
        >
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${device.deviceId}`}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button
          disabled={loading}
          className="border-2 rounded-xl px-2 py-3"
          onClick={(e) => {
            e.preventDefault();
            capture();
          }}
        >
          Capture photo
        </button>
        <button
          disabled={loading}
          className={`border-2 rounded-xl px-2 py-3 ${
            flashlight ? "bg-green-400" : "bg-slate-200"
          }`}
          onClick={(e) => toggleFlashlight(e)}
        >
          {flashlight ? "Turn off Flashlight" : "Turn on Flashlight"}
        </button>
      </div>
    </div>
  );
};

export default Image;
