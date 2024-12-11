import { useState, useEffect } from "react";
import { SurveyProgress } from "@/components/SurveyProgress";
import { SurveyTooltip } from "@/components/SurveyTooltip";
import { Rating } from "@/components/Rating";
import { NavigationButtons } from "@/components/NavigationButtons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 6;

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
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
  });
  
  const { toast } = useToast();

  // Auto-scroll to question on step change
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
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="section-title">Общая информация</h2>
                <SurveyTooltip content="Базовая информация о вашей роли и планируемом использовании базы знаний" />
              </div>
              
              <div className="space-y-3">
                <Label className="question-text">
                  К какому отделу вы относитесь?
                </Label>
                <RadioGroup
                  value={formData.department}
                  onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, department: value }))
                  }
                  className="space-y-2"
                >
                  {[
                    ["legal", "Юридический отдел"],
                    ["sales", "Отдел продаж"],
                    ["management", "Руководство"],
                    ["other", "Другое"]
                  ].map(([value, label]) => (
                    <div key={value} className="radio-label">
                      <RadioGroupItem value={value} id={value} className="size-5" />
                      <Label htmlFor={value} className="text-base">{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="section-title">Частота использования</h2>
                <SurveyTooltip content="Информация о планируемой частоте использования базы знаний" />
              </div>
              
              <div className="space-y-3">
                <Label className="question-text">
                  Как часто вы планируете использовать базу знаний?
                </Label>
                <RadioGroup
                  value={formData.frequency}
                  onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, frequency: value }))
                  }
                  className="space-y-2"
                >
                  {[
                    ["several-times-day", "Несколько раз в день"],
                    ["daily", "Ежедневно"],
                    ["several-times-week", "Несколько раз в неделю"],
                    ["several-times-month", "Несколько раз в месяц"],
                    ["less", "Реже"]
                  ].map(([value, label]) => (
                    <div key={value} className="radio-label">
                      <RadioGroupItem value={value} id={value} className="size-5" />
                      <Label htmlFor={value} className="text-base">{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="section-title">Типы документов</h2>
                <SurveyTooltip content="Оцените важность различных типов документов для вашей работы" />
              </div>
              
              <div className="space-y-5">
                <Label className="question-text">
                  Оцените важность следующих типов документов (от 1 до 5)
                </Label>
                
                <div className="space-y-4">
                  {[
                    ["templates", "Шаблоны документов"],
                    ["regulations", "Регламенты и процедуры"],
                    ["faq", "Часто задаваемые вопросы (FAQ)"],
                    ["training", "Обучающие материалы"],
                    ["reference", "Справочная информация"],
                    ["contacts", "Контактные данные сотрудников"]
                  ].map(([key, label]) => (
                    <div key={key} className="flex justify-between items-center bg-secondary/50 p-4 rounded-lg">
                      <span className="text-base">{label}</span>
                      <Rating 
                        value={formData.documentTypes[key as keyof typeof formData.documentTypes]}
                        onChange={(value) => 
                          setFormData(prev => ({
                            ...prev,
                            documentTypes: {
                              ...prev.documentTypes,
                              [key]: value
                            }
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="section-title">Удобство использования</h2>
                <SurveyTooltip content="Оцените важность различных аспектов удобства использования" />
              </div>
              
              <div className="space-y-5">
                <Label className="question-text">
                  Оцените важность следующих характеристик (от 1 до 5)
                </Label>
                
                <div className="space-y-4">
                  {[
                    ["search", "Поиск по базе знаний"],
                    ["navigation", "Удобство навигации"],
                    ["organization", "Организация материалов"]
                  ].map(([key, label]) => (
                    <div key={key} className="flex justify-between items-center bg-secondary/50 p-4 rounded-lg">
                      <span className="text-base">{label}</span>
                      <Rating 
                        value={formData.usability[key as keyof typeof formData.usability]}
                        onChange={(value) => 
                          setFormData(prev => ({
                            ...prev,
                            usability: {
                              ...prev.usability,
                              [key]: value
                            }
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="section-title">Интеграция</h2>
                <SurveyTooltip content="Выберите предпочтительный способ интеграции с существующими системами" />
              </div>
              
              <div className="space-y-3">
                <Label className="question-text">
                  Какой способ интеграции с существующими системами вы предпочитаете?
                </Label>
                <RadioGroup
                  value={formData.integration}
                  onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, integration: value }))
                  }
                  className="space-y-2"
                >
                  {[
                    ["full", "Полная интеграция со всеми системами"],
                    ["partial", "Частичная интеграция с основными системами"],
                    ["minimal", "Минимальная интеграция"],
                    ["none", "Без интеграции"]
                  ].map(([value, label]) => (
                    <div key={value} className="radio-label">
                      <RadioGroupItem value={value} id={value} className="size-5" />
                      <Label htmlFor={value} className="text-base">{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="section-title">Дополнительные пожелания</h2>
                <SurveyTooltip content="Поделитесь своими идеями и пожеланиями по улучшению базы знаний" />
              </div>
              
              <div className="space-y-3">
                <Label className="question-text">
                  Какие дополнительные функции или возможности вы хотели бы видеть в базе знаний?
                </Label>
                <textarea
                  value={formData.feedback}
                  onChange={(e) => 
                    setFormData(prev => ({ ...prev, feedback: e.target.value }))
                  }
                  className={cn(
                    "w-full min-h-[150px] p-4 rounded-lg bg-secondary/50 border border-border/5",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50",
                    "placeholder:text-muted-foreground resize-none"
                  )}
                  placeholder="Введите ваши пожелания..."
                />
              </div>
            </div>
          </div>
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