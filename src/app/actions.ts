"use server";

import { redirect } from "next/navigation";

export async function searchMovie(formData: FormData) {
  const title = formData.get("title");
  redirect(`?s=${title}&page=1`);
}
