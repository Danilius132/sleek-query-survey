import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { CHART_COLORS } from "@/lib/constants";

interface UsabilityChartProps {
  data: {
    name: string;
    "Поиск": number;
    "Навигация": number;
    "Организация": number;
  }[];
}

export function UsabilityChart({ data }: UsabilityChartProps) {
  return (
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
            <Bar dataKey="Поиск" fill={CHART_COLORS.primary} />
            <Bar dataKey="Навигация" fill={CHART_COLORS.secondary} />
            <Bar dataKey="Организация" fill={CHART_COLORS.tertiary} />
            <ChartLegend>
              <ChartLegendContent />
            </ChartLegend>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}