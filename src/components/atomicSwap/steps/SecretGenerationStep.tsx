import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import sha256 from "js-sha256"
import type { SwapDetails } from "@/pages/AtomicSwapPage"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface SecretGenerationStepProps {
  swapDetails: SwapDetails
  setSwapDetails: (details: SwapDetails) => void
  isLoading?: boolean
  goToNextStep?: () => void
}

export const SecretGenerationStep: React.FC<SecretGenerationStepProps> = ({
  swapDetails,
  setSwapDetails,
}) => {
  const [generating, setGenerating] = useState(false)

  const generateSecret = () => {
    setGenerating(true)

    // Simulate async operation
    setTimeout(() => {
      const generatedSecret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      const generatedHash = sha256.sha256(generatedSecret)

      setSwapDetails({
        ...swapDetails,
        secret: generatedSecret,
        hash: generatedHash,
      })

      setGenerating(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          The secret is used to claim your funds. Keep it safe and don't share it until you're ready to complete the
          swap.
        </AlertDescription>
      </Alert>

      {!swapDetails.secret && (
        <div className="flex justify-center">
          <Button onClick={generateSecret} disabled={generating} size="lg" className="w-full cursor-pointer">
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Secret...
              </>
            ) : (
              "Generate Secret"
            )}
          </Button>
        </div>
      )}

      {swapDetails.secret && swapDetails.hash && (
        <div className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Secret (S)</label>
            <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">{swapDetails.secret}</div>
            <p className="text-xs text-muted-foreground">
              This is your secret key. You'll need it to claim the funds later.
            </p>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Hashed Secret (H)</label>
            <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">{swapDetails.hash}</div>
            <p className="text-xs text-muted-foreground">
              This is the hash of your secret. It will be used to lock the funds.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
