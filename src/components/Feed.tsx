import SearchInput from "@/components/SearchInput";
import Filters from "@/components/Filters";

export const Feed: React.FC = () => {
  return (
    <main className="h-[calc(100vh-11.25em)] flex-1 overflow-y-auto p-5">
      <div className="bg bg-base-300 flex w-full justify-between">
        <SearchInput />
        <Filters />
      </div>
    </main>
  );
};

export default Feed;
