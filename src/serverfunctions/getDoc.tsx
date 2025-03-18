import path, { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import { ArticleData, ArticleListElementProps, ArticleVideoPreview } from "@/types/articles";
import { apiConsts, articlesSearchConsts, articleTypes } from "@/types/consts";
import { docsDirectory, memoize, removeFullPath, setDocMtime, shuffle } from "./helpers";
import { getPopularTags, searchByTags } from "./tags";
import { getRelativeImgUrl } from "@/helpers/url";

// https://github.com/nmgix/portfolio/blob/main/helpers/getDocBySlug.ts
export function getDocBySlug(category: string, slug: string /*, locale: string*/): ArticleData | undefined {
  try {
    if (!articleTypes.some(t => t === category)) throw Error("category not found");
    const regex = new RegExp(`^\/?(${articleTypes.join("|")})(\/|$)`, "i");
    const realSlug = slug.replace(regex, "");
    const fullPath = join(docsDirectory, category, realSlug, apiConsts.articleFilename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    if (!data["date"]) setDocMtime(data, fullPath);
    // вот здесь надо data.datE форматнуть, надо бы zod подключить
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
    const fullPath = join(docsDirectory, category, realSlug, apiConsts.articleFilename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    if (!data["date"]) setDocMtime(data, fullPath);

    // вот здесь надо data.datE форматнуть, надо бы zod подключить

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

    const fullPath = join(docsDirectory, category, realSlug, apiConsts.articleFilename);
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

function _fileListWithoutMD(dir: string) {
  try {
    return fs.readdirSync(dir).reduce((acc, curr) => {
      const currPath = path.join(dir, curr);
      const isFolder = fs.lstatSync(currPath).isDirectory();
      const containsMainMd = isFolder === true ? fs.readdirSync(currPath).includes(apiConsts.articleFilename) : false;
      return isFolder && containsMainMd ? acc.concat(`${dir}/${curr}`) : acc;
    }, [] as string[]);
  } catch (error) {
    console.log("fileListWithoutMD", error);
    return [];
  }
}
const fileListWithoutMD = memoize(_fileListWithoutMD);

export function getAllDocsFolders(limit?: number) {
  try {
    const categories = [...articleTypes];
    shuffle(categories);
    return categories
      .slice(0, limit)
      .map(t => fileListWithoutMD(path.join(docsDirectory, t)))
      .flat();
  } catch (error) {
    console.log("getAllDocsFolders", error);
    return [];
  }
}

function sortDocsDesc(limit?: number) {
  try {
    let found = 0;
    const filesFolders = getAllDocsFolders();
    const files: { file: string; date: number }[] = [];

    filesFolders.some(fileFolder => {
      if (!!limit && found >= limit) return true;
      const fullPath = path.join(fileFolder, apiConsts.articleFilename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      if (!fileContents) return;
      const { data } = matter(fileContents);
      if (!data["date"]) setDocMtime(data, fullPath);
      files.push({ file: removeFullPath(fileFolder), date: Number(new Date(data.date)) });
      ++found;
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
    return fileListWithoutMD(path.join(docsDirectory, category)).map(fileFolder => removeFullPath(fileFolder));
  } catch (error) {
    console.log("getCategorySlugs", error);
    return [];
  }
}

const imgRegexp = new RegExp(/!\[([^\[.]+?)\]\((.+?)\)/gm); // [title](link)
const linksRegexp = new RegExp(/!?\[([^\[.]+?)\]\((.+?)\)/gm); // ![imgtitle](link)
export function getDocLinks(path: string) {
  try {
    const md = fs.readFileSync(join(docsDirectory, path, apiConsts.articleFilename), "utf8");
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

export function getDocImages(path: string, host: string) {
  try {
    const md = fs.readFileSync(join(docsDirectory, path, apiConsts.articleFilename), "utf8");
    let hrefAndTextMd = [];
    let result: any = "";
    while ((result = imgRegexp.exec(md))) {
      const [category, name] = path.split("/");
      hrefAndTextMd.push({
        href: getRelativeImgUrl(result[2], host, { category, name }), // внутри .md файла ссылка не меняется ведь,  getDocImages для сайдбара изображения
        text: result[1]
      });
    }

    return hrefAndTextMd;
  } catch (error) {
    console.log("getDocImages", error);
    return [];
  }
}

export const getArticles = (
  article: { tag?: string | string[]; category?: string; text?: string[] },
  pagination?: Partial<{ start: number; limit: number }>
): { articles: ArticleListElementProps[]; total: number } => {
  try {
    pagination = {
      start: pagination?.start ?? 0,
      limit: (pagination?.start ?? 0) + (!isNaN(pagination?.limit!) ? Number(pagination!.limit) : articlesSearchConsts.articlesPerPage)
    };
    let searchTags: string[] = [];
    if (article.tag) searchTags = searchTags.concat(article.tag);
    else searchTags.concat(getPopularTags().map(t => t.tag));
    const foundArticlesSlugs = searchByTags(searchTags ?? [], article.category ? [article.category] : [], {
      start: pagination.start!,
      end: pagination.limit!
    });
    const articles: ArticleListElementProps[] = [];

    if (foundArticlesSlugs.slugs.length > 0) {
      if (article.text && article.text.length > 0) article.text = article.text!.map(a => a.trim()).filter(a => a.length > 0);
      if (article.text && article.text.length > 0) {
        // если после строчки выше будет пустой массив то скип, да, хреновая проверка
        foundArticlesSlugs.slugs.forEach(slug => {
          const [category, fileRoute] = slug.split("/");
          const currArticle = findInDoc(category, fileRoute, article.text!, false);
          if (!!currArticle) articles.push({ ...currArticle.meta, slug });
        });
      } else {
        foundArticlesSlugs.slugs.forEach(slug => {
          const [category, fileRoute] = slug.split("/");
          const article = getDocBySlugShorten(category, fileRoute);
          if (!!article) articles.push({ ...article.meta, slug });
        });
      }
    }
    return { articles, total: foundArticlesSlugs.total };
  } catch (error) {
    console.log("getArticles", error);
    return { articles: [], total: 0 };
  }
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

  return { articles: articles.map(removeFullPath), newSeed: seed, newIndex: currentIndex };
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
