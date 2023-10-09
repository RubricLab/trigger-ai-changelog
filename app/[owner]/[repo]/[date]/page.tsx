import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Markdown } from "@/app/components/Markdown";
import { getSupabaseChangelogs } from "@/app/actions";
import { client } from "@/trigger";
import { wait } from "@/lib/utils";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import Link from "next/link";

type Props = {
  params: { owner: string; repo: string; date: string };
};

export default async function page({ params }: Props) {
  const { owner, repo, date } = params;

  if (!owner || !repo || !date) redirect("/");

  const triggerEvent = await getSupabaseChangelogs({
    owner,
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
      <div className="flex flex-col items-start space-y-4 justify-start mx-auto px-4 md:px-12 pb-20 pt-16 max-w-5xl">
        <div>
          <Link
            href={`https://github.com/${owner}/${repo}`}
            className="text-dimmed"
          >
            {owner}/<span className="font-semibold">{repo}</span>
          </Link>
          <div className="text-dimmed text-sm">
            {new Date(date).toLocaleString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
        {markdown ? (
          <div className="text-left space-y-4">
            <Markdown markdown={markdown} />
          </div>
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
