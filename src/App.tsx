import "./App.css";
import ThemeControler from "@/components/ThemeController";
import SearchInput from "@/components/SearchInput";
import Filters from "@/components/Filters";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <header className="navbar min-h-10 p-4 shadow-sm">
        <div className="bg flex w-full justify-between">
          <a className="btn btn-ghost text-xl">NoozFeed</a>
          <ThemeControler />
        </div>
      </header>
      <main className="h-[calc(100vh-11.25em)] flex-1 overflow-y-auto p-5">
        <div className="bg bg-base-300 flex w-full justify-between">
          <SearchInput />
          <Filters />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
