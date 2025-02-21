import { getAllDocsFolders } from "./getDoc";

import path, { join } from "path";
import fs from "fs";
import { ArticleData, articleFileName, ArticleTag, tagPopularityBaseDecrementLevel } from "@/types/articles";
import matter from "gray-matter";

export function calculateAllTagsPopularity() {
  try {
    const filesFolders = getAllDocsFolders();

    const tags: { [x: string]: ArticleTag } = {};
    filesFolders.forEach(fileFolder => {
      const fileContents = fs.readFileSync(path.join(fileFolder, articleFileName), "utf8");
      if (!fileContents) return;
      const { data } = matter(fileContents);
      if (!data.tags || !Array.isArray(data.tags) || data.tags.length === 0) return;
      data.tags.forEach((t: string) => {
        const ct = tags[t];
        tags[t] = { popularity: ct === undefined ? tagPopularityBaseDecrementLevel : ct.popularity <= 1 ? 0 : --ct.popularity, tag: t };
      });
    });
    return Object.values(tags);
  } catch (error) {
    console.log("calculateAllTagsPopularity", error);
    return [];
  }
}
