import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FrequencyChart } from "@/components/analytics/FrequencyChart";
import { DocumentTypesChart } from "@/components/analytics/DocumentTypesChart";
import { UsabilityChart } from "@/components/analytics/UsabilityChart";

interface AnalyticsData {
  departments: {
    [key: string]: {
      frequency: { [key: string]: number };
      documentTypes: { [key: string]: number };
      usability: { [key: string]: number };
      integration: { [key: string]: number };
    };
  };
}

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const { toast } = useToast();

  const fetchAnalytics = async () => {
    try {
      const { data: responses } = await supabase
        .from("survey_responses")
        .select(`
          id,
          department,
          frequency,
          document_ratings (
            document_type,
            rating
          ),
          usability_ratings (
            feature_type,
            rating
          ),
          integration_preferences (
            preference
          )
        `);

      if (!responses) return;

      const processedData: AnalyticsData = {
        departments: {}
      };

      responses.forEach((response) => {
        const dept = response.department;
        if (!processedData.departments[dept]) {
          processedData.departments[dept] = {
            frequency: {},
            documentTypes: {},
            usability: {},
            integration: {}
          };
        }

        // Обработка частоты использования
        if (!processedData.departments[dept].frequency[response.frequency]) {
          processedData.departments[dept].frequency[response.frequency] = 0;
        }
        processedData.departments[dept].frequency[response.frequency]++;

        // Обработка оценок документов
        response.document_ratings?.forEach((rating) => {
          if (!processedData.departments[dept].documentTypes[rating.document_type]) {
            processedData.departments[dept].documentTypes[rating.document_type] = 0;
          }
          processedData.departments[dept].documentTypes[rating.document_type] += rating.rating;
        });

        // Обработка оценок юзабилити
        response.usability_ratings?.forEach((rating) => {
          if (!processedData.departments[dept].usability[rating.feature_type]) {
            processedData.departments[dept].usability[rating.feature_type] = 0;
          }
          processedData.departments[dept].usability[rating.feature_type] += rating.rating;
        });

        // Обработка предпочтений интеграции
        response.integration_preferences?.forEach((pref) => {
          if (!processedData.departments[dept].integration[pref.preference]) {
            processedData.departments[dept].integration[pref.preference] = 0;
          }
          processedData.departments[dept].integration[pref.preference]++;
        });
      });

      // Вычисляем средние значения для оценок
      Object.keys(processedData.departments).forEach((dept) => {
        const deptData = processedData.departments[dept];
        
        // Среднее для документов
        Object.keys(deptData.documentTypes).forEach((type) => {
          const total = responses.filter(r => r.department === dept).length;
          deptData.documentTypes[type] = Number((deptData.documentTypes[type] / total).toFixed(1));
        });

        // Среднее для юзабилити
        Object.keys(deptData.usability).forEach((type) => {
          const total = responses.filter(r => r.department === dept).length;
          deptData.usability[type] = Number((deptData.usability[type] / total).toFixed(1));
        });
      });

      setAnalyticsData(processedData);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные аналитики",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleReset = async () => {
    setIsResetting(true);
    try {
      const { error } = await supabase.rpc('clear_survey_responses');
      if (error) throw error;

      toast({
        title: "Успех",
        description: "Все ответы успешно удалены",
      });

      // Обновляем данные
      await fetchAnalytics();
    } catch (error) {
      console.error("Error resetting survey responses:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить ответы",
        variant: "destructive"
      });
    } finally {
      setIsResetting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-muted-foreground">Нет данных для отображения</div>
      </div>
    );
  }

  const departments = Object.keys(analyticsData.departments);

  const frequencyData = departments.map(dept => ({
    name: dept,
    "Несколько раз в день": analyticsData.departments[dept].frequency["several-times-day"] || 0,
    "Ежедневно": analyticsData.departments[dept].frequency["daily"] || 0,
    "Несколько раз в неделю": analyticsData.departments[dept].frequency["several-times-week"] || 0,
    "Несколько раз в месяц": analyticsData.departments[dept].frequency["several-times-month"] || 0
  }));

  const docTypesData = departments.map(dept => ({
    name: dept,
    "Шаблоны": analyticsData.departments[dept].documentTypes["templates"] || 0,
    "Регламенты": analyticsData.departments[dept].documentTypes["regulations"] || 0,
    "FAQ": analyticsData.departments[dept].documentTypes["faq"] || 0,
    "Обучение": analyticsData.departments[dept].documentTypes["training"] || 0,
    "Справочники": analyticsData.departments[dept].documentTypes["reference"] || 0,
    "Контакты": analyticsData.departments[dept].documentTypes["contacts"] || 0
  }));

  const usabilityData = departments.map(dept => ({
    name: dept,
    "Поиск": analyticsData.departments[dept].usability["search"] || 0,
    "Навигация": analyticsData.departments[dept].usability["navigation"] || 0,
    "Организация": analyticsData.departments[dept].usability["organization"] || 0
  }));

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Аналитика по опросу</h1>

      <FrequencyChart data={frequencyData} />
      <DocumentTypesChart data={docTypesData} />
      <UsabilityChart data={usabilityData} />

      <div className="flex justify-center pt-8">
        <Button 
          variant="destructive" 
          onClick={handleReset}
          disabled={isResetting}
        >
          {isResetting ? "Удаление..." : "Сбросить результаты"}
        </Button>
      </div>
    </div>
  );
}