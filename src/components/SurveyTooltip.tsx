import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface SurveyTooltipProps {
  content: string;
}

export function SurveyTooltip({ content }: SurveyTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger className="ml-2">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent className="tooltip-content">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}