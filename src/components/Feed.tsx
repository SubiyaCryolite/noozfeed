import SearchInput from "@/components/SearchInput";
import Filters from "@/components/Filters";
import { FeedType } from "@/constants";
import SearchProvider from "@/providers/SearchProvider";

interface FeedProps {
  type: FeedType;
}

export const Feed: React.FC<FeedProps> = ({ type }) => {
  return (
    <SearchProvider type={type}>
      <main id={`feed-${type}`} className="lex-1 overflow-y-auto p-5">
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
    </SearchProvider>
  );
};

export default Feed;
