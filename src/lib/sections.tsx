import React from "react";
import {
  Brush,
  Code,
  Megaphone,
  NotebookPen,
  Clapperboard,
  Music2,
  Cpu,
  BriefcaseBusiness,
  Building,
  GraduationCap,
  Database,
  TrendingUp,
  Image as ImageIcon,
  Scale,
  Grid3X3,
  Headphones,
} from "lucide-react";
import { CATALOG } from "@/data/catalog";

export type Section = { title: string; icon: React.ReactNode };

// Build the sections array from the centralized CATALOG so NAV and home cards
// always reflect the single source of truth. Keep the original icons mapping.
const ICON_MAP: Record<string, React.ReactNode> = {
  "تصميم": <Brush className="w-8 h-8 text-black" strokeWidth={1.5} />,
  "برمجة وتطوير": <Code className="w-8 h-8 text-black" strokeWidth={1.5} />,
  "تسويق رقمي": <Megaphone className="w-8 h-8 text-black" strokeWidth={1.5} />,
  "كتابة وترجمة": <NotebookPen className="w-8 h-8 text-black" strokeWidth={1.5} />,
  "فيديو وأنيميشن": <Clapperboard className="w-8 h-8 text-black" strokeWidth={1.5} />,
  "صوتيات": <Music2 className="w-8 h-8 text-black" strokeWidth={1.5} />,
  "ذكاء اصطناعي": <Cpu className="w-8 h-8 text-black" strokeWidth={1.5} />,
  "أعمال": <BriefcaseBusiness className="w-8 h-8 text-black" strokeWidth={1.5} />,
  "هندسة وعمارة": <Building className="w-8 h-8 text-black" strokeWidth={1.5} />,
  "تعليم عن بعد": <GraduationCap className="w-8 h-8 text-black" strokeWidth={1.5} />,
  "بيانات": <Database className="w-8 h-8 text-black" strokeWidth={1.5} />,
  "تحسين محركات البحث": <TrendingUp className="w-8 h-8 text-black" strokeWidth={1.5} />,
  "موشن جرافيك": <ImageIcon className="w-8 h-8 text-black" strokeWidth={1.5} />,
  "خدمات قانونية": <Scale className="w-8 h-8 text-black" strokeWidth={1.5} />,
  "دعم فني": <Headphones className="w-8 h-8 text-black" strokeWidth={1.5} />,
  "الحماية الإلكترونية": <Grid3X3 className="w-8 h-8 text-black" strokeWidth={1.5} />,
};

export const sections: Section[] = Object.keys(CATALOG).map((k) => ({ title: k, icon: ICON_MAP[k] ?? <Brush className="w-8 h-8 text-black" /> }));

// ASSISTANT_FINAL: true
