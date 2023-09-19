import Feed from "./components/Feed";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <div className="grow flex flex-col space-y-8 items-center justify-center w-full max-w-3xl">
        <h1>
          Generate changelogs in{" "}
          <span className="bg-gradient-to-r from-white via-indigo-500 to-green-500 text-transparent bg-clip-text">
            seconds
          </span>
        </h1>
        <div className="text-dimmed">To get started, enter your repo URL.</div>
        <Feed />
      </div>
      <Footer />
    </main>
  );
}
