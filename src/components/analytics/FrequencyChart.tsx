import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { CHART_COLORS } from "@/lib/constants";

interface FrequencyChartProps {
  data: {
    name: string;
    "Несколько раз в день": number;
    "Ежедневно": number;
    "Несколько раз в неделю": number;
    "Несколько раз в месяц": number;
  }[];
}

export function FrequencyChart({ data }: FrequencyChartProps) {
  return (
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
                light: CHART_COLORS.primary,
                dark: CHART_COLORS.primary
              }
            }}
          }}
        >
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="Несколько раз в день" fill={CHART_COLORS.primary} />
            <Bar dataKey="Ежедневно" fill={CHART_COLORS.secondary} />
            <Bar dataKey="Несколько раз в неделю" fill={CHART_COLORS.tertiary} />
            <Bar dataKey="Несколько раз в месяц" fill={CHART_COLORS.quaternary} />
            <ChartLegend>
              <ChartLegendContent />
            </ChartLegend>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}