"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Form2, { FormInput } from "@/components/Form2";
import { useRouter } from "next/navigation";
const Page = () => {
  const [data, setData] = useState<any>([]); // State to store form data
  const [isActive, setIsActive] = useState(false); // State to toggle between form and preview

  const router = useRouter();

  const handleSubmit = async () => {
    console.log("Submitting items:", data);
    // Perform submission logic here
    try {
      // Navigate back to the main page after successful submission
      router.push("/"); // Replace with your actual main page URL
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error if needed
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-evenly">
        <div>
          <input type="date" />
        </div>
        <div>
          <h1> Customer ID</h1>
        </div>
        <div>Logout</div>
      </div>
      {!isActive && (
        <div className="mt-12 flex flex-row justify-center">
          <Button onClick={() => setIsActive(true)}>Add items</Button>
        </div>
      )}

      {isActive && (
        <Form2
          setData={(newData: FormInput[] | any) => {
            setData(newData);
            setIsActive(false); // Close the form after adding item
          }}
          loading={false} // You can manage loading state if needed
          setLoading={() => {}} // Dummy setLoading function
          edit={false}
          payload={null}
          index={null}
          // data={data}
        />
      )}

      <div className="mt-12 flex flex-row justify-center min-w-24">
        <Button
          className="bg-green-500 text-white font-bold"
          onClick={handleSubmit}
          disabled={data.length === 0}
        >
          Submit items
        </Button>
      </div>

      <div className="mt-12 flex flex-col items-center">
        {data.map((item: any, index: any) => (
          <div key={index} className="border p-4 m-2 w-1/2">
            <h3 className="font-bold">Item {index + 1}</h3>
            <p>Item: {item.Item}</p>
            <p>Quantity (kgs): {item["Qty-kgs"]}</p>
            <p>Rate: {item.Rate}</p>
            <p>Amount: {item.Amount}</p>
            <div>
              <h4>Seals:</h4>
              {item["Seal No"].map((seal: any, sealIndex: any) => (
                <div key={sealIndex}>
                  <p>{seal.sealNo}</p>
                  <div>
                    {seal["Seal Photo"].map((photo: any, photoIndex: any) => (
                      <img
                        key={photoIndex}
                        src={photo}
                        alt={`Seal Photo ${photoIndex}`}
                        className="w-16 h-16 object-cover"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h4>Item Photos:</h4>
              {item["Item Photo"].map((photo: any, photoIndex: any) => (
                <img
                  key={photoIndex}
                  src={photo}
                  alt={`Item Photo ${photoIndex}`}
                  className="w-16 h-16 object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
