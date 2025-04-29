import type React from "react"

import { Button } from "@/components/ui/button"
import type { SwapDetails } from "@/pages/AtomicSwapPage"
import { CheckCircle2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface SwapCompletedStepProps {
  swapDetails: SwapDetails
  setSwapDetails?: (details: SwapDetails) => void
  isLoading?: boolean
  goToNextStep?: () => void
}

export const SwapCompletedStep: React.FC<SwapCompletedStepProps> = ({
  swapDetails,
}) => {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Swap Locked Successfully!</h3>
        <p className="text-muted-foreground">
          Your assets have been locked in the hash time-locked contract. The counterparty can now complete their side of
          the swap.
        </p>
      </div>

      <div className="grid gap-2 p-4 border rounded-lg text-left">
        <h3 className="font-medium">Swap Details</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-muted-foreground">Direction:</span>
          <span>{swapDetails.direction === "ZOND_TO_EVM" ? "ZOND → EVM" : "EVM → ZOND"}</span>

          <span className="text-muted-foreground">Amount Locked:</span>
          <span>{swapDetails.direction === "ZOND_TO_EVM" ? swapDetails.zondAmount : swapDetails.evmAmount}</span>

          <span className="text-muted-foreground">Expected to Receive:</span>
          <span>{swapDetails.direction === "ZOND_TO_EVM" ? swapDetails.evmAmount : swapDetails.zondAmount}</span>

          <span className="text-muted-foreground">Hash:</span>
          <span className="truncate">{swapDetails.hash}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-4">
        <Button onClick={() => navigate("/active-swaps")} className="w-full cursor-pointer">
          View Active Swaps
        </Button>
      </div>
    </div>
  )
}
