import { getAllDocsFolders } from "@/app/serverfunctions/getDoc";

export const ArticlesAmountBar = () => {
  const articlesAmount = getAllDocsFolders().length;
  console.log(articlesAmount);
  return <>{articlesAmount} articles</>;
};
