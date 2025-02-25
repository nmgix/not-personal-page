import { doscDirectory, getAllDocsFolders } from "./getDoc";

import path from "path";
import fs from "fs";
import { articleFileName, ArticleTag } from "@/types/articles";
import matter from "gray-matter";

function getAllTags() {
  const tags = new Map<string, number>();
  try {
    const filesFolders = getAllDocsFolders();

    filesFolders.forEach(fileFolder => {
      const fileContents = fs.readFileSync(path.join(fileFolder, articleFileName), "utf8");
      if (!fileContents) return;
      const { data } = matter(fileContents);
      if (!data.tags || !Array.isArray(data.tags) || data.tags.length === 0) return;
      data.tags.forEach((t: string) => {
        let existingTag = tags.get(t);
        if (!isNaN(Number(existingTag)) || existingTag == undefined) tags.set(t, !isNaN(Number(existingTag)) ? ++(existingTag as number) : 1);
      });
    });
    return tags;
  } catch (error) {
    console.log("getAllTags", error);
    return tags;
  }
}

function articlesTags() {
  const articles = new Map<string, string[]>();
  try {
    const filesFolders = getAllDocsFolders();

    // const tags: { [x: string]: ArticleTag } = {};
    filesFolders.forEach(fileFolder => {
      const fileContents = fs.readFileSync(path.join(fileFolder, articleFileName), "utf8");
      if (!fileContents) return;
      const { data } = matter(fileContents);
      if (!data.tags || !Array.isArray(data.tags) || data.tags.length === 0) return;
      articles.set(fileFolder, data.tags);
    });
    return articles;
  } catch (error) {
    console.log("articlesTags", error);
    return articles;
  }
}

export function calculateAllTagsPopularity(): ArticleTag[] {
  try {
    const tags = getAllTags();
    const mapped = tags.entries().map(([tag, popularity]) => ({ tag, popularity } as ArticleTag));
    return [...mapped];
  } catch (error) {
    console.log("calculateAllTagsPopularity", error);
    return [];
  }
}

export function getPopularTags(limit: number = 5): ArticleTag[] {
  try {
    const tags = calculateAllTagsPopularity();
    return tags.sort((tA, tB) => tB.popularity - tA.popularity).slice(0, limit);
  } catch (error) {
    console.log("getPopularTags", error);
    return [];
  }
}

export function searchByTags(searchTags: string[]): string[] {
  const foundPages: string[] = [];
  try {
    const articleTags = articlesTags();

    articleTags.forEach((tags, article) => {
      let foundTags = tags.filter(function (n) {
        return searchTags.indexOf(n) !== -1;
      });
      if (foundTags.length === searchTags.length) foundPages.push(article);
    });

    return foundPages.map(f => path.relative(doscDirectory, f).replace(/\\/g, "/"));
  } catch (error) {
    console.log("searchByTags", error);
    return foundPages;
  }
}
