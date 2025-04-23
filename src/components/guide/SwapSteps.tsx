import React from "react";

interface StepProps {
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface SwapStepsProps {
  currentStep: number;
}

export const SwapSteps: React.FC<SwapStepsProps> = ({ currentStep }) => {
  const steps: StepProps[] = [
    { title: "Enter Details", description: "Choose direction, amount, and expiry.", isActive: currentStep === 1, isCompleted: currentStep > 1 },
    { title: "Generate Secret", description: "Create a secret and its hash.", isActive: currentStep === 2, isCompleted: currentStep > 2 },
    { title: "Lock Assets", description: "Lock your assets in HTLC.", isActive: currentStep === 3, isCompleted: currentStep > 3 },
    { title: "Claim Assets", description: "Use the secret to claim assets.", isActive: currentStep === 4, isCompleted: currentStep > 4 },
    { title: "Complete", description: "Swap completed successfully.", isActive: currentStep === 5, isCompleted: false },
  ];

  return (
    <div className="flex justify-between space-x-4">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col gap-2 items-center w-full">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step.isCompleted ? "bg-green-500 text-white" : step.isActive ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"}`}>
            {step.isCompleted ? "✓" : index + 1}
          </div>
          <div className="text-xs text-center mt-1">
            <span className="font-medium">{step.title}</span>
            {/* <span className="block text-muted-foreground">{step.description}</span> */}
          </div>
        </div>
      ))}
    </div>
  );
};