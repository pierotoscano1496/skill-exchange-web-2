
"use client"

import * as React from "react"
import { Check, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  label: string
  isCompleted: boolean
  isActive: boolean
}

interface StepperProps {
  steps: Step[]
  onStepClick: (stepIndex: number) => void
  className?: string
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, onStepClick, className }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center justify-between", className)}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => onStepClick(index)}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2",
                  step.isActive ? "border-primary" : "border-gray-300",
                  step.isCompleted ? "bg-primary text-white border-primary" : ""
                )}
              >
                {step.isCompleted ? <Check className="w-5 h-5" /> : <Circle className="w-3 h-3" />}
              </div>
              <p
                className={cn(
                  "mt-2 text-sm text-center",
                  step.isActive ? "text-primary font-semibold" : "text-gray-500"
                )}
              >
                {step.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5",
                  step.isCompleted ? "bg-primary" : "bg-gray-300"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
)

Stepper.displayName = "Stepper"

export { Stepper }
