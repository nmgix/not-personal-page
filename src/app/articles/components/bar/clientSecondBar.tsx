"use client";

export const ClientArticlesAmountBar = ({ articlesAmount, articlesLoaded }: { articlesAmount: number; articlesLoaded: number | undefined }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <span>{articlesAmount} articles</span>
      {!!articlesLoaded && <span style={{ fontSize: 10 }}>&#40;{articlesLoaded} loaded&#41;</span>}
    </div>
  );
};
