import { ChangelogActions } from "@/app/components/ChangelogActions";
import { ChangelogLoading } from "@/app/components/ChangelogLoading";
import { Markdown } from "@/app/components/Markdown";
import { supabase } from "@/jobs";
import { Footer } from "../../../../components/Footer";
import { Form } from "../../../../components/Form";
import { Gradients } from "../../../../components/Gradients";
import { Header } from "../../../../components/Header";

export default async function Changelog({
  params: { owner, repo, changelogId },
}: {
  params: { owner: string; repo: string; changelogId: number };
}) {
  //load the data from Supabase
  const changelogRecord = await supabase.native
    .from("changelogs")
    .select(
      `
          id,
          start_date,
          end_date,
          markdown,
          repo: repos(*)
          `
    )
    .eq("id", changelogId)
    .maybeSingle();

  const repoRecord = changelogRecord.data?.repo;

  console.log(changelogRecord.data?.start_date);
  console.log(
    changelogRecord.data?.start_date
      ? new Date(changelogRecord.data?.start_date)
      : undefined
  );

  return (
    <main className="min-h-screen relative">
      <Header />
      <div className="flex flex-col items-center justify-center mx-auto space-y-16 sm:space-y-24 px-4 md:px-12 pt-16 max-w-7xl">
        <h1 className="mt-12 sm:mt-24 text-centers font-extrabold text-center text-bright text-3xl sm:text-5xl">
          Generate a<br />
          Changelog using AI
        </h1>
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16">
          <Form
            defaultRepoUrl={repoRecord?.repo_url}
            defaultStartDate={
              changelogRecord.data?.start_date
                ? new Date(changelogRecord.data?.start_date)
                : undefined
            }
            defaultEndDate={
              changelogRecord.data?.end_date
                ? new Date(changelogRecord.data?.end_date)
                : undefined
            }
          />
          <div className="col-span-1 lg:col-span-7 xl:col-span-8 max-w-full space-y-4 pb-40 sm:pb-20">
            <h2>
              {owner}/{repo}
            </h2>
            <div className="w-full flex flex-col space-y-4">
              {changelogRecord?.data?.markdown ? (
                <>
                  <ChangelogActions
                    markdown={changelogRecord?.data?.markdown ?? undefined}
                  />
                  <Markdown markdown={changelogRecord.data.markdown} />
                </>
              ) : (
                <ChangelogLoading changelogId={changelogId} />
              )}
            </div>
          </div>
        </div>
        <Gradients />
      </div>
      <Footer />
    </main>
  );
}
