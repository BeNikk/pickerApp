// VehicleForm.tsx
"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "../Image"; // Ensure correct path to Image component

export interface VehicleFormInput {
  sealNumber: string;
  vehicleFullPhoto: string[];
  lockedSealPhoto: string[];
}

interface VehicleFormProps {
  onSubmit: (data: VehicleFormInput) => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VehicleFormInput>();
  const [vehicleFullPhotos, setVehicleFullPhotos] = useState<string[]>([]);
  const [lockedSealPhotos, setLockedSealPhotos] = useState<string[]>([]);

  const submitForm: SubmitHandler<VehicleFormInput> = (data) => {
    data.vehicleFullPhoto = vehicleFullPhotos;
    data.lockedSealPhoto = lockedSealPhotos;
    onSubmit(data);
    reset(); // Reset form after submission
    setVehicleFullPhotos([]);
    setLockedSealPhotos([]);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-4 p-4"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="sealNumber" className="font-medium text-gray-700">
          Seal Number:
        </label>
        <input
          type="text"
          {...register("sealNumber", { required: true })}
          id="sealNumber"
          placeholder="Seal Number"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.sealNumber && (
          <span className="text-red-500 text-sm">This field is required</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="vehicleFullPhoto" className="font-medium text-gray-700">
          Vehicle Full Photo:
        </label>
        <Image
          files={vehicleFullPhotos}
          setFiles={setVehicleFullPhotos}
          loading={false} // Set loading state as needed
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="lockedSealPhoto" className="font-medium text-gray-700">
          Locked Seal Photo:
        </label>
        <Image
          files={lockedSealPhotos}
          setFiles={setLockedSealPhotos}
          loading={false} // Set loading state as needed
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 px-5 py-2 text-white rounded-lg mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default VehicleForm;
