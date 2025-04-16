"use server";

import { revalidatePath } from "next/cache";

export const addComment = async (success: boolean) => {
  if (success) {
    revalidatePath("/");
  }
};
