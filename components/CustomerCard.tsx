import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const CustomerCard = ({
  customerName,
  customerLocation,
  customerId,
}: {
  customerName: string;
  customerLocation: string;
  customerId: string;
}) => {
  return (
    <Link href={`/customer/${customerId}`}>
      <Card className="min-w-[300px]">
        <CardContent>
          <div>
            <CardTitle className="text-2xl text-green-500 font-bold m-2">
              {customerName}
            </CardTitle>
            <CardDescription className="text-xl m-2 font-semibold">
              {customerLocation}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CustomerCard;
