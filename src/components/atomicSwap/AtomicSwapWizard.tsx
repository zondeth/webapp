import type React from "react"
import { useState } from "react"
import { useBeforeUnload } from "react-router-dom"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { SwapDetailsStep } from "./steps/SwapDetailsStep"
import { SecretGenerationStep } from "./steps/SecretGenerationStep"
import { SecretBackupStep } from "./steps/SecretBackupStep"
import { LockAssetsStep } from "./steps/LockAssetsStep"
import { SwapCompletedStep } from "./steps/SwapCompletedStep"
import { StepIndicator } from "./StepIndicator"
import { useConfirmNavigation } from "@/hooks/useConfirmNavigation"
import { initialSwapDetails, SwapDetails } from "@/pages/AtomicSwapPage"

interface AtomicSwapWizardProps {
  swapDetails: SwapDetails
  setSwapDetails: (details: SwapDetails) => void
}

export const AtomicSwapWizard: React.FC<AtomicSwapWizardProps> = ({ swapDetails, setSwapDetails }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const [swapStatus, setSwapStatus] = useState<"initiated" | "locked" | "claimed" | "refunded" | null>(null)

  // Set up navigation confirmation
  useConfirmNavigation(
    currentStep > 1 && swapStatus !== "locked" && swapStatus !== "claimed",
    "You have an unfinished swap in progress. Are you sure you want to leave this page? Your progress will be saved.",
  )

  // Also handle browser close/refresh
  useBeforeUnload((event) => {
    if (currentStep > 1 && swapStatus !== "locked" && swapStatus !== "claimed") {
      event.preventDefault()
      return "You have an unfinished swap in progress. Are you sure you want to leave?"
    }
  })

  const steps = [
    { title: "Enter Details", component: SwapDetailsStep },
    { title: "Generate Secret", component: SecretGenerationStep },
    { title: "Backup Secret", component: SecretBackupStep },
    { title: "Lock Assets", component: LockAssetsStep },
    { title: "Complete Swap", component: SwapCompletedStep },
  ]

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const resetSwap = () => {
    if (window.confirm("Are you sure you want to start a new swap? This will clear your current progress.")) {
      setSwapDetails(initialSwapDetails)
      setSwapStatus(null)
      setCurrentStep(1)
    }
  }

  const handleLockAssets = async () => {
    setIsLoading(true)
    // Placeholder: Integrate locking logic
    setTimeout(() => {
      setIsLoading(false)
      setSwapStatus("locked")
      goToNextStep()
    }, 2000)
  }

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
          Create Atomic Swap
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 md:px-6">
        <div className="mb-8">
          <StepIndicator steps={steps.map((step) => step.title)} currentStep={currentStep} />
        </div>

        <CurrentStepComponent
          swapDetails={swapDetails}
          setSwapDetails={setSwapDetails}
          isLoading={isLoading}
          swapStatus={swapStatus}
          setSwapStatus={setSwapStatus}
          onLockAssets={handleLockAssets}
          goToNextStep={goToNextStep}
        />
      </CardContent>
      <CardFooter className="flex justify-between px-6 pt-2">
        {currentStep > 1 && currentStep < 5 && (
          <Button variant="outline" onClick={goToPreviousStep} disabled={isLoading} className="flex items-center gap-2 cursor-pointer">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        )}

        {currentStep === 1 && (
          <div></div> // Empty div to maintain flex spacing
        )}

        {currentStep < 4 && (
          <Button
            onClick={goToNextStep}
            disabled={
              isLoading ||
              (currentStep === 1 &&
                (!swapDetails.evmAmount ||
                  !swapDetails.zondAmount ||
                  !swapDetails.evmToken ||
                  !swapDetails.zondToken ||
                  !swapDetails.evmAddress ||
                  !swapDetails.zondAddress ||
                  !swapDetails.expiry)) ||
              (currentStep === 2 && (!swapDetails.secret || !swapDetails.hash))
            }
            className="flex items-center gap-2 ml-auto cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Next <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        )}

        {currentStep === 5 && (
          <Button onClick={resetSwap} className="ml-auto w-full cursor-pointer">
            Start New Swap
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
