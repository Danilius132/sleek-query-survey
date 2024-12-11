import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { SurveyFormData } from '@/types/survey-types';

export const useSurveySubmission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const submitSurvey = async (formData: SurveyFormData) => {
    setIsLoading(true);
    try {
      // Получаем активный опрос
      const { data: surveys } = await supabase
        .from('surveys')
        .select('id')
        .eq('active', true)
        .single();

      if (!surveys) {
        throw new Error('Нет активного опроса');
      }

      // Создаем основной ответ
      const { data: response, error: responseError } = await supabase
        .from('survey_responses')
        .insert({
          survey_id: surveys.id,
          department: formData.department,
          frequency: formData.frequency
        })
        .select()
        .single();

      if (responseError) throw responseError;

      // Сохраняем оценки документов
      const documentRatings = Object.entries(formData.documentTypes).map(([type, rating]) => ({
        response_id: response.id,
        document_type: type,
        rating
      }));

      const { error: docError } = await supabase
        .from('document_ratings')
        .insert(documentRatings);

      if (docError) throw docError;

      // Сохраняем оценки юзабилити
      const usabilityRatings = Object.entries(formData.usability).map(([type, rating]) => ({
        response_id: response.id,
        feature_type: type,
        rating
      }));

      const { error: usabilityError } = await supabase
        .from('usability_ratings')
        .insert(usabilityRatings);

      if (usabilityError) throw usabilityError;

      // Сохраняем предпочтения по интеграции
      const { error: integrationError } = await supabase
        .from('integration_preferences')
        .insert({
          response_id: response.id,
          preference: formData.integration
        });

      if (integrationError) throw integrationError;

      // Сохраняем отзыв
      if (formData.feedback) {
        const { error: feedbackError } = await supabase
          .from('feedback_responses')
          .insert({
            response_id: response.id,
            feedback: formData.feedback
          });

        if (feedbackError) throw feedbackError;
      }

      toast({
        title: "Успех",
        description: "Ваш ответ успешно сохранен!",
      });

      return true;
    } catch (error) {
      console.error('Error submitting survey:', error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось сохранить ответ",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitSurvey, isLoading };
};