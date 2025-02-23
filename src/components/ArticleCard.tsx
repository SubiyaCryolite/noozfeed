import { Article } from "@/interfaces";
import { cn } from "@/utils";

interface ArticleCardProps extends React.HTMLProps<HTMLDivElement> {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  ref,
  className,
  article,
  ...props
}) => {
  return (
    <div
      ref={ref}
      className={cn("card bg-base-100 w-96 shadow-sm", className)}
      {...props}
    >
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {article.title}
          <div className="badge badge-secondary">{article.source.name}</div>
        </h2>
        <p>{article.description}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
