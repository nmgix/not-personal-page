import { TemplateVariant } from "@/widgets/BottomCleverBar";
// import { lazy } from "react";
import { ArticlesAmountBar } from "./secondBar";
// нельзя lazy потому что server component
// const ArticlesAmountBar = lazy(() => import("./secondBar").then(c => ({ default: c.ArticlesAmountBar })));

export const ArticlesSearchBar: TemplateVariant = [null, <ArticlesAmountBar />];
