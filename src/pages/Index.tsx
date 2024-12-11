import { useState, useEffect } from "react";
import { SurveyProgress } from "@/components/SurveyProgress";
import { NavigationButtons } from "@/components/NavigationButtons";
import { SurveyQuestion } from "@/components/SurveyQuestion";
import { useToast } from "@/components/ui/use-toast";
import { FeedbackSection } from "@/components/FeedbackSection";
import type { SurveyFormData } from "@/types/survey";

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
  const { toast } = useToast();

  useEffect(() => {
    const surveyCard = document.querySelector('.survey-card');
    if (surveyCard) {
      surveyCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast({
        title: "Опрос завершен",
        description: "Спасибо за ваше участие!",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <SurveyQuestion
            title="Общая информация"
            tooltipContent="Базовая информация о вашей роли и планируемом использовании базы знаний"
            question="К какому отделу вы относитесь?"
            options={[
              { value: "legal", label: "Юридический отдел" },
              { value: "sales", label: "Отдел продаж" },
              { value: "management", label: "Руководство" },
              { value: "other", label: "Другое" }
            ]}
            value={formData.department}
            onChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
          />
        );

      case 2:
        return (
          <SurveyQuestion
            title="Частота использования"
            tooltipContent="Информация о планируемой частоте использования базы знаний"
            question="Как часто вы планируете использовать базу знаний?"
            options={[
              { value: "several-times-day", label: "Несколько раз в день" },
              { value: "daily", label: "Ежедневно" },
              { value: "several-times-week", label: "Несколько раз в неделю" },
              { value: "several-times-month", label: "Несколько раз в месяц" },
              { value: "less", label: "Реже" }
            ]}
            value={formData.frequency}
            onChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}
          />
        );

      case 3:
        return (
          <SurveyQuestion
            title="Типы документов"
            tooltipContent="Оцените важность различных типов документов для вашей работы"
            question="Оцените важность следующих типов документов (от 1 до 5)"
            options={[
              { value: "templates", label: "Шаблоны документов" },
              { value: "regulations", label: "Регламенты и процедуры" },
              { value: "faq", label: "Часто задаваемые вопросы (FAQ)" },
              { value: "training", label: "Обучающие материалы" },
              { value: "reference", label: "Справочная информация" },
              { value: "contacts", label: "Контактные данные сотрудников" }
            ]}
            value={String(formData.documentTypes[formData.documentTypes as keyof typeof formData.documentTypes] || 0)}
            onChange={(value) => {
              const key = value as keyof typeof formData.documentTypes;
              setFormData(prev => ({
                ...prev,
                documentTypes: {
                  ...prev.documentTypes,
                  [key]: Number(value)
                }
              }));
            }}
          />
        );

      case 4:
        return (
          <SurveyQuestion
            title="Удобство использования"
            tooltipContent="Оцените важность различных аспектов удобства использования"
            question="Оцените важность следующих характеристик (от 1 до 5)"
            options={[
              { value: "search", label: "Поиск по базе знаний" },
              { value: "navigation", label: "Удобство навигации" },
              { value: "organization", label: "Организация материалов" }
            ]}
            value={String(formData.usability[formData.usability as keyof typeof formData.usability] || 0)}
            onChange={(value) => {
              const key = value as keyof typeof formData.usability;
              setFormData(prev => ({
                ...prev,
                usability: {
                  ...prev.usability,
                  [key]: Number(value)
                }
              }));
            }}
          />
        );

      case 5:
        return (
          <SurveyQuestion
            title="Интеграция"
            tooltipContent="Выберите предпочтительный способ интеграции с существующими системами"
            question="Какой способ интеграции с существующими системами вы предпочитаете?"
            options={[
              { value: "full", label: "Полная интеграция со всеми системами" },
              { value: "partial", label: "Частичная интеграция с основными системами" },
              { value: "minimal", label: "Минимальная интеграция" },
              { value: "none", label: "Без интеграции" }
            ]}
            value={formData.integration}
            onChange={(value) => setFormData(prev => ({ ...prev, integration: value }))}
          />
        );

      case 6:
        return (
          <FeedbackSection
            value={formData.feedback}
            onChange={(value) => setFormData(prev => ({ ...prev, feedback: value }))}
          />
        );

      default:
        return null;
    }
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
          {renderQuestion()}
          
          <NavigationButtons
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </div>
      </div>
    </div>
  );
}