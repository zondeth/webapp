import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Swap {
  id: string;
  direction: "ZOND_TO_EVM" | "EVM_TO_ZOND";
  amount: string;
  status: "Locked" | "Claimed" | "Refunded";
}

const mockSwaps: Swap[] = [
  {
    id: "swap1",
    direction: "ZOND_TO_EVM",
    amount: "100 ZND",
    status: "Locked",
  },
  {
    id: "swap2",
    direction: "EVM_TO_ZOND",
    amount: "0.5 ETH",
    status: "Claimed",
  },
  {
    id: "swap3",
    direction: "ZOND_TO_EVM",
    amount: "200 ZND",
    status: "Refunded",
  },
];

export const ActiveSwapsDataTable = () => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Swap ID</TableHead>
          <TableHead>Direction</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockSwaps.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No active swaps.
            </TableCell>
          </TableRow>
        ) : (
          mockSwaps.map((swap) => (
            <TableRow key={swap.id}>
              <TableCell>{swap.id}</TableCell>
              <TableCell>
                {swap.direction === "ZOND_TO_EVM" ? "ZOND → EVM" : "EVM → ZOND"} <ArrowUpDown className="inline-block ml-1 w-4 h-4" />
              </TableCell>
              <TableCell>{swap.amount}</TableCell>
              <TableCell>
                {swap.status === "Locked" && <Clock className="inline-block mr-1 w-4 h-4 text-yellow-500" />} {swap.status}
                {swap.status === "Claimed" && <CheckCircle className="inline-block mr-1 w-4 h-4 text-green-500" />}
                {swap.status === "Refunded" && <XCircle className="inline-block mr-1 w-4 h-4 text-red-500" />}
              </TableCell>
              <TableCell>
                {swap.status === "Locked" && (
                  <>
                    <Button variant="link" className="text-primary cursor-pointer">
                      Claim
                    </Button>
                    |
                    <Button variant="link" className="text-red-500 cursor-pointer">
                      Refund
                    </Button>
                  </>
                )}
                {swap.status !== "Locked" && "-"}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);