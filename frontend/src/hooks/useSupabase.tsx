import { createBrowserClient } from "@supabase/ssr";
import { useMemo } from "react";
import type { Database } from "../app/database.types";

let client: ReturnType<typeof createBrowserClient<Database>> | undefined;
function getSupabaseBrowserClient() {
  if (client) {
    return client;
  }
  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return client;
}

function useSupabase() {
  return useMemo(getSupabaseBrowserClient, []);
}
export default useSupabase;
