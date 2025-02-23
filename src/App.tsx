import "./App.css";
import { useState } from "react";

import ThemeControler from "@/components/ThemeController";
import Footer from "@/components/Footer";
import AppProvider from "@/providers/AppProvider";
import Feeds from "@/components/Feeds";
import Tab from "./components/Tab";
import Tabs from "./components/Tabs";
import { FeedType } from "./constants";

function App() {
  const [feed, setFeed] = useState<FeedType>(FeedType.You);

  const handleFeed = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void => {
    setFeed(event.currentTarget.dataset["value"] as FeedType);
  };

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
          <Tab
            className="w-[50%]"
            data-value={FeedType.You}
            active={feed == FeedType.You}
            onClick={handleFeed}
          >
            Your Feed
          </Tab>
          <Tab
            className="w-[50%]"
            data-value={FeedType.Live}
            active={feed == FeedType.Live}
            onClick={handleFeed}
          >
            Live Feed
          </Tab>
        </Tabs>
        <Feeds active={feed} />
      </AppProvider>
      <Footer />
    </>
  );
}

export default App;
