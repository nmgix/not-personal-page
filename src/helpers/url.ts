export function urldecode(url: string) {
  return decodeURIComponent(url.replace(/\+/g, " "));
}
export function getRelativeImgUrl(imgUrl: string, host: string, article: { category: string; name: string }) {
  //  check if image is relative to current blog (doesnt start with http:// for example)
  if (imgUrl.startsWith("http")) return imgUrl;
  // http://localhost:3000/api/images/blog/testarticle/meme-65.jpg
  return [host, "api", "images", article.category, article.name, imgUrl.replace(/^(\.\/|\/)/, "")].join("/");
}

// https://github.com/vercel/next.js/discussions/16429#discussioncomment-9964094
export const getBaseURL = async () => {
  // Client
  if (typeof window !== "undefined") {
    return new URL("/", window.location.origin);
  }

  // Server
  try {
    const { headers } = await import("next/headers");
    const headersObj = Object.fromEntries(await headers());
    return new URL(headersObj["x-forwarded-proto"] + "://" + headersObj["x-forwarded-host"]);
  } catch {}

  // Fallback for SSG, you may use a custom env instead (Solution no. 2)
  if (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === "develop") {
    return new URL("https://staging.example.com");
  }
  if (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === "main") {
    return new URL("https://www.example.com");
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return new URL(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`);
  }
  return new URL(`http://localhost:3000`);
};
