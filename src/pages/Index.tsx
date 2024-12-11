import { useState } from "react";
import { SurveyProgress } from "@/components/SurveyProgress";
import { NavigationButtons } from "@/components/NavigationButtons";
import { SurveyStepManager } from "@/components/steps/SurveyStepManager";
import { useSurveySubmission } from "@/hooks/useSurveySubmission";
import type { SurveyFormData } from "@/types/survey-types";

const TOTAL_STEPS = 6;

const initialFormData: SurveyFormData = {
  department: "",
  frequency: "",
  documentTypes: {
    templates: 0,
    regulations: 0,
    faq: 0,
    training: 0,
    reference: 0,
    contacts: 0
  },
  usability: {
    search: 0,
    navigation: 0,
    organization: 0
  },
  integration: "",
  feedback: ""
};

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SurveyFormData>(initialFormData);
  const { submitSurvey, isLoading } = useSurveySubmission();

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      const success = await submitSurvey(formData);
      if (success) {
        setFormData(initialFormData);
        setCurrentStep(1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFormDataUpdate = (updates: Partial<SurveyFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold tracking-tight">
            Опрос для разработки корпоративной базы знаний
          </h1>
          <p className="text-lg text-muted-foreground">
            Помогите нам создать эффективный инструмент для работы всей организации
          </p>
        </div>

        <SurveyProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <div className="survey-card">
          <SurveyStepManager
            currentStep={currentStep}
            formData={formData}
            onUpdateFormData={handleFormDataUpdate}
          />
          
          <NavigationButtons
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}