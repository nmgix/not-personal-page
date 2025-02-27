import { TemplateVariant } from "@/widgets/BottomCleverBar";
import { lazy } from "react";

const BackButton = lazy(() => import("@/components/Generic/Buttons").then(c => ({ default: c.BackButton })));

export const ArticleBar: TemplateVariant = [null, <BackButton />];
