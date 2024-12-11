import { SurveyQuestion } from "@/components/SurveyQuestion";

interface DepartmentStepProps {
  value: string;
  onChange: (value: string) => void;
}

export function DepartmentStep({ value, onChange }: DepartmentStepProps) {
  const departmentOptions = [
    { value: "sales-director", label: "Директор по продажам" },
    { value: "executive-director", label: "Исполнительный директор" },
    { value: "commercial-director", label: "Коммерческий директор" },
    { value: "primary-lawyer", label: "Юрист первичного приема" }
  ];

  return (
    <SurveyQuestion
      title="Общая информация"
      question="К какому отделу вы относитесь?"
      options={departmentOptions}
      value={value}
      onChange={onChange}
    />
  );
}