import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, LockIcon } from "lucide-react"
import type { SwapDetails } from "@/pages/AtomicSwapPage"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

interface LockAssetsStepProps {
  swapDetails: SwapDetails
  onLockAssets: () => Promise<void>
  isLoading: boolean
  setSwapDetails?: (details: SwapDetails) => void
  swapStatus?: "initiated" | "locked" | "claimed" | "refunded" | null
  setSwapStatus?: (status: "initiated" | "locked" | "claimed" | "refunded" | null) => void
  goToNextStep?: () => void
}

export const LockAssetsStep: React.FC<LockAssetsStepProps> = ({
  swapDetails,
  onLockAssets,
  isLoading,
}) => {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Ready to Lock Assets</AlertTitle>
        <AlertDescription>
          You're about to lock{" "}
          {swapDetails.direction === "ZOND_TO_EVM" ? swapDetails.zondAmount : swapDetails.evmAmount} in a hash
          time-locked contract. This will initiate the atomic swap.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="grid gap-2 p-4 border rounded-lg">
          <h3 className="font-medium">Swap Summary</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-muted-foreground">Direction:</span>
            <span>{swapDetails.direction === "ZOND_TO_EVM" ? "ZOND → EVM" : "EVM → ZOND"}</span>

            <span className="text-muted-foreground">Send:</span>
            <span>{swapDetails.direction === "ZOND_TO_EVM" ? swapDetails.zondAmount : swapDetails.evmAmount}</span>

            <span className="text-muted-foreground">Receive:</span>
            <span>{swapDetails.direction === "ZOND_TO_EVM" ? swapDetails.evmAmount : swapDetails.zondAmount}</span>

            <span className="text-muted-foreground">Expiry:</span>
            <span>{new Date(swapDetails.expiry).toLocaleString()}</span>

            <span className="text-muted-foreground">Hash:</span>
            <span className="truncate">{swapDetails.hash?.substring(0, 10)}...</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={handleConnect} disabled={isConnecting} variant="outline" className="w-full">
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting Wallet...
              </>
            ) : (
              "Connect Wallet"
            )}
          </Button>

          <Button
            onClick={onLockAssets}
            disabled={isLoading || isConnecting}
            className="w-full flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Locking Assets...
              </>
            ) : (
              <>
                <LockIcon className="h-4 w-4" />
                Lock {swapDetails.direction === "ZOND_TO_EVM" ? "ZOND" : "EVM"} Assets
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
