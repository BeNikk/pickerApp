import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "./Image";
import Modal from "react-responsive-modal";

export interface SealPhoto {
  sealNo: string;
  "Seal Photo": string[];
}

export interface FormInput {
  Route: number;
  "Qty-kgs": number;
  "Qty-pcs"?: number;
  "Seal No": SealPhoto[];
  "Sub Category"?: string;
  Category?: string;
  Remarks: string;
  images: string[];
  "Item Photo": string[]; // Updated to include Item Photo
  Item: string;
  Amount: number;
  Rate: number;
}

const Form2 = ({
  setData,
  setLoading,
  loading,
  edit,
  payload,
  index,
}: {
  setData: Dispatch<SetStateAction<FormInput[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  edit: boolean;
  payload: FormInput | null;
  index: number | null;
}) => {
  const [files, setFiles] = useState<string[]>([]); // State for item photos (used during form addition)
  const [itemPhotos, setItemPhotos] = useState<string[]>([]); // State for item photos (to display in preview)
  const [sealPhotos, setSealPhotos] = useState<{ [key: string]: string[] }>({});
  const [newSeal, setNewSeal] = useState<string>("");
  const [editSeal, setEditSeal] = useState(false);
  const [open, setOpen] = useState(false);
  const [sealConfirmOpen, setSealConfirmOpen] = useState(false); // State for seal confirmation modal

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormInput>();
  const {
    fields: sealFields,
    append: appendSeal,
    remove: removeSeal,
  } = useFieldArray({
    control,
    name: "Seal No",
  });

  const addItem: SubmitHandler<FormInput> = async (data) => {
    if (!edit) {
      setData((prevData) => [
        ...prevData,
        {
          ...data,
          images: files, // Include item photos in the form data
          "Item Photo": itemPhotos, // Update item photos separately
          "Seal No": sealFields.map((field) => ({
            sealNo: field.sealNo,
            "Seal Photo": sealPhotos[field.id] || [],
          })),
        },
      ]);
      toast.success("Item Added");
      window.scrollTo(0, 0);
      sealFields.map((field, index) => removeSeal(index));
      reset();
      reset({ "Seal No": [] });
      setFiles([]);
      setItemPhotos([]);
      setSealPhotos({});
    }
  };

  const addSeal = () => {
    if (newSeal.trim()) {
      appendSeal({ sealNo: newSeal, "Seal Photo": [] });
      setSealPhotos((prev) => ({
        ...prev,
        [newSeal]: [],
      }));
      setNewSeal("");
    }
  };

  const showSealConfirmation = () => {
    setSealConfirmOpen(true);
  };

  const confirmSeal = () => {
    // Add logic here for confirming seal
    setSealConfirmOpen(false);
  };

  const cancelSealConfirmation = () => {
    setSealConfirmOpen(false);
  };

  return (
    <div>
      {/* Form Section */}
      <form
        name="submit-to-google-sheet"
        className={`flex justify-center flex-col gap-4 p-4 ${
          !loading && "block"
        }`}
        onSubmit={handleSubmit(addItem)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="item" className="font-medium text-gray-700">
            Item:
          </label>
          <input
            type="text"
            {...register("Item", { required: true })}
            id="item"
            placeholder="Item"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors["Item"] && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="qty" className="font-medium text-gray-700">
            Qty(kgs):
          </label>
          <input
            type="number"
            {...register("Qty-kgs", { required: true })}
            id="qty"
            placeholder="Qty(kgs)"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors["Qty-kgs"] && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="unit" className="font-medium text-gray-700">
            Qty(pcs):
          </label>
          <input
            type="number"
            {...register("Qty-pcs")}
            id="unit"
            placeholder="Qty(pcs)"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors["Qty-pcs"] && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="rate" className="font-medium text-gray-700">
            Rate:
          </label>
          <input
            type="number"
            {...register("Rate", { required: true })}
            id="rate"
            placeholder="Rate"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors["Rate"] && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="amount" className="font-medium text-gray-700">
            Amount:
          </label>
          <input
            type="number"
            {...register("Amount", { required: true })}
            id="amount"
            placeholder="Amount"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors["Amount"] && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        {/* Item Photo Section - Display only in the form */}
        <div className="flex flex-col gap-1">
          <label htmlFor="itemPhoto" className="font-medium text-gray-700">
            Item Photo:
          </label>
          <Image files={files} setFiles={setFiles} loading={loading} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="sealNo" className="font-medium text-gray-700">
            Seal No:
          </label>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row flex-wrap gap-2">
              {sealFields.map((field, index) => (
                <div
                  className="flex flex-row items-center rounded-md w-fit px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  key={field.id}
                >
                  <span className="p-2">{field.sealNo}</span>
                  {!editSeal && (
                    <button
                      type="button"
                      className="bg-red-500 flex justify-center items-center text-[10px] w-5 h-5 rounded-full text-white"
                      onClick={() => removeSeal(index)}
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
            </div>

            <input
              type="text"
              value={newSeal}
              onChange={(e) => setNewSeal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSeal();
                }
              }}
              placeholder="Seal No"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="bg-blue-500 px-3 py-2 rounded-xl text-white ml-2"
              onClick={() => {
                if (editSeal) {
                  setEditSeal(false);
                  return;
                }
                setOpen(true);
              }}
            >
              {editSeal ? "Edit" : "Add"} Seal
            </button>

            <Modal open={open} center={true} onClose={() => setOpen(false)}>
              <div className="px-5 py-3 flex flex-col gap-5">
                <p className="text-xl font-bold">
                  Are you sure you want to add these seals?
                </p>
                <div className="flex flex-row gap-2 flex-wrap">
                  {sealFields.map((field, index) => (
                    <div
                      className="flex flex-row items-center rounded-md w-fit px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      key={field.id}
                    >
                      <span className="p-2">{field.sealNo}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setEditSeal(true);
                      setOpen(false);
                    }}
                    className="bg-blue-500 px-3 py-1 rounded-lg text-white"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="bg-gray-300 px-3 py-1 rounded-lg text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-green-500 px-5 py-2 text-white rounded-lg mt-4 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>

      {/* Preview Section */}
      {!loading && payload && (
        <div className="flex flex-col gap-4 p-4">
          <h2 className="text-xl font-bold">Preview Item</h2>
          <div>
            <p>
              <span className="font-bold">Item:</span> {payload.Item}
            </p>
            <p>
              <span className="font-bold">Qty(kgs):</span> {payload["Qty-kgs"]}
            </p>
            {payload["Qty-pcs"] && (
              <p>
                <span className="font-bold">Qty(pcs):</span>{" "}
                {payload["Qty-pcs"]}
              </p>
            )}
            <p>
              <span className="font-bold">Rate:</span> {payload.Rate}
            </p>
            <p>
              <span className="font-bold">Amount:</span> {payload.Amount}
            </p>
            <p>
              <span className="font-bold">Remarks:</span> {payload.Remarks}
            </p>
            {payload["Item Photo"].length > 0 && (
              <div className="flex flex-row gap-4 mt-4">
                {payload["Item Photo"].map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Item Photo ${index + 1}`}
                    className="max-w-[150px] max-h-[150px] object-contain"
                  />
                ))}
              </div>
            )}
            <div className="flex flex-col gap-4 mt-4">
              <h3 className="text-lg font-bold">Seal Numbers:</h3>
              {payload["Seal No"].map((seal, index) => (
                <div key={index} className="flex flex-row items-center gap-2">
                  <span className="font-bold">{seal.sealNo}</span>
                  {seal["Seal Photo"].length > 0 && (
                    <div className="flex flex-row gap-2">
                      {seal["Seal Photo"].map((photo, photoIndex) => (
                        <img
                          key={photoIndex}
                          src={photo}
                          alt={`Seal Photo ${photoIndex + 1}`}
                          className="max-w-[50px] max-h-[50px] object-contain"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Seal Confirmation Modal */}
      <Modal
        open={sealConfirmOpen}
        center={true}
        onClose={() => setSealConfirmOpen(false)}
      >
        <div className="px-5 py-3 flex flex-col gap-5">
          <p className="text-xl font-bold">Confirm Seals:</p>
          <div className="flex flex-row gap-2 flex-wrap">
            {sealFields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-row items-center rounded-md w-fit px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="p-2">{field.sealNo}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={confirmSeal}
              className="bg-blue-500 px-3 py-1 rounded-lg text-white"
            >
              Confirm
            </button>
            <button
              onClick={cancelSealConfirmation}
              className="bg-gray-300 px-3 py-1 rounded-lg text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Form2;
