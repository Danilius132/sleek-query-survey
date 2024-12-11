import { useState } from "react";
import { SurveyProgress } from "@/components/SurveyProgress";
import { SurveyTooltip } from "@/components/SurveyTooltip";
import { Rating } from "@/components/Rating";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Опрос для разработки корпоративной базы знаний</h1>
          <p className="text-muted-foreground">
            Помогите нам создать эффективный инструмент для работы всей организации
          </p>
        </div>

        <SurveyProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <div className="survey-card space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold">Общая информация</h2>
                  <SurveyTooltip content="Базовая информация о вашей роли и планируемом использовании базы знаний" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>К какому отделу вы относитесь?</Label>
                    <RadioGroup
                      value={formData.department}
                      onValueChange={(value) => 
                        setFormData(prev => ({ ...prev, department: value }))
                      }
                      className="mt-2 space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="legal" id="legal" />
                        <Label htmlFor="legal">Юридический отдел</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sales" id="sales" />
                        <Label htmlFor="sales">Отдел продаж</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="management" id="management" />
                        <Label htmlFor="management">Руководство</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Другое</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Как часто вы планируете использовать базу знаний?</Label>
                    <RadioGroup
                      value={formData.frequency}
                      onValueChange={(value) => 
                        setFormData(prev => ({ ...prev, frequency: value }))
                      }
                      className="mt-2 space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="several-times-day" id="several-times-day" />
                        <Label htmlFor="several-times-day">Несколько раз в день</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="daily" />
                        <Label htmlFor="daily">Ежедневно</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="several-times-week" id="several-times-week" />
                        <Label htmlFor="several-times-week">Несколько раз в неделю</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="several-times-month" id="several-times-month" />
                        <Label htmlFor="several-times-month">Несколько раз в месяц</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="less" id="less" />
                        <Label htmlFor="less">Реже</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold">Содержание и структура</h2>
                  <SurveyTooltip content="Оцените важность различных типов документов для вашей работы" />
                </div>
                
                <div className="space-y-4">
                  <Label>Оцените важность следующих типов документов (от 1 до 5)</Label>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Шаблоны документов</span>
                      <Rating 
                        value={formData.documentTypes.templates}
                        onChange={(value) => 
                          setFormData(prev => ({
                            ...prev,
                            documentTypes: {
                              ...prev.documentTypes,
                              templates: value
                            }
                          }))
                        }
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Регламенты и процедуры</span>
                      <Rating 
                        value={formData.documentTypes.regulations}
                        onChange={(value) => 
                          setFormData(prev => ({
                            ...prev,
                            documentTypes: {
                              ...prev.documentTypes,
                              regulations: value
                            }
                          }))
                        }
                      />
                    </div>
                    
                    {/* Add similar Rating components for other document types */}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add similar sections for steps 3-6 */}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Назад
            </Button>
            <Button onClick={handleNext}>
              {currentStep === TOTAL_STEPS ? "Завершить" : "Далее"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}