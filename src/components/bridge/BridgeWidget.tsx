import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Copy } from "lucide-react";
import sha256 from 'js-sha256';
import { SwapSteps } from "@/components/guide/SwapSteps";

interface Props {
  direction: "ZOND_TO_EVM" | "EVM_TO_ZOND";
}

export const BridgeWidget: React.FC<Props> = ({ direction }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [secret, setSecret] = useState("");
  const [hash, setHash] = useState("");
  const [expiry, setExpiry] = useState("");
  const [swapStatus, setSwapStatus] = useState<"initiated" | "locked" | "claimed" | "refunded" | null>(null);

  const generateSecret = () => {
    const generatedSecret = Math.random().toString(36).substring(2, 15);
    const generatedHash = sha256.sha256(generatedSecret);
    setSecret(generatedSecret);
    setHash(generatedHash);
  };

  const handleLock = async () => {
    setIsLoading(true);
    // Placeholder: Integrate locking logic
    setTimeout(() => {
      setIsLoading(false);
      setSwapStatus("locked");
    }, 2000);
  };

  const handleClaim = () => {
    setIsLoading(true);
    // Placeholder: Integrate claim logic
    setTimeout(() => {
      setIsLoading(false);
      setSwapStatus("claimed");
    }, 2000);
  };

  const handleRefund = () => {
    setIsLoading(true);
    // Placeholder: Integrate refund logic
    setTimeout(() => {
      setIsLoading(false);
      setSwapStatus("refunded");
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getCurrentStep = () => {
    switch (swapStatus) {
      case "initiated":
        return 1;
      case "locked":
        return 2;
      case "claimed":
        return 3;
      case "refunded":
        return 3;
      default:
        return 0;
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-4">
        <SwapSteps currentStep={getCurrentStep()} />
        {/* Step 1: Enter Swap Details */}
        {swapStatus === null && (
          <div className="space-y-4">
            <div className="grid gap-1">
              <label htmlFor="direction" className="text-sm font-medium text-muted-foreground">
                Direction
              </label>
              <Input
                id="direction"
                placeholder={direction === "ZOND_TO_EVM" ? "ZOND → EVM" : "EVM → ZOND"}
                readOnly
                value={direction === "ZOND_TO_EVM" ? "ZOND → EVM" : "EVM → ZOND"}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="amount" className="text-sm font-medium text-muted-foreground">
                Amount ({direction === "ZOND_TO_EVM" ? "ZND" : "ETH"})
              </label>
              <Input
                id="amount"
                placeholder="0.0"
                inputMode="decimal"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <Button onClick={generateSecret} disabled={isLoading || !amount}>
              {isLoading ? <LoaderCircle className="animate-spin w-4 h-4" /> : "Generate Secret"}
            </Button>
          </div>
        )}

        {/* Step 2: Display Secret and Hash */}
        {swapStatus === null && secret && hash && (
          <div className="space-y-4">
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
            <div className="grid gap-1">
              <label className="text-sm font-medium text-muted-foreground">
                Expiry (T₁)
              </label>
              <Input
                id="expiry"
                type="datetime-local"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>
            <Button onClick={handleLock} disabled={isLoading || !hash || !expiry}>
              {isLoading ? <LoaderCircle className="animate-spin w-4 h-4" /> : `Lock ${direction === "ZOND_TO_EVM" ? "ZND" : "ETH"}`}
            </Button>
          </div>
        )}

        {/* Step 3: Swap Locked */}
        {swapStatus === "locked" && (
          <div className="space-y-4">
            <p className="text-green-500">Swap locked successfully with Hash (H): {hash}</p>
            <Button onClick={() => setSwapStatus(null)} className="w-full">
              Start New Swap
            </Button>
          </div>
        )}

        {/* Step 4: Claim Swap */}
        {swapStatus === "locked" && (
          <div className="space-y-4">
            <div className="grid gap-1">
              <label htmlFor="claim-secret" className="text-sm font-medium text-muted-foreground">
                Enter Secret to Claim
              </label>
              <Input
                id="claim-secret"
                placeholder="Enter Secret (S)"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />
            </div>
            <Button onClick={handleClaim} disabled={isLoading || !secret}>
              {isLoading ? <LoaderCircle className="animate-spin w-4 h-4" /> : "Claim Assets"}
            </Button>
          </div>
        )}

        {/* Step 5: Swap Claimed */}
        {swapStatus === "claimed" && (
          <div className="space-y-4">
            <p className="text-green-500">Swap claimed successfully!</p>
            <Button onClick={() => setSwapStatus(null)} className="w-full">
              Start New Swap
            </Button>
          </div>
        )}

        {/* Step 6: Swap Refunded */}
        {swapStatus === "refunded" && (
          <div className="space-y-4">
            <p className="text-red-500">Swap refunded.</p>
            <Button onClick={() => setSwapStatus(null)} className="w-full">
              Start New Swap
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {swapStatus === "locked" && (
          <Button variant="outline" onClick={handleRefund} disabled={isLoading}>
            {isLoading ? <LoaderCircle className="animate-spin w-4 h-4" /> : "Refund Swap"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};