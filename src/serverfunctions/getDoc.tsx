import path, { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import { ArticleData, articleFileName, ArticleListElementProps, ArticleVideoPreview } from "@/types/articles";
import { articleTypes } from "@/types/consts";
import { memoize, shuffle } from "./helpers";
import { getPopularTags, searchByTags } from "./tags";

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
export function getDocBySlugShorten(
  category: string,
  slug: string /*, locale: string*/
): Omit<ArticleData, "text"> | ArticleVideoPreview | undefined {
  try {
    // console.log(category);
    if (!articleTypes.some(t => t === category)) throw Error("category not found");
    const regex = new RegExp(`^\/?(${articleTypes.join("|")})(\/|$)`, "i");
    const realSlug = slug.replace(regex, "");
    const fullPath = join(doscDirectory, category, realSlug, articleFileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return { slug: `${category}/${realSlug}`, meta: data as ArticleData["meta"] };
  } catch (error) {
    console.log("getDocBySlugShorten", error);
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

function _getAllDocsFolders(limit?: number) {
  try {
    const categories = [...articleTypes];
    shuffle(categories);
    return categories
      .slice(0, limit)
      .map(t => fileListWithoutMD(path.join(doscDirectory, t)))
      .flat()
      .filter(fileLink => !ignoreFiles.some(ignoreFile => fileLink.endsWith(ignoreFile)));
  } catch (error) {
    console.log("getAllDocsFolders", error);
    return [];
  }
}
export const getAllDocsFolders = memoize(_getAllDocsFolders);

function sortDocsDesc(limit?: number) {
  try {
    let found = 0;
    const filesFolders = getAllDocsFolders();
    const files: { file: string; date: number }[] = [];

    filesFolders.some(fileFolder => {
      if (!!limit && found >= limit) return true;
      const fileContents = fs.readFileSync(path.join(fileFolder, articleFileName), "utf8");
      if (!fileContents) return;
      const { data } = matter(fileContents);
      if (!data.date) return;
      ++found;
      files.push({ file: path.relative(doscDirectory, fileFolder).replace(/\\/g, "/"), date: Number(new Date(data.date)) });
    });
    return files;
  } catch (error) {
    console.log("sortDocsDesc", error);
    return [];
  }
}

function _getLatestDocs(limit = 3) {
  try {
    const files = sortDocsDesc(limit);
    return files.sort((fA, fB) => fB.date - fA.date).slice(0, limit);
  } catch (error) {
    console.log("getLatestDocs", error);
    return [];
  }
}
export const getLatestDocs = memoize(_getLatestDocs);

export function getCategorySlugs(category: string) {
  try {
    return fileListWithoutMD(path.join(doscDirectory, category))
      .map(fileFolder => path.relative(doscDirectory, fileFolder).replace(/\\/g, "/"))
      .filter(fileLink => !ignoreFiles.some(ignoreFile => fileLink.endsWith(ignoreFile)));
  } catch (error) {
    console.log("getCategorySlugs", error);
    return [];
  }
}

const imgRegexp = new RegExp(/!\[([^\[.]+?)\]\((.+?)\)/gm); // [title](link)
const linksRegexp = new RegExp(/!?\[([^\[.]+?)\]\((.+?)\)/gm); // ![imgtitle](link)
export function getDocLinks(path: string) {
  try {
    const md = fs.readFileSync(join(doscDirectory, path, articleFileName), "utf8");
    let mdWithoutImg = String(md).replace(imgRegexp, "");
    let hrefAndTextMd = [];
    let result: any = "";
    while ((result = linksRegexp.exec(mdWithoutImg))) {
      hrefAndTextMd.push({
        href: result[2],
        title: result[1]
      });
    }
    return hrefAndTextMd;
  } catch (error) {
    console.log("getDocLinks", error);
    return [];
  }
}

export function getDocImages(path: string) {
  try {
    const md = fs.readFileSync(join(doscDirectory, path, articleFileName), "utf8");
    let hrefAndTextMd = [];
    let result: any = "";
    while ((result = imgRegexp.exec(md))) {
      hrefAndTextMd.push({
        href: result[2],
        text: result[1]
      });
    }

    return hrefAndTextMd;
  } catch (error) {
    console.log("getDocImages", error);
    return [];
  }
}

export const getArticles = (articleTag?: string, articleText?: string[], articleCategory?: string) => {
  let searchTags: string[] = [];
  if (articleTag) searchTags.push(articleTag);
  else searchTags = getPopularTags(3).map(t => t.tag);

  // articleCategory либо тут

  const foundArticlesSlugs = searchByTags(searchTags ?? []);
  // либо вот тут            ^ articleCategory втиснуть типо искать по тегам внутри категории

  // console.log({ foundArticlesSlugs });
  const articles: ArticleListElementProps[] = [];
  if (foundArticlesSlugs.length > 0) {
    if (articleText && articleText.length > 0) {
      foundArticlesSlugs.forEach(slug => {
        const [category, fileRoute] = slug.split("/");
        const article = findInDoc(category, fileRoute, articleText, false);
        if (article) articles.push({ ...article.meta, slug });
      });
    } else {
      foundArticlesSlugs.forEach(slug => {
        const [category, fileRoute] = slug.split("/");
        const article = getDocBySlugShorten(category, fileRoute);
        if (article !== undefined) articles.push({ ...article.meta, slug });
      });
    }
  }
  return articles;
};

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function _getRandomArticlesWithSeed(paths: string[], start: number = 0, limit: number, seed: number) {
  const random = seededRandom(seed);
  const articles: string[] = [];

  const remaining = [...paths];
  let currentIndex = start;

  for (let i = 0; i < limit && remaining.length > 0; i++) {
    const randomIndex = Math.floor(random() * remaining.length);
    articles.push(remaining.splice(randomIndex, 1)[0]);
    currentIndex++;
  }

  return { articles: articles.map(a => path.relative(doscDirectory, a).replace(/\\/g, "/")), newSeed: seed, newIndex: currentIndex };
}

export const getRandomArticlesWithSeed = memoize(_getRandomArticlesWithSeed);

export const getRandomArticles = (start: number = 0, limit: number = 5, seed: number = Date.now()) => {
  const files = getAllDocsFolders(limit);
  return getRandomArticlesWithSeed(files, start, limit, seed);
};

function _getArticleMetaField(category: string, slug: string, field: keyof Exclude<ReturnType<typeof getDocBySlugShorten>, undefined>["meta"]) {
  const file = getDocBySlugShorten(category, slug);
  if (!file) return;
  return file["meta"][field];
}
export const getArticleMetaField = memoize(_getArticleMetaField);
