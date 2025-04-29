import type React from "react"
import { CheckIcon } from "lucide-react"

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <div key={index} className="flex flex-col items-center relative z-10">
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2
                  ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCompleted
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground bg-background text-muted-foreground"
                  }
                  transition-all duration-200
                `}
              >
                {isCompleted ? <CheckIcon className="h-5 w-5" /> : <span>{stepNumber}</span>}
              </div>
              <span
                className={`
                  mt-2 text-xs font-medium text-center
                  ${isActive || isCompleted ? "text-foreground" : "text-muted-foreground"}
                `}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>

      {/* Connecting lines */}
      <div className="absolute top-5 left-0 right-0 h-[2px] -translate-y-1/2 z-0">
        <div className="h-full bg-muted-foreground">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(Math.max(1, currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
