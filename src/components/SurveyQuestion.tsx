import { SurveyTooltip } from "@/components/SurveyTooltip";
import { SurveyRadioGroup } from "@/components/SurveyRadioGroup";

interface QuestionProps {
  title: string;
  tooltipContent?: string;
  question: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}

export function SurveyQuestion({
  title,
  tooltipContent,
  question,
  options,
  value,
  onChange
}: QuestionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="section-title">{title}</h2>
          {tooltipContent && <SurveyTooltip content={tooltipContent} />}
        </div>
        
        <div className="space-y-3">
          <p className="question-text">{question}</p>
          <SurveyRadioGroup
            options={options}
            value={value}
            onValueChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}