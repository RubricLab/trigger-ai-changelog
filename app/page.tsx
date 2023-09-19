import Feed from "./components/Feed";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <div className="grow flex flex-col space-y-8 items-center justify-start w-full max-w-3xl">
        <Feed />
      </div>
      <Footer />
    </main>
  );
}
