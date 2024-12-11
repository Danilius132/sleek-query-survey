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
    <div className="flex justify-between mt-8">
      <button
        onClick={onPrevious}
        disabled={currentStep === 1}
        className={cn(
          "nav-button nav-button-secondary",
          currentStep === 1 && "opacity-50 cursor-not-allowed"
        )}
      >
        <ArrowLeft className="w-5 h-5" />
        Назад
      </button>
      <button
        onClick={onNext}
        className="nav-button nav-button-primary"
      >
        {currentStep === totalSteps ? "Завершить" : "Далее"}
        {currentStep !== totalSteps && <ArrowRight className="w-5 h-5" />}
      </button>
    </div>
  );
}