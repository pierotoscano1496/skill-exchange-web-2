"use server";

import { getBackendInstance } from "@/utils/constants.backend";

export const checkServer = async () => {
  const resp = await (await getBackendInstance()).get("simple-check");
  return resp.data as string;
};
