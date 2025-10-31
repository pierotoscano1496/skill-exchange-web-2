import { useUserContext } from "@/hooks/user-context";

export function useUser() {
  return useUserContext();
}
