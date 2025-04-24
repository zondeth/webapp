import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Copy, Check, Wallet } from "lucide-react";
import sha256 from 'js-sha256';
import { SwapSteps } from "@/components/guide/SwapSteps";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EVM_TOKEN_LIST, ZOND_TOKEN_LIST } from "@/lib/constants";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Props {
  direction: "ZOND_TO_EVM" | "EVM_TO_ZOND";
}

export const AtomicSwapWidget: React.FC<Props> = ({ direction }) => {
  const [evmAmount, setEvmAmount] = useState("");
  const [zondAmount, setZondAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [secret, setSecret] = useState("");
  const [hash, setHash] = useState("");
  const [expiry, setExpiry] = useState("");
  const [evmToken, setEvmToken] = useState("");
  const [zondToken, setZondToken] = useState("");
  const [swapStatus, setSwapStatus] = useState<"initiated" | "locked" | "claimed" | "refunded" | null>(null);
  const [copiedField, setCopiedField] = useState<"secret" | "hash" | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate()
  const prefersReduced = useReducedMotion();
  const spring = prefersReduced
    ? { duration: 0 }
    : { type: "spring", stiffness: 500, damping: 40 };

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
      setCurrentStep(5);
    }, 2000);
  };

  const copyToClipboard = (text: string, field: "secret" | "hash") => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 1000); // Reset after 1 seconds
  };

  useEffect(() => {
    if (evmAmount && zondAmount && evmToken && zondToken && expiry) {
      setCurrentStep(2);
    }
    if (secret && hash) {
      setCurrentStep(3);
    }
  }, [evmAmount, zondAmount, evmToken, zondToken, secret, hash, expiry]);

  return (
    <Card className="border-none shadow-none">
      <CardContent className="px-0 md:px-6 space-y-4">
        <SwapSteps currentStep={currentStep} />
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
            <motion.div className="flex flex-col gap-2" layout>
              <motion.div
                transition={spring}
                className={`grid gap-1 ${direction === "ZOND_TO_EVM" ? "order-2" : "order-1"}`}
                layout
              >
                <div className="flex gap-2">
                  <Input
                    id="amount"
                    placeholder="0.0"
                    inputMode="decimal"
                    type="number"
                    value={evmAmount}
                    onChange={(e) => setEvmAmount(e.target.value)}
                    className="flex-1"
                  />

                  <Select value={evmToken} onValueChange={setEvmToken}>
                    <SelectTrigger className="w-[120px] cursor-pointer">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      {EVM_TOKEN_LIST.map((token) => (
                        <SelectItem className="cursor-pointer" key={token.address} value={token.address}>
                          <div className="flex items-center gap-2">
                            <img src={token.icon || "/token-placeholder.png"} alt={token.symbol} className="w-5 h-5 rounded-full" />
                            {token.symbol}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button variant="default" className="gap-2 cursor-pointer w-[90px]">
                      <Wallet className="w-5 h-5" /> EVM
                  </Button>
                </div>
              </motion.div>
              <motion.div
                transition={spring}
                className={`grid gap-1 ${direction === "ZOND_TO_EVM" ? "order-1" : "order-2"}`}
                layout
              >
                <div className="flex gap-2">
                  <Input
                    id="desiredAmount"
                    placeholder="0.0"
                    inputMode="decimal"
                    type="number"
                    value={zondAmount}
                    onChange={(e) => setZondAmount(e.target.value)}
                    className="flex-1"
                  />

                  <Select value={zondToken} onValueChange={setZondToken}>
                    <SelectTrigger className="w-[120px] cursor-pointer">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      {ZOND_TOKEN_LIST.map((token) => (
                        <SelectItem className="cursor-pointer" key={token.address} value={token.address}>
                          <div className="flex items-center gap-2">
                            <img src={token.icon || "/token-placeholder.png"} alt={token.symbol} className="w-5 h-5 rounded-full" />
                            {token.symbol}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button variant="default" className="gap-2 cursor-pointer w-[90px]">
                      <Wallet className="w-5 h-5" /> ZOND
                  </Button>
                </div>
              </motion.div>
            </motion.div>
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
            <Button onClick={generateSecret} disabled={isLoading || !evmAmount || !zondAmount || !evmToken || !zondToken || !expiry} className={isLoading ? "cursor-not-allowed w-full" : "cursor-pointer w-full"}>
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
                <Button variant="ghost" className="cursor-pointer" onClick={() => copyToClipboard(secret, "secret")}>
                  {copiedField === "secret" ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
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
                <Button variant="ghost" className="cursor-pointer" onClick={() => copyToClipboard(hash, "hash")}>
                  {copiedField === "hash" ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="grid gap-1">
              <Button onClick={() => {
                const blob = new Blob([`Secret: ${secret}\nHash: ${hash}`], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'secret_hash.txt';
                a.click();
                URL.revokeObjectURL(url);
                setCurrentStep(4);
              }}
                disabled={isLoading}
                className={isLoading ? "cursor-not-allowed w-full" : "cursor-pointer w-full"}
              >
                {isLoading ? <LoaderCircle className="animate-spin w-4 h-4" /> : "Download Secret and Hash"}
              </Button>
              {currentStep === 4 && (
                <Button
                  onClick={handleLock}
                  disabled={isLoading || currentStep !== 4}
                  className={isLoading ? "cursor-not-allowed w-full" : "cursor-pointer w-full"}
                >
                {isLoading ? <LoaderCircle className="animate-spin w-4 h-4" /> : `Lock ${direction === "ZOND_TO_EVM" ? "ZND" : "ETH"}`}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Swap Locked */}
        {/* {swapStatus === "locked" && (
          <div className="space-y-4">
            <p className="text-green-500">Swap locked successfully with Hash (H): {hash}</p>
            <Button onClick={() => setSwapStatus(null)} className="w-full">
              Start New Swap
            </Button>
          </div>
        )} */}

        {/* Step 4: Claim Swap */}
        {/* {swapStatus === "locked" && (
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
        )} */}

        {/* Step 5: Swap Claimed */}
        {/* {swapStatus === "claimed" && (
          <div className="space-y-4">
            <p className="text-green-500">Swap claimed successfully!</p>
            <Button onClick={() => setSwapStatus(null)} className="w-full">
              Start New Swap
            </Button>
          </div>
        )} */}

        {/* Step 6: Swap Refunded */}
        {/* {swapStatus === "refunded" && (
          <div className="space-y-4">
            <p className="text-red-500">Swap refunded.</p>
            <Button onClick={() => setSwapStatus(null)} className="w-full">
              Start New Swap
            </Button>
          </div>
        )} */}
      </CardContent>
      <CardFooter>
        {swapStatus === "locked" && (
          <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <p className="text-green-500 break-all">Swap locked successfully with Hash (H): {hash}</p>
            <Button onClick={() => navigate("/")} className="w-full cursor-pointer">
              Start New Swap
            </Button>
          </div>
          <div className="space-y-4">
            <Button className="w-full cursor-pointer" onClick={() => navigate("/active-swaps")}>
              Go to active swaps
            </Button>
          </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};