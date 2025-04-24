 // Start of Selection
import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  children: React.ReactNode;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, children }) => (
  <div className="flex space-x-4">
    {React.Children.map(children, (child, index) =>
      React.isValidElement(child)
            // Start of Selection
            ? React.cloneElement(child as React.ReactElement<StepProps>, { completed: currentStep > index })
            : child
    )}
  </div>
);

interface StepProps {
  completed?: boolean;
  children: React.ReactNode;
}

export const Step: React.FC<StepProps> = ({ completed, children }) => (
  <div className="flex flex-col items-center">
    <div
      className={cn(
        "w-8 h-8 rounded-full border flex items-center justify-center",
        completed ? "bg-green-500 border-green-500" : "border-gray-300"
      )}
    >
      {completed ? (
        <CheckCircle className="w-4 h-4 text-white" />
      ) : (
        <Circle className="w-4 h-4 text-gray-300" />
      )}
    </div>
    {children}
  </div>
);

export const StepTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-2 text-sm font-medium text-center">{children}</div>
);

export const StepDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-xs text-gray-500 text-center">{children}</div>
);