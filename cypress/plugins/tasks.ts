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
  const supabaseUrl = `https://vwaxrdibijdprvuysfxd.supabase.co`;
  const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YXhyZGliaWpkcHJ2dXlzZnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5ODQwMDEsImV4cCI6MjAwODU2MDAwMX0.OGD7_fQXbVixgUKpxsIrHRhXGOD4vsULGsm_DgKha7k`;
  const supabase = createClient(supabaseUrl, supabaseKey);
  // const supabase = createClientComponentClient();

  // Create a session for the user if it doesn't exist already.
  // You can then log in as any number of test users from your tests.

  const res = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { session: res.data.session as Session };
}
