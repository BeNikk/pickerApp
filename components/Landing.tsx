import CustomerCard from "./CustomerCard";
import LandingBar from "./nested/LandingBar";
import { Button } from "./ui/button";
import Link from "next/link";

const customerDetail = [
  {
    customerId: "abc",
    customerName: "Nikhil",
    customerLocation: "Rohini",
  },
  {
    customerId: "abcw",

    customerName: "xyz",
    customerLocation: "okhkla",
  },
  {
    customerId: "abcd",

    customerName: "abc",
    customerLocation: "abc",
  },
];

const Landing = () => {
  return (
    <div className="flex flex-col ">
      <div>
        <LandingBar />
      </div>
      <div className="mt-6 flex flex-row justify-evenly">
        <div>
          {/* should come from data fetch */}
          <h1 className="font-semibold text-xl">Total Pickups </h1>
          <p className="font-semibold text-xl">3</p>
        </div>
        <div>
          <h1 className="font-semibold text-xl">Total Purchase</h1>
          <p className="font-semibold text-xl">2500</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center justify-between gap-6 flex-1 ">
        {customerDetail.map((customer) => (
          <CustomerCard
            key={customer.customerId}
            customerId={customer.customerId}
            customerName={customer.customerName}
            customerLocation={customer.customerLocation}
          />
        ))}
      </div>
      <div className="mt-6 flex justify-center min-w-12">
        <Link href={"/vehicleFull"}>
          <Button variant={"destructive"}> Vehicle Full </Button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
