import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export function Rating({ value, onChange, max = 5 }: RatingProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: max }, (_, i) => i + 1).map((rating) => (
        <button
          key={rating}
          onClick={() => onChange(rating)}
          className={cn(
            "w-10 h-10 rounded-md border transition-all",
            value === rating
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-secondary text-secondary-foreground border-border/5 hover:border-primary/50"
          )}
        >
          {rating}
        </button>
      ))}
    </div>
  );
}