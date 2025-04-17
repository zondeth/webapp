import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowDown, LoaderCircle } from "lucide-react";
import clsx from "clsx";

interface Props {
  direction: "ZOND_TO_EVM" | "EVM_TO_ZOND";
}

export const BridgeWidget: React.FC<Props> = ({ direction }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    // Placeholder – integrate signer + SDK later
    setTimeout(() => setIsLoading(false), 2000);
  };

  const from = direction === "ZOND_TO_EVM" ? "ZND" : "wZND";
  const to = direction === "ZOND_TO_EVM" ? "wZND" : "ZND";

  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-4">
        <div className="grid gap-1">
          <label htmlFor="from" className="text-sm font-medium text-muted-foreground">
            From ({from})
          </label>
          <Input
            id="from"
            placeholder="0.0"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="grid gap-1">
          <label htmlFor="to" className="text-sm font-medium text-muted-foreground">
            To ({to})
          </label>
          <Input id="to" readOnly value={amount} />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          disabled={!amount || isLoading}
          className={clsx("w-full", isLoading && "cursor-not-allowed")}
          onClick={handleSubmit}
        >
          {isLoading ? <LoaderCircle className="animate-spin w-4 h-4" /> : `Bridge ${from} → ${to}`}
        </Button>
      </CardFooter>
    </Card>
  );
};