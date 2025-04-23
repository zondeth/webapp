import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActiveSwapsDataTable } from "@/components/activeSwaps/ActiveSwapsDataTable";
import { ActiveSwapsPlaceOrderDialog } from "@/components/activeSwaps/ActiveSwapsPlaceOrderDialog";
import { useState } from "react";

export const ActiveSwapsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Scale className="w-6 h-6" /> Active Swaps
        </CardTitle>
        <Button variant="default" className="gap-2 cursor-pointer" onClick={() => setIsOpen(true)}>
          <Plus className="w-4 h-4" /> Initiate Swap
        </Button>
      </CardHeader>
      <CardContent>
        <ActiveSwapsDataTable />
      </CardContent>
      <ActiveSwapsPlaceOrderDialog open={isOpen} onOpenChange={setIsOpen} />
    </Card>
  );
};