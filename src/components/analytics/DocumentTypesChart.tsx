import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { CHART_COLORS } from "@/lib/constants";

interface DocumentTypesChartProps {
  data: {
    name: string;
    "Шаблоны": number;
    "Регламенты": number;
    "FAQ": number;
    "Обучение": number;
    "Справочники": number;
    "Контакты": number;
  }[];
}

export function DocumentTypesChart({ data }: DocumentTypesChartProps) {
  return (
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
                light: CHART_COLORS.primary,
                dark: CHART_COLORS.primary
              }
            }}
          }}
        >
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 5]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="Шаблоны" fill={CHART_COLORS.primary} />
            <Bar dataKey="Регламенты" fill={CHART_COLORS.secondary} />
            <Bar dataKey="FAQ" fill={CHART_COLORS.tertiary} />
            <Bar dataKey="Обучение" fill={CHART_COLORS.quaternary} />
            <Bar dataKey="Справочники" fill={CHART_COLORS.quinary} />
            <Bar dataKey="Контакты" fill={CHART_COLORS.senary} />
            <ChartLegend>
              <ChartLegendContent />
            </ChartLegend>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}