import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Markdown } from "@/app/components/Markdown";
import { getSupabaseChangelogs } from "@/app/actions";
import { client } from "@/trigger";
import { wait } from "@/lib/utils";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";

type Props = {
  params: { repo: string; date: string };
};

export default async function page({ params }: Props) {
  const { repo, date } = params;

  const headersList = headers();
  const host = headersList.get("host");
  const subdomain = host?.split(".")?.[0];

  if (!subdomain) redirect("/");

  const triggerEvent = await getSupabaseChangelogs({
    owner: subdomain,
    repo,
    date,
  });

  const getMarkdown = async (depth: number): Promise<string | null> => {
    if (depth > 5) redirect("/");

    const event = await client.getEvent(triggerEvent.id);

    if (!event?.runs?.length) {
      await wait(1000);
      return await getMarkdown(depth + 1);
    }

    const run = await client.getRun(event.runs[0].id);

    return run.output?.changelogs?.[0]?.markdown;
  };

  const markdown = await getMarkdown(0);

  return (
    <main className="min-h-screen relative">
      <Header />
      <div className="flex flex-col items-center justify-center mx-auto space-y-16 px-4 md:px-12 pb-20 pt-16 max-w-7xl">
        {markdown ? (
          <Markdown markdown={markdown} />
        ) : (
          <div className="text-dimmed text-sm animate pulse">
            Waiting for your first changelog...
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
