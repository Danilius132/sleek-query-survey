import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface SurveyRadioGroupProps {
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
}

export function SurveyRadioGroup({ options, value, onValueChange }: SurveyRadioGroupProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className="space-y-2"
    >
      {options.map((option) => (
        <Label
          key={option.value}
          htmlFor={option.value}
          className={cn(
            "flex items-center space-x-3 rounded-lg p-3 cursor-pointer transition-all duration-200",
            "hover:bg-secondary/80 hover:border-primary/20",
            "border border-transparent",
            value === option.value && "bg-secondary border-primary/20"
          )}
        >
          <RadioGroupItem
            value={option.value}
            id={option.value}
            className="size-5"
            aria-label={option.label}
          />
          <span className="text-base">{option.label}</span>
        </Label>
      ))}
    </RadioGroup>
  );
}