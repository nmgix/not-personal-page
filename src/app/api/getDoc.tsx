import path, { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import { ArticleData, articleFileName, articleTypes } from "@/types/articles";

const doscDirectory = join(process.cwd(), "articles");

// https://github.com/nmgix/portfolio/blob/main/helpers/getDocBySlug.ts
export function getDocBySlug(category: (typeof articleTypes)[number], slug: string /*, locale: string*/): ArticleData | undefined {
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
  category: (typeof articleTypes)[number],
  slug: string /*, locale: string*/
): Omit<ArticleData, "text"> | undefined {
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

function fileListWithoutMD(dir: string) {
  return fs.readdirSync(dir).reduce((acc, curr) => {
    // return acc.concat(curr.replace(".md", ""));
    return acc.concat(`${dir}/${curr}`);
  }, [] as string[]);
}

const ignoreFiles = [".gitkeep"] as const;

export function getAllDocsFolders() {
  return articleTypes
    .map(t => fileListWithoutMD(path.join(doscDirectory, t)))
    .flat()
    .filter(fileLink => !ignoreFiles.some(ignoreFile => fileLink.endsWith(ignoreFile)));
}

function sortDocsDesc() {
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
}

export function getLatestDocs(limit: number = 3) {
  const files = sortDocsDesc();
  console.log({ files });
  return files.sort((fA, fB) => fB.date - fA.date).slice(0, limit);
}
