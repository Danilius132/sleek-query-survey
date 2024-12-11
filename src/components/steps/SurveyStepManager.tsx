import { DepartmentStep } from "./DepartmentStep";
import { SurveyQuestion } from "@/components/SurveyQuestion";
import { DocumentTypesSection } from "@/components/DocumentTypesSection";
import { UsabilitySection } from "@/components/UsabilitySection";
import { FeedbackSection } from "@/components/FeedbackSection";
import type { SurveyFormData } from "@/types/survey-types";

interface SurveyStepManagerProps {
  currentStep: number;
  formData: SurveyFormData;
  onUpdateFormData: (updates: Partial<SurveyFormData>) => void;
}

export function SurveyStepManager({ 
  currentStep, 
  formData, 
  onUpdateFormData 
}: SurveyStepManagerProps) {
  const handleDepartmentChange = (value: string) => {
    onUpdateFormData({ department: value });
  };

  const handleFrequencyChange = (value: string) => {
    onUpdateFormData({ frequency: value });
  };

  const handleDocumentTypeRating = (type: keyof typeof formData.documentTypes, value: number) => {
    onUpdateFormData({
      documentTypes: {
        ...formData.documentTypes,
        [type]: value
      }
    });
  };

  const handleUsabilityRating = (type: keyof typeof formData.usability, value: number) => {
    onUpdateFormData({
      usability: {
        ...formData.usability,
        [type]: value
      }
    });
  };

  const handleIntegrationChange = (value: string) => {
    onUpdateFormData({ integration: value });
  };

  const handleFeedbackChange = (value: string) => {
    onUpdateFormData({ feedback: value });
  };

  switch (currentStep) {
    case 1:
      return (
        <DepartmentStep
          value={formData.department}
          onChange={handleDepartmentChange}
        />
      );

    case 2:
      return (
        <SurveyQuestion
          title="Частота использования"
          question="Как часто вы планируете использовать базу знаний?"
          options={[
            { value: "several-times-day", label: "Несколько раз в день" },
            { value: "daily", label: "Ежедневно" },
            { value: "several-times-week", label: "Несколько раз в неделю" },
            { value: "several-times-month", label: "Несколько раз в месяц" },
            { value: "less", label: "Реже" }
          ]}
          value={formData.frequency}
          onChange={handleFrequencyChange}
        />
      );

    case 3:
      return (
        <DocumentTypesSection
          documentTypes={formData.documentTypes}
          onRatingChange={handleDocumentTypeRating}
        />
      );

    case 4:
      return (
        <UsabilitySection
          usability={formData.usability}
          onRatingChange={handleUsabilityRating}
        />
      );

    case 5:
      return (
        <SurveyQuestion
          title="Интеграция"
          question="Какой способ интеграции с существующими системами вы предпочитаете?"
          options={[
            { value: "full", label: "Полная интеграция со всеми системами" },
            { value: "partial", label: "Частичная интеграция с основными системами" },
            { value: "minimal", label: "Минимальная интеграция" },
            { value: "none", label: "Без интеграции" }
          ]}
          value={formData.integration}
          onChange={handleIntegrationChange}
        />
      );

    case 6:
      return (
        <FeedbackSection
          value={formData.feedback}
          onChange={handleFeedbackChange}
        />
      );

    default:
      return null;
  }
}