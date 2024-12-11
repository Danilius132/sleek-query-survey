import { useState } from "react";
import { SurveyProgress } from "@/components/SurveyProgress";
import { SurveyTooltip } from "@/components/SurveyTooltip";
import { Rating } from "@/components/Rating";
import { NavigationButtons } from "@/components/NavigationButtons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

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
    }
  });
  
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Опрос для разработки корпоративной базы знаний
          </h1>
          <p className="text-xl text-muted-foreground">
            Помогите нам создать эффективный инструмент для работы всей организации
          </p>
        </div>

        <SurveyProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <div className="survey-card space-y-8">
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="section-title">Общая информация</h2>
                  <SurveyTooltip content="Базовая информация о вашей роли и планируемом использовании базы знаний" />
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="question-text">
                      К какому отделу вы относитесь?
                    </Label>
                    <RadioGroup
                      value={formData.department}
                      onValueChange={(value) => 
                        setFormData(prev => ({ ...prev, department: value }))
                      }
                      className="space-y-3"
                    >
                      {[
                        ["legal", "Юридический отдел"],
                        ["sales", "Отдел продаж"],
                        ["management", "Руководство"],
                        ["other", "Другое"]
                      ].map(([value, label]) => (
                        <div key={value} className="radio-label">
                          <RadioGroupItem value={value} id={value} />
                          <Label htmlFor={value}>{label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <Label className="question-text">
                      Как часто вы планируете использовать базу знаний?
                    </Label>
                    <RadioGroup
                      value={formData.frequency}
                      onValueChange={(value) => 
                        setFormData(prev => ({ ...prev, frequency: value }))
                      }
                      className="space-y-3"
                    >
                      {[
                        ["several-times-day", "Несколько раз в день"],
                        ["daily", "Ежедневно"],
                        ["several-times-week", "Несколько раз в неделю"],
                        ["several-times-month", "Несколько раз в месяц"],
                        ["less", "Реже"]
                      ].map(([value, label]) => (
                        <div key={value} className="radio-label">
                          <RadioGroupItem value={value} id={value} />
                          <Label htmlFor={value}>{label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="section-title">Содержание и структура</h2>
                  <SurveyTooltip content="Оцените важность различных типов документов для вашей работы" />
                </div>
                
                <div className="space-y-6">
                  <Label className="question-text">
                    Оцените важность следующих типов документов (от 1 до 5)
                  </Label>
                  
                  <div className="space-y-6">
                    {[
                      ["templates", "Шаблоны документов"],
                      ["regulations", "Регламенты и процедуры"],
                      ["faq", "Часто задаваемые вопросы (FAQ)"],
                      ["training", "Обучающие материалы"],
                      ["reference", "Справочная информация"],
                      ["contacts", "Контактные данные сотрудников"]
                    ].map(([key, label]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-lg">{label}</span>
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
          )}

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