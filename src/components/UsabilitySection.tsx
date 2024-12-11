import { Rating } from "./Rating";

interface UsabilitySectionProps {
  usability: {
    search: number;
    navigation: number;
    organization: number;
  };
  onRatingChange: (type: string, value: number) => void;
}

export function UsabilitySection({ usability, onRatingChange }: UsabilitySectionProps) {
  const getUsabilityLabel = (key: string): string => {
    const labels: Record<string, string> = {
      search: "Поиск по базе знаний",
      navigation: "Удобство навигации",
      organization: "Организация материалов"
    };
    return labels[key] || key;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="section-title">Удобство использования</h2>
        <p className="question-text">Оцените важность следующих характеристик (от 1 до 5):</p>
        <div className="space-y-4">
          {Object.entries(usability).map(([key, value]) => (
            <Rating
              key={key}
              value={value}
              onChange={(newValue) => onRatingChange(key, newValue)}
              max={5}
              label={getUsabilityLabel(key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}