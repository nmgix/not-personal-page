import { useArticlesSearch } from "@/hooks/useArticlesSearch";
import { useRef, useState } from "react";

export const useInput = (inputPlacholderWords: string[], setArticlesData: ReturnType<typeof useArticlesSearch>["setArticlesData"]) => {
  const placeholders = useRef(inputPlacholderWords.map(w => `например, ${w}`));
  const [input, setInput] = useState("");
  const onInput = (searchWord: string) => {
    setArticlesData({ articles: null, totalPages: 0 });
    setInput(searchWord);
  };
  // const onInputEnd = (searchWord: string) => {
  //   console.log(searchWord);
  // };

  return { placeholders, input, setInput, onInput };
};
