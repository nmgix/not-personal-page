import { articleFileName } from "@/types/articles";
import fs from "fs";
import { join } from "path";

// https://github.com/antaresvalle/gettingLinksFromMarkdown/blob/master/dist/gettingLinksFromMarkdown.js

const doscDirectory = join(process.cwd(), "articles");

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
