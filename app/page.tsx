import { Dashboard } from "./components/Dashboard";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <div className="flex flex-col items-center justify-center mx-auto space-y-12 px-4 md:px-12 pb-20 pt-12 max-w-7xl">
        <div className="text-center space-y-4">
          <h1>
            Generate changelogs{" "}
            <span className="bg-gradient-to-r from-slate-300 via-indigo-500 to-green-500 text-transparent bg-clip-text">
              in seconds.
            </span>
          </h1>
          <div className="text-dimmed">
            To get started, enter your repo URL.
          </div>
        </div>
        <Dashboard />
      </div>
      <Footer />
    </main>
  );
}
