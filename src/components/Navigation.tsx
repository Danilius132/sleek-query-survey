import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-card border-b border-border/10 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          <Link
            to="/"
            className={cn(
              "py-4 border-b-2 transition-colors hover:text-primary",
              location.pathname === "/" 
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            )}
          >
            Опрос
          </Link>
          <Link
            to="/analytics"
            className={cn(
              "py-4 border-b-2 transition-colors hover:text-primary",
              location.pathname === "/analytics"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            )}
          >
            Аналитика
          </Link>
        </div>
      </div>
    </nav>
  );
}