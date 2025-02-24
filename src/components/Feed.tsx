import SearchInput from "@/components/SearchInput";
import Filters from "@/components/Filters";
import { FeedType } from "@/constants";
import SearchProvider from "@/providers/SearchProvider";
import Results from "./Results";

interface FeedProps {
  type: FeedType;
}

export const Feed: React.FC<FeedProps> = ({ type }) => {
  return (
    <SearchProvider type={type}>
      <main id={`feed-${type}`} className="flex-1 px-4">
        <div className="bg bg-base-300 br-4 mb-4 flex grid w-full grid-cols-1 justify-between gap-4 rounded-sm p-4 xl:grid-cols-3">
          <SearchInput />
          <Filters />
        </div>
        <Results />
      </main>
    </SearchProvider>
  );
};

export default Feed;
