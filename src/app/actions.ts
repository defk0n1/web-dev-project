"use server";

import { revalidateTag } from "next/cache";

export default async function cacheReval(tag:string) {
  revalidateTag(tag);
  console.log(`revalidated ${tag}`)
}