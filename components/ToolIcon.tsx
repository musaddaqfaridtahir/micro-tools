import React from "react";
import {
  Calculator,
  Briefcase,
  Car,
  Zap,
  Scale,
  CalendarDays,
  Divide,
  Receipt,
  Moon,
  Landmark,
  Percent,
  Home,
} from "lucide-react";
import type { ToolIconName } from "@/lib/tools-registry";

interface ToolIconProps {
  name: ToolIconName;
  className?: string;
}

export default function ToolIcon({ name, className = "h-5 w-5" }: ToolIconProps) {
  switch (name) {
    case "calculator":
      return <Calculator className={className} />;
    case "briefcase":
      return <Briefcase className={className} />;
    case "car":
      return <Car className={className} />;
    case "zap":
      return <Zap className={className} />;
    case "scale":
      return <Scale className={className} />;
    case "calendar":
      return <CalendarDays className={className} />;
    case "divide":
      return <Divide className={className} />;
    case "receipt":
      return <Receipt className={className} />;
    case "moon":
      return <Moon className={className} />;
    case "landmark":
      return <Landmark className={className} />;
    case "percent":
      return <Percent className={className} />;
    case "home":
      return <Home className={className} />;
    default:
      return <Calculator className={className} />;
  }
}
