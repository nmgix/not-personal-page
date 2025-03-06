import path, { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import { ArticleData, articleFileName, ArticleVideoPreview } from "@/types/articles";
import { articleTypes } from "@/types/consts";

export const doscDirectory = join(process.cwd(), "articles");

// https://github.com/nmgix/portfolio/blob/main/helpers/getDocBySlug.ts
export function getDocBySlug(category: string, slug: string /*, locale: string*/): ArticleData | undefined {
  try {
    if (!articleTypes.some(t => t === category)) throw Error("category not found");
    const regex = new RegExp(`^\/?(${articleTypes.join("|")})(\/|$)`, "i");
    const realSlug = slug.replace(regex, "");
    const fullPath = join(doscDirectory, category, realSlug, articleFileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return { slug: `${category}/${realSlug}`, meta: data as ArticleData["meta"], text: content };
  } catch (error) {
    return undefined;
  }
}
export function getDocBySlugShorten(category: string, slug: string /*, locale: string*/): Omit<ArticleData, "text"> | undefined {
  try {
    if (!articleTypes.some(t => t === category)) throw Error("category not found");
    const regex = new RegExp(`^\/?(${articleTypes.join("|")})(\/|$)`, "i");
    const realSlug = slug.replace(regex, "");
    const fullPath = join(doscDirectory, category, realSlug, articleFileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return { slug: `${category}/${realSlug}`, meta: data as ArticleData["meta"] };
  } catch (error) {
    return undefined;
  }
}
export function findInDoc(category: string, slug: string, words: string[], includeText: boolean) {
  try {
    if (!articleTypes.some(t => t === category)) throw Error("category not found");
    const regex = new RegExp(`^\/?(${articleTypes.join("|")})(\/|$)`, "i");
    const realSlug = slug.replace(regex, "");
    const fullPath = join(doscDirectory, category, realSlug, articleFileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const wordsMatch = new RegExp(words.join("|"), "gi").test(content);
    if (wordsMatch) {
      if (includeText) return { slug: `${category}/${realSlug}`, meta: data as ArticleData["meta"], text: content } as ArticleData;
      else return { slug: `${category}/${realSlug}`, meta: data as ArticleData["meta"] } as Omit<ArticleData, "text">; // хотя мб text:undefined тоже подошёл бы
    } else {
      return null;
    }
  } catch (error) {
    return undefined;
  }
}

function fileListWithoutMD(dir: string) {
  try {
    return fs.readdirSync(dir).reduce((acc, curr) => {
      // return acc.concat(curr.replace(".md", ""));
      return acc.concat(`${dir}/${curr}`);
    }, [] as string[]);
  } catch (error) {
    console.log("fileListWithoutMD", error);
    return [];
  }
}

const ignoreFiles = [".gitkeep"] as const;

export function getAllDocsFolders() {
  try {
    return articleTypes
      .map(t => fileListWithoutMD(path.join(doscDirectory, t)))
      .flat()
      .filter(fileLink => !ignoreFiles.some(ignoreFile => fileLink.endsWith(ignoreFile)));
  } catch (error) {
    console.log("getAllDocsFolders", error);
    return [];
  }
}

function sortDocsDesc() {
  try {
    const filesFolders = getAllDocsFolders();

    const files: { file: string; date: number }[] = [];

    filesFolders.forEach(fileFolder => {
      const fileContents = fs.readFileSync(path.join(fileFolder, articleFileName), "utf8");
      if (!fileContents) return;
      const { data } = matter(fileContents);
      if (!data.date) return;
      files.push({ file: path.relative(doscDirectory, fileFolder).replace(/\\/g, "/"), date: Number(new Date(data.date)) });
    });

    return files;
  } catch (error) {
    console.log("sortDocsDesc", error);
    return [];
  }
}

export function getLatestDocs(limit: number = 3) {
  try {
    const files = sortDocsDesc();
    return files.sort((fA, fB) => fB.date - fA.date).slice(0, limit);
  } catch (error) {
    console.log("getLatestDocs", error);
    return [];
  }
}

const mockVideo = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
const mockImagePreview = "https://placehold.co/600x400";
const mockRelatedTags: ArticleVideoPreview["videoPreview"]["relatedTagsIcons"] = ["blog", "grid-blocks", "code"];
export function getProjectVideoPreview(category: string, slug: string): ArticleVideoPreview | undefined {
  try {
    const file = getDocBySlugShorten(category, slug);
    if (!file) return undefined; // неправильно
    return {
      meta: file.meta,
      slug: file.slug,
      videoPreview: { videoSrc: mockVideo, imagePlaceholderSrc: mockImagePreview, relatedTagsIcons: mockRelatedTags }
    };
  } catch (error) {
    console.log("getProjectVideoPreview", error);
    return undefined;
  }
}

export function getCategorySlugs(category: string) {
  try {
    return fileListWithoutMD(path.join(doscDirectory, category));
  } catch (error) {
    console.log("getCategorySlugs", error);
    return [];
  }
}
