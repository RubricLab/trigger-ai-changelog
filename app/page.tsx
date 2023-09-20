import Feed from "./components/Feed";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <div className="grow flex flex-col items-center justify-center w-full space-y-12 px-4 md:px-12 pb-20 pt-12">
        <div className="text-center space-y-4">
          <h1>
            Generate changelogs in{" "}
            <span className="bg-gradient-to-r from-white via-indigo-500 to-green-500 text-transparent bg-clip-text">
              seconds.
            </span>
          </h1>
          <div className="text-dimmed">
            To get started, enter your repo URL.
          </div>
        </div>
        <Feed />
      </div>
      <Footer />
    </main>
  );
}
