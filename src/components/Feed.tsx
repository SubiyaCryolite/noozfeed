import SearchInput from "@/components/SearchInput";
import Filters from "@/components/Filters";
import { FeedType } from "@/constants";

interface FeedProps {
  type: FeedType;
}

export const Feed: React.FC<FeedProps> = ({
  /**
   * This controls behaviour of some elements
   * Specifically the args passed to SearchProvider which determines if certain preferences are persisted or loaded on startup
   */
  type,
}) => {
  return (
    <main className="h-[calc(100vh-11.25em)] flex-1 overflow-y-auto p-5">
      <div className="bg bg-base-300 flex w-full justify-between">
        <SearchInput />
        <Filters />
      </div>
      <div className="bg bg-base-400 flex w-full justify-between">
        Table controls here
      </div>
      <div className="bg bg-base-400 flex w-full justify-between">
        Table content here
      </div>
      <div className="bg bg-base-400 flex w-full justify-between">
        Table pagination here
      </div>
    </main>
  );
};

export default Feed;
