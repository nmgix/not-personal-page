import { getDocBySlug } from "@/app/api/getDoc";
import { GlobalRoutes, tagPopularityBaseDecrementLevel, TArticleDefault } from "@/types/articles";
import { articleCategories } from "@/types/consts";
import { mockImages } from "@/types/mocks";
import { TNextProps } from "@/types/next";
import { ArticleDefault, ArticleDefaultProps } from "@/widgets/ArticlePages";
import { redirect } from "next/navigation";

import type { Metadata, ResolvingMetadata } from "next";
import { NextRequest } from "next/server";
import { getDocImages, getDocLinks } from "@/app/api/getDocLinks";
import { ImageElement } from "@/components/Specialized/ImageList";
import { calculateAllTagsPopularity } from "@/app/api/tags";

const mockServerArticleFetch = async (id: string) => {
  // console.log(id);
  const apiArticle: TArticleDefault & { slug: string } = {
    // id: "ec957c53-8081-440b-b441-461357222144",
    // href: "/blog/some-ideas",
    categoryImg: "blog",
    tags: ["ideas", "news", "new", "gamedev"],
    date: "2023-03-01 16:50:01",
    // text: "тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст.",
    text: [
      "тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как",
      "изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз",
      "как разделять на отдельные части, как изображения вставлять, md parcer в помощь.",
      "Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст.",
      "изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз, как разделять на отдельные части, как изображения вставлять, md parcer в помощь. Пока тестовый текст. тут хз",
      "как разделять на отдельные части, как изображения вставлять, md parcer в помощь."
    ],
    title: id ?? "Некоторые идеи",
    TTRmins: 5,
    textPreview: "just some really long description not to fit in shortened, consider api output limits from cache (so cache these descriptions)",
    imagesSrc: mockImages,
    slug: "blog/some-news-123"
  };
  return apiArticle;
};

export async function generateMetadata({ params /*, searchParams*/ }: TNextProps, parent: ResolvingMetadata): Promise<Metadata> {
  const id = (await params).id;
  const article = await mockServerArticleFetch(id);

  const symbols = Object.getOwnPropertySymbols(parent);
  const needed = symbols[6] as keyof ResolvingMetadata;
  const request = parent[needed] as unknown as NextRequest;
  //   console.log(Object.getOwnPropertyDescriptors(request));
  //   console.log(JSON.stringify(Object.fromEntries(request.headers)));
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
  return {
    title: `${process.env.NEXT_PUBLIC_NAME} | Blog//${id ?? "Article"}`,
    description: article.textPreview ?? "Статья в блоге",
    authors: [{ name: process.env.NEXT_PUBLIC_NAME }],
    keywords: article.tags,
    openGraph: !request
      ? undefined
      : {
          title: `${process.env.NEXT_PUBLIC_NAME}'s blog article, ${id}`,
          type: "website",
          locale: "ru-RU",
          images: [],
          //     images: ['/some-specific-page-image.jpg', ...previousImages],
          url:
            request.headers.get("referer") ??
            //   вот мне делать нечего
            `${request.headers.get("x-forwarded-proto")}://${request.headers.get("host")}${
              (request.url as unknown as { pathname: string; search: string }).pathname
            }`
        }
  };
}

export default async function BlogArticle(props: any) {
  //   console.log(props);
  const { id } = await props.params;

  const symbols = Object.getOwnPropertySymbols(props.params);
  const needed = symbols[2] as keyof ResolvingMetadata;
  // console.log(props.params);
  const request = props.params[needed] as unknown as { route: string };
  // console.log(request.route);

  function checkPath(path: string, words: string[]) {
    const wordsSet = new Set(words);
    const match = path.match(/^\/([^\/]+)/); // Находим первое слово после "/"
    if (match && wordsSet.has(match[1])) {
      return match[1]; // Если слово есть в Set — возвращаем его
    }
    return null;
  }

  const type = checkPath(
    request.route,
    articleCategories.map(c => c.type)
  );
  if (!type) {
    console.log("article type (blog, article or project) is not found, nextjs wtf???");
    console.log("error fetching type, kinda impossible error if article exists lol");
    return redirect(GlobalRoutes.home);
  }
  const article = getDocBySlug(type as (typeof getDocBySlug)["arguments"][0], id);
  if (!article) {
    console.log("this page does not exist");
    return redirect(GlobalRoutes.home);
  }
  // const article = await mockServerArticleFetch(id);
  const mappedLinks = getDocLinks(article.slug);
  const mappedImages: ImageElement[] = getDocImages(article.slug).map(i => ({ alt: i.text, src: i.href }));
  // const mappedTags: ArticleDefaultProps['mappedTags'] = article.meta.tags.map(t => ({ tag: t, popularity: 50 }))
  // через server функцию мапатьвесть текст и вытаскивать ссылки
  // const mappedLinks = [
  //   { title: "game", href: "https://google.com/search" },
  //   { href: "some-other-page.coolnick.com" },
  //   { href: "and-other-page.coolnick.com" }
  // ];
  const globalTags = calculateAllTagsPopularity();
  const mappedTags = article.meta.tags.map(articleTag => {
    const foundTag = globalTags.find(globalTag => globalTag.tag === articleTag);
    return foundTag ?? { popularity: tagPopularityBaseDecrementLevel, tag: articleTag };
  });

  // const mappedTags = article.tags.map(t => ({ popularity: Math.round(Math.random() * 50), tag: t }));
  // imagesSrc={mappedImages}

  return (
    <ArticleDefault
      mappedTextLinks={mappedLinks}
      mappedTags={mappedTags}
      imagesSrc={mappedImages}
      TTRmins={article.meta.TTRmins}
      categoryImg={type as (typeof ArticleDefault)["arguments"]["categoryImg"]}
      date={article.meta.date}
      text={article.text}
      title={article.meta.title}
      textPreview={article.meta.textPreview}
      slug={article.slug}
    />
  );
}
