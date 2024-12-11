import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  label: string;
}

export function Rating({ value, onChange, max = 5, label }: RatingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.closest('.rating-container') !== container) return;

      switch (e.key) {
        case 'ArrowLeft':
          onChange(Math.max(1, value - 1));
          break;
        case 'ArrowRight':
          onChange(Math.min(max, value + 1));
          break;
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [value, onChange, max]);

  return (
    <div 
      ref={containerRef}
      className="rating-container flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
      role="group"
      aria-label={label}
    >
      <span className="text-base">{label}</span>
      <div 
        className="flex gap-1.5"
        role="radiogroup"
        aria-label={`Оценка для ${label}`}
      >
        {Array.from({ length: max }, (_, i) => i + 1).map((rating) => (
          <button
            key={rating}
            onClick={() => onChange(rating)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onChange(rating);
              }
            }}
            className={cn(
              "w-8 h-8 rounded-md border text-sm font-medium transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              "hover:scale-110 hover:border-primary/40",
              value === rating
                ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                : "bg-secondary text-secondary-foreground border-border/5 hover:bg-secondary/80"
            )}
            role="radio"
            aria-checked={value === rating}
            aria-label={`Оценка ${rating} из ${max}`}
            tabIndex={0}
          >
            {rating}
          </button>
        ))}
      </div>
    </div>
  );
}