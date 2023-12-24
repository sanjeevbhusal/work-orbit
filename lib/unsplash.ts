import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY as string,
  fetch: fetch,
});

export { unsplash };
