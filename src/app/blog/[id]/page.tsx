import { TArticleDefault } from "@/types/articles";
import { mockImages } from "@/types/mocks";
import { TNextProps } from "@/types/next";
import { ArticleDefault } from "@/widgets/ArticlePages";

import type { Metadata, ResolvingMetadata } from "next";
import { NextRequest } from "next/server";

const mockServerArticleFetch = async (id: string) => {
  // console.log(id);
  const apiArticle: TArticleDefault = {
    id: "ec957c53-8081-440b-b441-461357222144",
    href: "/blog/some-ideas",
    category: "blog",
    tags: ["ideas", "news", "new", "gamedev"],
    date: 1677678611000,
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
    imagesSrc: mockImages
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

export default async function BlogArticle(props: { params: Promise<{ id: string }> }) {
  //   console.log(props);
  const { id } = await props.params;
  const article = await mockServerArticleFetch(id);

  // через server функцию мапатьвесть текст и вытаскивать ссылки
  const mappedLinks = [
    { title: "game", href: "https://google.com/search" },
    { href: "some-other-page.coolnick.com" },
    { href: "and-other-page.coolnick.com" }
  ];

  const mappedTags = article.tags.map(t => ({ popularity: Math.round(Math.random() * 50), tag: t }));

  return <ArticleDefault {...article} mappedTextLinks={mappedLinks} mappedTags={mappedTags} />;
}
