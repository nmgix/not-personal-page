import { GlobalRoutes } from "@/types/articles";
import { redirect } from "next/navigation";

export default function Index() {
  // мб уведа что страница не существует в клеинстком toast внутри root layout?
  return redirect(GlobalRoutes.home);
}
