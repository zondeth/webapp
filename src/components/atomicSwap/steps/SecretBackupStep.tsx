import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, Download } from "lucide-react"
import type { SwapDetails } from "@/pages/AtomicSwapPage"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface SecretBackupStepProps {
  swapDetails: SwapDetails
  setSwapDetails?: (details: SwapDetails) => void
  isLoading?: boolean
  goToNextStep?: () => void
}

export const SecretBackupStep: React.FC<SecretBackupStepProps> = ({
  swapDetails,
}) => {
  const [copiedField, setCopiedField] = useState<"secret" | "hash" | null>(null)
  const [isDownloaded, setIsDownloaded] = useState(false)
  const [hasConfirmed, setHasConfirmed] = useState(false)

  const copyToClipboard = (text: string, field: "secret" | "hash") => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => {
      setCopiedField(null)
    }, 1500)
  }

  const downloadSecretAndHash = () => {
    const blob = new Blob(
      [
        `ATOMIC SWAP DETAILS\n\n` +
          `Direction: ${swapDetails.direction === "ZOND_TO_EVM" ? "ZOND → EVM" : "EVM → ZOND"}\n` +
          `EVM Amount: ${swapDetails.evmAmount}\n` +
          `ZOND Amount: ${swapDetails.zondAmount}\n` +
          `Expiry: ${swapDetails.expiry}\n\n` +
          `Secret: ${swapDetails.secret}\n` +
          `Hash: ${swapDetails.hash}\n\n` +
          `IMPORTANT: Keep this file secure. Do not share your secret until you're ready to claim the swap.`,
      ],
      { type: "text/plain" },
    )

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "atomic_swap_details.txt"
    a.click()
    URL.revokeObjectURL(url)

    setIsDownloaded(true)
  }

  return (
    <div className="space-y-6">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Backup Required</AlertTitle>
        <AlertDescription>
          You must backup your secret before proceeding. If you lose it, you won't be able to claim your funds.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Secret (S)</label>
          <div className="relative">
            <div className="p-3 pr-10 bg-muted rounded-md font-mono text-sm break-all">{swapDetails.secret}</div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => copyToClipboard(swapDetails.secret || "", "secret")}
            >
              {copiedField === "secret" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Hashed Secret (H)</label>
          <div className="relative">
            <div className="p-3 pr-10 bg-muted rounded-md font-mono text-sm break-all">{swapDetails.hash}</div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => copyToClipboard(swapDetails.hash || "", "hash")}
            >
              {copiedField === "hash" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <Button
          onClick={downloadSecretAndHash}
          className="w-full flex items-center gap-2 cursor-pointer"
          variant={isDownloaded ? "outline" : "default"}
        >
          {isDownloaded ? (
            <>
              <Check className="h-4 w-4" /> Downloaded
            </>
          ) : (
            <>
              <Download className="h-4 w-4" /> Download Secret & Hash
            </>
          )}
        </Button>

        <div className="flex items-start space-x-2 pt-4">
          <Checkbox
            id="confirm-backup"
            className="cursor-pointer"
            checked={hasConfirmed}
            onCheckedChange={(checked) => setHasConfirmed(checked === true)}
          />
          <label
            htmlFor="confirm-backup"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            I confirm that I have securely backed up my secret and understand that I will need it to claim my funds.
          </label>
        </div>
      </div>
    </div>
  )
}
