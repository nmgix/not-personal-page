import { getAllDocsFolders } from "@/serverfunctions/getDoc";

export const ArticlesAmountBar = () => {
  const articlesAmount = getAllDocsFolders().length;
  return <>{articlesAmount} articles</>;
};
