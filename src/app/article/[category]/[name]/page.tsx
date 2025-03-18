import { getDocBySlug, getDocImages, getDocLinks } from "@/serverfunctions/getDoc";
import { calculateAllTagsPopularity, calculateArticleTags } from "@/serverfunctions/tags";
import { ImageElement } from "@/components/Specialized/ImageList";
import { articleCategories, GlobalRoutes } from "@/types/consts";
import { mockServerArticleFetch } from "@/types/mocks";
import { ArticleDefault } from "@/widgets/ArticlePages";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getBaseURL } from "@/helpers/url";

type ArticleProps = {
  params: Promise<{ category: string; name: string }>;
};

export async function generateMetadata({ params /*, searchParams*/ }: ArticleProps, parent: ResolvingMetadata): Promise<Metadata> {
  const articleName = (await params).name;
  const article = await mockServerArticleFetch(articleName);

  const symbols = Object.getOwnPropertySymbols(parent);
  const needed = symbols[6] as keyof ResolvingMetadata;
  const request = parent[needed] as unknown as NextRequest;
  //   console.log(Object.getOwnPropertyDescriptors(request));
  //   console.log(JSON.stringify(Object.fromEntries(request.headers)));
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
  return {
    title: `${process.env.NEXT_PUBLIC_NAME} | Blog//${articleName ?? "Article"}`,
    description: article.textPreview ?? "Статья в блоге",
    authors: [{ name: process.env.NEXT_PUBLIC_NAME }],
    keywords: article.tags,
    openGraph: !request
      ? undefined
      : {
          title: `${process.env.NEXT_PUBLIC_NAME}'s blog article, ${articleName}`,
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

export default async function ArticlePage(props: ArticleProps) {
  const params = await props.params;

  const typeExists = articleCategories.some(ac => ac.type === params.category);
  if (!typeExists) {
    console.log("article type (blog, article or project) is not found, nextjs wtf???");
    console.log("error fetching type, kinda impossible error if article exists lol");
    return redirect(GlobalRoutes.home);
  }
  const article = getDocBySlug(params.category as (typeof getDocBySlug)["arguments"][0], params.name);
  if (!article) {
    console.log(`${Object.values(params).join("/")}: ❌ Страница не найдена`);
    return redirect(GlobalRoutes.home);
  }

  const host = await getBaseURL();

  const mappedLinks = getDocLinks(article.slug);
  const mappedTags = calculateArticleTags(article.meta.tags);
  const mappedImages: ImageElement[] = getDocImages(article.slug, host.origin).map(i => ({ alt: i.text, src: i.href }));

  return (
    <ArticleDefault
      mappedTextLinks={mappedLinks}
      mappedTags={mappedTags}
      imagesSrc={mappedImages}
      TTRmins={article.meta.TTRmins}
      categoryImg={params.category as (typeof ArticleDefault)["arguments"]["categoryImg"]}
      date={article.meta.date}
      text={article.text}
      title={article.meta.title}
      textPreview={article.meta.textPreview}
      slug={article.slug}
    />
  );
}
