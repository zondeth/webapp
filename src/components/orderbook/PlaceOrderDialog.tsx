import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}
export const PlaceOrderDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Place {side === "buy" ? "Buy" : "Sell"} Order</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {/* eslint-disable-next-line */}
          <ToggleGroup type="single" value={side} onValueChange={(v) => setSide(v as any)} className="w-full">
            <ToggleGroupItem value="buy" className="w-1/2">Buy</ToggleGroupItem>
            <ToggleGroupItem value="sell" className="w-1/2">Sell</ToggleGroupItem>
          </ToggleGroup>
          <div className="grid gap-1">
            <label className="text-sm font-medium text-muted-foreground">Amount (ZND)</label>
            <Input placeholder="0.0" inputMode="decimal" />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium text-muted-foreground">Price (ETH)</label>
            <Input placeholder="0.0" inputMode="decimal" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">
            Submit Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};