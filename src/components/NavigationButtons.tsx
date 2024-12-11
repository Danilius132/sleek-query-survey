import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
}

export function NavigationButtons({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious 
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between mt-8 px-4">
      <button
        onClick={onPrevious}
        disabled={currentStep === 1}
        className={cn(
          "nav-button nav-button-secondary",
          "transition-all duration-200 hover:translate-x-[-4px]",
          currentStep === 1 && "opacity-50 cursor-not-allowed"
        )}
        aria-label="Предыдущий вопрос"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Назад</span>
      </button>
      <button
        onClick={onNext}
        className={cn(
          "nav-button nav-button-primary",
          "transition-all duration-200 hover:translate-x-[4px]"
        )}
        aria-label={currentStep === totalSteps ? "Завершить опрос" : "Следующий вопрос"}
      >
        <span>{currentStep === totalSteps ? "Завершить" : "Далее"}</span>
        {currentStep !== totalSteps && <ArrowRight className="w-4 h-4" />}
      </button>
    </div>
  );
}