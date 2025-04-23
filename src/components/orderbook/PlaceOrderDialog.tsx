import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { Copy, LoaderCircle } from "lucide-react";
import sha256 from 'js-sha256'; // Ensure to install js-sha256 via npm

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export const PlaceOrderDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  const [direction, setDirection] = useState<"ZOND_TO_EVM" | "EVM_TO_ZOND">("ZOND_TO_EVM");
  const [amount, setAmount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [secret, setSecret] = useState("");
  const [hash, setHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Generate secret and hash
  const generateSecretAndHash = () => {
    const generatedSecret = Math.random().toString(36).substring(2, 15);
    const generatedHash = sha256.sha256(generatedSecret);
    setSecret(generatedSecret);
    setHash(generatedHash);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Placeholder: Integrate swap initiation logic with backend or smart contracts
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      // Optionally reset fields
      setDirection("ZOND_TO_EVM");
      setAmount("");
      setExpiry("");
      setSecret("");
      setHash("");
    }, 2000);
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Initiate Atomic Swap</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {/* Step 1: Choose Direction */}
          <ToggleGroup type="single" value={direction} onValueChange={(v) => setDirection(v as "ZOND_TO_EVM" | "EVM_TO_ZOND")} className="w-full">
            <ToggleGroupItem value="ZOND_TO_EVM" className="w-1/2">ZOND → EVM</ToggleGroupItem>
            <ToggleGroupItem value="EVM_TO_ZOND" className="w-1/2">EVM → ZOND</ToggleGroupItem>
          </ToggleGroup>

          {/* Step 2: Enter Amount */}
          <div className="grid gap-1">
            <label className="text-sm font-medium text-muted-foreground">
              Amount ({direction === "ZOND_TO_EVM" ? "ZND" : "ETH"})
            </label>
            <Input
              placeholder="0.0"
              inputMode="decimal"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Step 3: Set Expiry */}
          <div className="grid gap-1">
            <label className="text-sm font-medium text-muted-foreground">
              Expiry (T₁)
            </label>
            <Input
              type="datetime-local"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>

          {/* Step 4: Generate Secret and Hash */}
          {!secret && (
            <Button onClick={generateSecretAndHash} disabled={isLoading || !amount || !expiry}>
              {isLoading ? <LoaderCircle className="animate-spin w-4 h-4" /> : "Generate Secret & Hash"}
            </Button>
          )}

          {secret && hash && (
            <>
              <div className="grid gap-1">
                <label className="text-sm font-medium text-muted-foreground">
                  Secret (S)
                </label>
                <div className="flex">
                  <Input
                    readOnly
                    value={secret}
                  />
                  <Button variant="ghost" onClick={() => copyToClipboard(secret)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-1">
                <label className="text-sm font-medium text-muted-foreground">
                  Hashed Secret (H)
                </label>
                <div className="flex">
                  <Input
                    readOnly
                    value={hash}
                  />
                  <Button variant="ghost" onClick={() => copyToClipboard(hash)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Step 5: Submit Swap */}
          {secret && hash && (
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? <LoaderCircle className="animate-spin w-4 h-4" /> : "Initiate Swap"}
            </Button>
          )}
        </div>
        <DialogFooter>
          {/* Optional footer content */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};