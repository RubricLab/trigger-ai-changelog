import { Footer } from "./components/Footer";
import { Form } from "./components/Form";
import { Gradients } from "./components/Gradients";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <div className="flex flex-col items-center justify-center mx-auto space-y-16 sm:space-y-24 px-4 md:px-12 pt-16 max-w-7xl">
        <h1 className="mt-12 sm:mt-24 text-centers font-extrabold text-center text-bright text-3xl sm:text-5xl">
          Generate a<br />
          Changelog using AI
        </h1>
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16">
          <Form />
          <div className="col-span-1 lg:col-span-7 xl:col-span-8 max-w-full space-y-4 pb-40 sm:pb-20">
            <div className="flex flex-col text-center items-center justify-center h-full py-16 space-y-4 rounded-lg border border-dashed border-slate-700">
              <p className="text-4xl">✨</p>
              <span className="text-dimmed w-64">
                Enter a public repo URL to generate your changelog.
              </span>
            </div>
          </div>
        </div>
        <Gradients />
      </div>
      <Footer />
    </main>
  );
}
