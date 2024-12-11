import { cn } from "@/lib/utils";

interface SurveyProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function SurveyProgress({ currentStep, totalSteps }: SurveyProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Шаг {currentStep} из {totalSteps}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-4 rounded-full bg-secondary overflow-hidden transition-all duration-300 ease-in-out">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div 
            key={i + 1}
            className={cn(
              "transition-colors duration-200",
              currentStep > i ? "text-primary" : "text-muted-foreground"
            )}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}