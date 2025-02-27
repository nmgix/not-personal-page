import { getAllDocsFolders } from "@/app/serverfunctions/getDoc";

export const ArticlesAmountBar = () => {
  console.log("he he");
  const articlesAmount = getAllDocsFolders().length;
  return <>{articlesAmount} articles</>;
};
