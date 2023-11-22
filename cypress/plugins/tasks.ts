import {
  Session,
  SupabaseClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

export async function getUserSession({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Create a session for the user if it doesn't exist already.
  // You can then log in as any number of test users from your tests.

  const res = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { session: res.data.session as Session, supabaseUrl, supabaseKey };
}
