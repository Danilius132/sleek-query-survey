import { useEffect, useState } from "react";
import { api } from "@/lib/api";
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
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { results } = await api.getAnalytics();
      setAnalyticsData(results);
    };
    fetchAnalytics();
  }, []);

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const departments = Object.keys(analyticsData);

  const frequencyData = departments.map(dept => ({
    name: dept,
    "Несколько раз в день": analyticsData[dept].frequency["several-times-day"],
    "Ежедневно": analyticsData[dept].frequency["daily"],
    "Несколько раз в неделю": analyticsData[dept].frequency["several-times-week"]
  }));

  const docTypesData = departments.map(dept => ({
    name: dept,
    "Шаблоны": analyticsData[dept].documentTypes.templates,
    "Регламенты": analyticsData[dept].documentTypes.regulations,
    "FAQ": analyticsData[dept].documentTypes.faq,
    "Обучение": analyticsData[dept].documentTypes.training,
    "Справочники": analyticsData[dept].documentTypes.reference,
    "Контакты": analyticsData[dept].documentTypes.contacts
  }));

  const usabilityData = departments.map(dept => ({
    name: dept,
    "Поиск": analyticsData[dept].usability.search,
    "Навигация": analyticsData[dept].usability.navigation,
    "Организация": analyticsData[dept].usability.organization
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