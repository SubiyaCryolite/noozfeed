import "./App.css";

import { ToastContainer } from "react-toastify";

import AppProvider from "@/providers/AppProvider";
import Feed from "@/components/Feed";
import { FeedType } from "./constants";

function App() {
  return (
    <>
      <header className="navbar min-h-10 p-4">
        <div className="bg flex w-full justify-between">
          <a className="btn btn-ghost text-xl">NoozFeed</a>
          {/* <ThemeControler /> */}
        </div>
      </header>
      <AppProvider>
        <Feed type={FeedType.You} />
      </AppProvider>
      <ToastContainer />
    </>
  );
}

export default App;
