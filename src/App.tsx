import "./App.css";
import { useState } from "react";

import ThemeControler from "@/components/ThemeController";
import AppProvider from "@/providers/AppProvider";
import Feed from "@/components/Feed";
import Tab from "./components/Tab";
import Tabs from "./components/Tabs";
import { FeedType } from "./constants";

const FeedTabsName = "feed.tabs";

function App() {
  const [feed, setFeed] = useState<FeedType>(FeedType.You);

  const handleFeed = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFeed(event.target.value as FeedType);
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
            name={FeedTabsName}
            className="w-[50%]"
            value={FeedType.You}
            checked={feed == FeedType.You}
            onChange={handleFeed}
            label="Your Feed"
          >
            <Feed type={FeedType.You} />
          </Tab>
          <Tab
            name={FeedTabsName}
            className="w-[50%]"
            value={FeedType.Live}
            checked={feed == FeedType.Live}
            onChange={handleFeed}
            label="Live Feed"
          >
            <Feed type={FeedType.Live} />
          </Tab>
        </Tabs>
      </AppProvider>
      {/* <Footer /> */}
    </>
  );
}

export default App;
