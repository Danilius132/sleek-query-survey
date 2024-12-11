import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

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

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Получаем все ответы на опросы
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

        // Преобразуем данные в нужный формат
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
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

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
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">Нет данных для отображения</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const departments = Object.keys(analyticsData.departments);

  const frequencyData = departments.map(dept => ({
    name: dept,
    "Несколько раз в день": analyticsData.departments[dept].frequency["several-times-day"] || 0,
    "Ежедневно": analyticsData.departments[dept].frequency["daily"] || 0,
    "Несколько раз в неделю": analyticsData.departments[dept].frequency["several-times-week"] || 0
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

      <Card>
        <CardHeader>
          <CardTitle>Частота использования по отделам</CardTitle>
          <CardDescription>
            Как часто сотрудники планируют использовать базу знаний
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ChartContainer
            className="w-full h-full"
            config={{
              frequency: {
                theme: {
                  light: "#E15858",
                  dark: "#E15858"
                }
              }
            }}
          >
            <BarChart data={frequencyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="Несколько раз в день" fill="#E15858" />
              <Bar dataKey="Ежедневно" fill="#F87171" />
              <Bar dataKey="Несколько раз в неделю" fill="#FCA5A5" />
              <ChartLegend>
                <ChartLegendContent />
              </ChartLegend>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Оценка типов документов</CardTitle>
          <CardDescription>
            Средняя оценка важности различных типов документов
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ChartContainer
            className="w-full h-full"
            config={{
              docTypes: {
                theme: {
                  light: "#E15858",
                  dark: "#E15858"
                }
              }
            }}
          >
            <BarChart data={docTypesData}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Bar dataKey="Шаблоны" fill="#E15858" />
              <Bar dataKey="Регламенты" fill="#F87171" />
              <Bar dataKey="FAQ" fill="#FCA5A5" />
              <Bar dataKey="Обучение" fill="#EF4444" />
              <Bar dataKey="Справочники" fill="#DC2626" />
              <Bar dataKey="Контакты" fill="#B91C1C" />
              <ChartLegend>
                <ChartLegendContent />
              </ChartLegend>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Оценка удобства использования</CardTitle>
          <CardDescription>
            Средняя оценка различных аспектов удобства использования
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ChartContainer
            className="w-full h-full"
            config={{
              usability: {
                theme: {
                  light: "#E15858",
                  dark: "#E15858"
                }
              }
            }}
          >
            <BarChart data={usabilityData}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Bar dataKey="Поиск" fill="#E15858" />
              <Bar dataKey="Навигация" fill="#F87171" />
              <Bar dataKey="Организация" fill="#FCA5A5" />
              <ChartLegend>
                <ChartLegendContent />
              </ChartLegend>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}