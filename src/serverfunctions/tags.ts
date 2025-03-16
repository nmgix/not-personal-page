import { getAllDocsFolders } from "./getDoc";

import path from "path";
import fs from "fs";
import { ArticleTag } from "@/types/articles";
import matter from "gray-matter";
import { docsDirectory, memoize, memoizeDefaultValues, removeFullPath } from "./helpers";
import { apiConsts, tagPopularityBaseDecrementLevel } from "@/types/consts";

function _getArticleTags(filePath: string): Map<string, number> {
  try {
    const tags = new Map<string, number>();

    const fileContents = fs.readFileSync(path.join(filePath, apiConsts.articleFilename), "utf8");
    if (!fileContents) return tags;
    const { data } = matter(fileContents);
    if (!data.tags || !Array.isArray(data.tags) || data.tags.length === 0) return tags;
    data.tags.forEach((t: string) => {
      let existingTag = tags.get(t);
      if (!isNaN(Number(existingTag)) || existingTag == undefined) tags.set(t, !isNaN(Number(existingTag)) ? ++(existingTag as number) : 1);
    });
    return tags;
  } catch (error) {
    console.log("getArticleTags", error);
    return new Map();
  }
}
const getArticleTags = memoize(_getArticleTags, memoizeDefaultValues.maxCacheSize, memoizeDefaultValues.ttl, removeFullPath);

function getAllTagsAppearance() {
  let tags = new Map<string, number>();
  try {
    const filesFolders = getAllDocsFolders();

    filesFolders.forEach(fileFolder => {
      const fileTags = getArticleTags(fileFolder);
      fileTags.forEach((popularity, tag) => {
        const tagPopularity = (tags.get(tag) || 0) + popularity;
        tags.set(tag, Math.max(Math.min(tagPopularity, tagPopularityBaseDecrementLevel)));
      });
    });
    return tags;
  } catch (error) {
    console.log("getAllTagsAppearance", error);
    return tags;
  }
}

function _articlesTags() {
  const articles = new Map<string, string[]>();
  try {
    const filesFolders = getAllDocsFolders();

    // const tags: { [x: string]: ArticleTag } = {};
    filesFolders.forEach(fileFolder => {
      const articleTags = getArticleTags(fileFolder);
      if (articleTags) articles.set(fileFolder, [...articleTags.keys()]);
    });
    return articles;
  } catch (error) {
    console.log("articlesTags", error);
    return articles;
  }
}
const articlesTags = memoize(_articlesTags, 1, 8 * 3600 * 1000);

export function calculateAllTagsPopularity(): ArticleTag[] {
  try {
    const tags = getAllTagsAppearance();
    const mapped = tags.entries().map(([tag, popularity]) => ({ tag, popularity } as ArticleTag));
    return [...mapped];
  } catch (error) {
    console.log("calculateAllTagsPopularity", error);
    return [];
  }
}

export function calculateArticleTags(tags: string[]): ArticleTag[] {
  try {
    const globalTags = getAllTagsAppearance();
    const matched: ArticleTag[] = (tags ?? []).map(t => {
      const foundTagPopularity = globalTags.get(t);
      return { popularity: foundTagPopularity ? tagPopularityBaseDecrementLevel - foundTagPopularity : tagPopularityBaseDecrementLevel, tag: t };
    });

    return matched;
  } catch (error) {
    console.log("calculateArticleTags", error);
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

function _searchByTags(searchTags: string[]): string[] {
  const foundPages: string[] = [];
  try {
    const articleTags = articlesTags();

    articleTags.forEach((tags, article) => {
      let foundTags = tags.filter(function (n) {
        return searchTags.indexOf(n) !== -1;
      });
      if (foundTags.length === searchTags.length) foundPages.push(article);
    });

    return foundPages.map(removeFullPath);
  } catch (error) {
    console.log("searchByTags", error);
    return foundPages;
  }
}
export const searchByTags = memoize(_searchByTags, 12);

function _getDocTopTag(category: string, slug: string) {
  const articleTags = getArticleTags(path.join(docsDirectory, `${category}/${slug}`));
  return (([tag, popularity]) => ({ tag, popularity }))(
    Array.from(articleTags.entries()).reduce((max, curr) => (curr[1] > max[1] ? curr : max), ["", tagPopularityBaseDecrementLevel])
  );
}
export const getDocTopTag = memoize(_getDocTopTag, 15);
