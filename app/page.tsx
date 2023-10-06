import { Dashboard } from "./components/Dashboard";
import { Footer } from "./components/Footer";
import { Gradients } from "./components/Gradients";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <div className="flex flex-col items-center justify-center mx-auto space-y-24 px-4 md:px-12 pb-20 pt-16 max-w-7xl">
        <h1 className="mt-24 text-centers font-extrabold text-center text-bright text-5xl">
          Generate a<br />
          Changelog using AI
        </h1>
        <Dashboard />
        <Gradients />
      </div>
      <Footer />
    </main>
  );
}
