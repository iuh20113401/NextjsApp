import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://dclaevazetcjjkrzczpc.supabase.co";
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default supabase;
