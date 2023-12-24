// import { DEFAULT_BOARD_IMAGE } from "@/lib/constants";
// import { unsplash } from "@/lib/unsplash";

// async function getImages(query: string) {
//   const response = await unsplash.search.getPhotos({
//     query,
//     perPage: 10,
//   });

//   if (!response.response) return [DEFAULT_BOARD_IMAGE];

//   const urls = response.response.results.map((result) => {
//     return result.urls.small;
//   });

//   console.log(urls.length);

//   return urls;
// }

// export { getImages };

import { DEFAULT_BOARD_IMAGE } from "@/lib/constants";
import { unsplash } from "@/lib/unsplash";

async function getImages(query: string) {
  const response = await unsplash.search.getPhotos({
    query,
    perPage: 10,
  });

  if (!response.response) return [DEFAULT_BOARD_IMAGE];

  const urls = response.response.results.map((result) => {
    return {
      small: result.urls.small,
      big: result.urls.full,
    };
  });

  console.log(urls.length);

  return urls;
}

export { getImages };
