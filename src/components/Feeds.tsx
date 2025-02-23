import { FeedType } from "@/constants";
import Feed from "./Feed";

interface FeedsProps {
  active: FeedType;
}

export const Feeds: React.FC<FeedsProps> = ({ active }) => {
  return (
    <>
      {/**
       * This is where conditional rendering and unmounting will occur
       * Necessary to not be executing network calls at once?
       * Though with proper context setup this wont be necessary
       * TODO look here
       */}
      {active == FeedType.You && <Feed type={active} />}
      {active == FeedType.Live && <Feed type={active} />}
    </>
  );
};

export default Feeds;
