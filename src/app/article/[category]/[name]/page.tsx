import { getDocBySlug } from "@/app/serverfunctions/getDoc";
import { getDocImages, getDocLinks } from "@/app/serverfunctions/getDocLinks";
import { calculateAllTagsPopularity } from "@/app/serverfunctions/tags";
import { ImageElement } from "@/components/Specialized/ImageList";
import { GlobalRoutes, tagPopularityBaseDecrementLevel } from "@/types/articles";
import { articleCategories } from "@/types/consts";
import { mockServerArticleFetch } from "@/types/mocks";
import { ArticleDefault } from "@/widgets/ArticlePages";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

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
    console.log("this page does not exist");
    return redirect(GlobalRoutes.home);
  }

  const mappedLinks = getDocLinks(article.slug);
  const mappedImages: ImageElement[] = getDocImages(article.slug).map(i => ({ alt: i.text, src: i.href }));
  const globalTags = calculateAllTagsPopularity();
  const mappedTags = article.meta.tags.map(articleTag => {
    const foundTag = globalTags.find(globalTag => globalTag.tag === articleTag);
    return foundTag ?? { popularity: tagPopularityBaseDecrementLevel, tag: articleTag };
  });

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
