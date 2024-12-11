import { cn } from "@/lib/utils";

interface SurveyProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function SurveyProgress({ currentStep, totalSteps }: SurveyProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Шаг {currentStep} из {totalSteps}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}