import { docsDirectory } from "@/serverfunctions/helpers";
import { join } from "path";
import { promises as fs } from "fs";
import mime from "mime/lite";

export async function GET(_req: Request, { params }: { params: Promise<{ category: string; article: string; imageName: string }> }) {
  try {
    const { category, article, imageName } = await params;
    const fullPath = join(docsDirectory, category, article, imageName);

    const mimeType = mime.getType(imageName);
    if (!mimeType) throw new Error("mimetype not found");
    if (!mimeType.includes("image/")) throw new Error("mimetype doesnt include image/");

    const fileContents = await fs.readFile(fullPath);
    if (!fileContents) throw new Error("file not found");
    return new Response(fileContents, { status: 302, headers: [["Content-Type", mimeType]] });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Image not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
}
