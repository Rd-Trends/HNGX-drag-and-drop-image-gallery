import HomeContainer from "@/containers/HomeContainer";
import React from "react";
import Provider from "./provider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

async function Home() {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <div>
      <Provider>
        <HomeContainer user={session?.user} />
      </Provider>
    </div>
  );
}

export default Home;
