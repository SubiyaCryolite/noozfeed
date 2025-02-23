import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";

export const Filters: React.FC = () => {
  return (
    <div>
      <div className="join join-vertical sm:join-horizontal">
        <FunnelIcon
          className="join-item h-[1em] opacity-50"
          aria-label="Filters"
        />
        <button className="btn btn-outline join-item">Author</button>
        <button className="btn btn-outline join-item">Date</button>
        <button className="btn btn-outline join-item">Category</button>
        <button className="btn join-item btn-secondary">Clear</button>
        <button className="btn join-item btn-primary">Apply</button>
      </div>
    </div>
  );
};

export default Filters;
