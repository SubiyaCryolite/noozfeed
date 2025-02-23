import { Article } from "@/interfaces";
import { cn, parseISODate, printLocalDate } from "@/utils";

interface ArticleCardProps extends React.HTMLProps<HTMLDivElement> {
  skeleton: boolean;
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  ref,
  className,
  article,
  skeleton,
  ...props
}) => {
  return (
    <div
      ref={ref}
      className={cn(
        "card w-96 bg-gray-100 shadow-sm", //TODO control width here
        { skeleton },
        className,
      )}
      {...props}
    >
      <>
        <figure className={cn({ invisible: skeleton })}>
          <img
            src={
              article.urlToImage ??
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt="Shoes"
          />
        </figure>
        <div className={cn("card-body", { invisible: skeleton })}>
          <h2
            className={cn("card-title", {
              invisible: skeleton,
            })}
          >
            <span className="truncate">{article.title}</span>
            <span className="badge badge-secondary badge-sm ml-auto">
              {article.source.name}
            </span>
          </h2>
          <div className="text-color-base-200 w-full items-baseline">
            <span>{printLocalDate(parseISODate(article.publishedAt!))}</span>
          </div>
          <div className="max-h-20 overflow-clip">{article.description}</div>
          <div className={cn("card-actions justify-end")}>
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ArticleCard;
