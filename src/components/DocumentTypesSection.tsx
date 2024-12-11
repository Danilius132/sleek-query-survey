import { Rating } from "./Rating";

interface DocumentTypesSectionProps {
  documentTypes: {
    templates: number;
    regulations: number;
    faq: number;
    training: number;
    reference: number;
    contacts: number;
  };
  onRatingChange: (type: string, value: number) => void;
}

export function DocumentTypesSection({ documentTypes, onRatingChange }: DocumentTypesSectionProps) {
  const getDocumentTypeLabel = (key: string): string => {
    const labels: Record<string, string> = {
      templates: "Шаблоны документов",
      regulations: "Регламенты и процедуры",
      faq: "Часто задаваемые вопросы (FAQ)",
      training: "Обучающие материалы",
      reference: "Справочная информация",
      contacts: "Контактные данные сотрудников"
    };
    return labels[key] || key;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="section-title">Типы документов</h2>
        <p className="question-text">Оцените важность следующих типов документов (от 1 до 5):</p>
        <div className="space-y-4">
          {Object.entries(documentTypes).map(([key, value]) => (
            <Rating
              key={key}
              value={value}
              onChange={(newValue) => onRatingChange(key, newValue)}
              max={5}
              label={getDocumentTypeLabel(key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}