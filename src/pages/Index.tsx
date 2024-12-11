import { useState, useEffect } from "react";
import { SurveyProgress } from "@/components/SurveyProgress";
import { NavigationButtons } from "@/components/NavigationButtons";
import { SurveyQuestion } from "@/components/SurveyQuestion";
import { useToast } from "@/components/ui/use-toast";
import { FeedbackSection } from "@/components/FeedbackSection";
import { Rating } from "@/components/Rating";
import { api } from "@/lib/api";
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
  const [departments, setDepartments] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departmentsData, surveysData] = await Promise.all([
          api.getDepartments(),
          api.getSurveys()
        ]);
        setDepartments(departmentsData.results);
        setSurveys(surveysData.results);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить данные",
          variant: "destructive"
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const surveyCard = document.querySelector('.survey-card');
    if (surveyCard) {
      surveyCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!surveys.length) {
        throw new Error('Нет активного опроса');
      }

      if (!formData.department) {
        throw new Error('Выберите отдел');
      }

      const departmentId = parseInt(formData.department);
      if (isNaN(departmentId)) {
        throw new Error('Некорректный ID отдела');
      }

      const surveyResponse = {
        survey: surveys[0]?.id,
        department: departmentId,
        binary_choice: formData.frequency === 'several-times-day' || formData.frequency === 'daily',
        doc_type_1_rating: formData.documentTypes.templates || 1,
        doc_type_2_rating: formData.documentTypes.regulations || 1,
        doc_type_3_rating: formData.documentTypes.faq || 1,
        doc_type_4_rating: formData.documentTypes.training || 1,
        doc_type_5_rating: formData.documentTypes.reference || 1,
        doc_type_6_rating: formData.documentTypes.contacts || 1,
        usability_feature_1: formData.usability.search || 1,
        usability_feature_2: formData.usability.navigation || 1,
        usability_feature_3: formData.usability.organization || 1,
        integration_preference: mapIntegrationPreference(formData.integration),
        feedback: formData.feedback || ''
      };

      console.log('Подготовленные данные для отправки:', surveyResponse);
      await api.submitSurveyResponse(surveyResponse);
      
      toast({
        title: "Успех",
        description: "Ваш ответ успешно отправлен!",
      });
      setFormData(initialFormData);
      setCurrentStep(1);
    } catch (error) {
      console.error('Error submitting response:', error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось отправить ответ",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleDocumentTypeRating = (type: keyof typeof formData.documentTypes, value: number) => {
    setFormData(prev => ({
      ...prev,
      documentTypes: {
        ...prev.documentTypes,
        [type]: value
      }
    }));
  };

  const handleUsabilityRating = (type: keyof typeof formData.usability, value: number) => {
    setFormData(prev => ({
      ...prev,
      usability: {
        ...prev.usability,
        [type]: value
      }
    }));
  };

  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <SurveyQuestion
            title="Общая информация"
            tooltipContent="Базовая информация о вашей роли и планируемом использовании базы знаний"
            question="К какому отделу вы относитесь?"
            options={departments.map(dept => ({
              value: dept.id.toString(),
              label: dept.name
            }))}
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
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="section-title">Типы документов</h2>
              <p className="question-text">Оцените важность следующих типов документов (от 1 до 5):</p>
              <div className="space-y-4">
                {Object.entries(formData.documentTypes).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                    <span className="text-base">{getDocumentTypeLabel(key)}</span>
                    <Rating
                      value={value}
                      onChange={(newValue) => handleDocumentTypeRating(key as keyof typeof formData.documentTypes, newValue)}
                      max={5}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="section-title">Удобство использования</h2>
              <p className="question-text">Оцените важность следующих характеристик (от 1 до 5):</p>
              <div className="space-y-4">
                {Object.entries(formData.usability).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                    <span className="text-base">{getUsabilityLabel(key)}</span>
                    <Rating
                      value={value}
                      onChange={(newValue) => handleUsabilityRating(key as keyof typeof formData.usability, newValue)}
                      max={5}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
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

  const getDocumentTypeLabel = (key: string): string => {
    const labels: Record<string, string> = {
      templates: "Шаблоны документов",
      regulations: "Регламенты и процедуры",
      faq: "Часто задаваемые вопросы (FAQ)",
      training: "Обучающие материалы",
      reference: "Справочная информация",
      contacts: "Контактные данные сотрудников"
    };
    return labels[key] || key;
  };

  const getUsabilityLabel = (key: string): string => {
    const labels: Record<string, string> = {
      search: "Поиск по базе знаний",
      navigation: "Удобство навигации",
      organization: "Организация материалов"
    };
    return labels[key] || key;
  };

  const mapIntegrationPreference = (integration: string): string => {
    const mapping: Record<string, string> = {
      'full': 'api',
      'partial': 'plugin',
      'minimal': 'standalone',
      'none': 'standalone'
    };
    return mapping[integration] || 'standalone';
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
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            renderQuestion()
          )}
          
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