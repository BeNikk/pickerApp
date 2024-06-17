// MainPage.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import VehicleForm, {
  VehicleFormInput,
} from "../../components/nested/VehicleForm";

const MainPage = () => {
  const router = useRouter();

  const handleSubmit = (data: VehicleFormInput) => {
    console.log("Submitting vehicle details:", data);
    // Perform submission logic here (e.g., API call)
    // After submission, navigate back to the main page or perform another action
    router.push("/"); // Example navigation back to main page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Vehicle Full Form</h1>
      <div className="w-1/2">
        <VehicleForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default MainPage;
