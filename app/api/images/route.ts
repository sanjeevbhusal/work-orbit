import { BoardImage } from "@/lib/types";
import { unsplash } from "@/lib/unsplash";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await unsplash.photos.getRandom({
    collectionIds: ["317099"],
    count: 10,
  });

  const urls = response.response as Record<string, any>[];

  const formattedUrls: BoardImage[] = urls.map((result) => {
    return {
      description: result.alt_description,
      small: result.urls.small,
      large: result.urls.full,
    };
  });

  return NextResponse.json({ data: formattedUrls });
}
