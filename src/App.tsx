import "./App.css";
import ThemeControler from "@/components/ThemeController";
import Footer from "@/components/Footer";
import AppProvider from "@/providers/AppProvider";
import Feeds from "@/components/Feeds";
import Tab from "./components/Tab";
import Tabs from "./components/Tabs";

function App() {
  return (
    <>
      <header className="navbar min-h-10 p-4 shadow-sm">
        <div className="bg flex w-full justify-between">
          <a className="btn btn-ghost text-xl">NoozFeed</a>
          <ThemeControler />
        </div>
      </header>
      <AppProvider>
        <Tabs border className="pt-10">
          <Tab className="w-[50%]" active={true}>
            Your Feed
          </Tab>
          <Tab className="w-[50%]">Live Feed</Tab>
        </Tabs>
        <Feeds />
      </AppProvider>
      <Footer />
    </>
  );
}

export default App;
