import { cn } from "@/lib/utils";

interface SurveyProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function SurveyProgress({ currentStep, totalSteps }: SurveyProgressProps) {
  const progress = (currentStep / totalSteps) * 100;
  const steps = Array.from({ length: totalSteps }, (_, i) => ({
    number: i + 1,
    label: getStepLabel(i + 1)
  }));

  return (
    <div className="w-full space-y-4" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Шаг {currentStep} из {totalSteps}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-secondary/60 overflow-hidden transition-all duration-300 ease-in-out">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-sm">
        {steps.map(({ number, label }) => (
          <div 
            key={number}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors duration-200",
              currentStep >= number ? "text-primary" : "text-muted-foreground"
            )}
          >
            <span className="font-medium">{number}</span>
            <span className="text-xs whitespace-nowrap">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStepLabel(step: number): string {
  switch (step) {
    case 1:
      return "Информация";
    case 2:
      return "Частота";
    case 3:
      return "Документы";
    case 4:
      return "Удобство";
    case 5:
      return "Интеграция";
    case 6:
      return "Отзыв";
    default:
      return "";
  }
}