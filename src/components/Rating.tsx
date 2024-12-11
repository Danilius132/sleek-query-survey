import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export function Rating({ value, onChange, max = 5 }: RatingProps) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: max }, (_, i) => i + 1).map((rating) => (
        <button
          key={rating}
          onClick={() => onChange(rating)}
          className={cn(
            "w-8 h-8 rounded-md border text-sm transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50",
            value === rating
              ? "bg-primary text-primary-foreground border-primary shadow-md"
              : "bg-secondary text-secondary-foreground border-border/5 hover:border-primary/50"
          )}
        >
          {rating}
        </button>
      ))}
    </div>
  );
}