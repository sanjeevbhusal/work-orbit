import { DEFAULT_BOARD_IMAGE_URLS } from "@/lib/constants";
import { BoardImage } from "@/lib/types";
import { unsplash } from "@/lib/unsplash";

async function getImages(): Promise<BoardImage[]> {
  try {
    const response = await unsplash.photos.getRandom({
      collectionIds: ["317099"],
      count: 10,
    });

    const urls = response.response as Record<string, any>[];

    const formattedUrls = urls.map((result) => {
      return {
        description: result.alt_description,
        small: result.urls.small,
        big: result.urls.full,
      };
    });

    return formattedUrls;
  } catch (error) {
    return DEFAULT_BOARD_IMAGE_URLS;
  }
}

export { getImages };
