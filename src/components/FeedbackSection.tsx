import { SurveyTooltip } from "./SurveyTooltip";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

interface FeedbackSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function FeedbackSection({ value, onChange }: FeedbackSectionProps) {
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
            value={value}
            onChange={(e) => onChange(e.target.value)}
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
}