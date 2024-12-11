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
  question,
  options,
  value,
  onChange
}: QuestionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <h2 className="section-title">{title}</h2>
        </div>
        
        <div className="space-y-3">
          <p className="question-text">{question}</p>
          <SurveyRadioGroup
            options={options}
            value={value}
            onValueChange={onChange}
            groupLabel={question}
          />
        </div>
      </div>
    </div>
  );
}