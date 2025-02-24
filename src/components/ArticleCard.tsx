import { use } from "react";

import SearchContext from "@/contexts/SearchContext";
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
  const { filters } = use(SearchContext)!;

  return (
    <div
      ref={ref}
      className={cn(
        "card w-full bg-gray-100 shadow-sm md:w-90 lg:w-96",
        { skeleton },
        className,
      )}
      {...props}
    >
      <>
        <figure className={cn({ invisible: skeleton })}>
          <img src={article.urlToImage} />
        </figure>
        <div className={cn("card-body", { invisible: skeleton })}>
          <h2
            className={cn("card-title", {
              invisible: skeleton,
            })}
          >
            <span className="truncate">{article.title}</span>
          </h2>
          <div className="text-color-base-200 w-full items-baseline">
            <span>{printLocalDate(parseISODate(article.publishedAt!))}</span>
          </div>
          <div className="max-h-20 overflow-clip">{article.description}</div>
          <div className={cn("card-actions mt-4 justify-end")}>
            <span
              className={cn("badge badge-primary mr-auto", {
                "badge-outline":
                  !filters.publications[article.publication.value],
              })}
            >
              {article.publication.label}
            </span>
            <span
              className={cn("badge badge-primary", {
                "badge-outline": !filters.categories[article.category.value],
              })}
            >
              {article.category.label}
            </span>
          </div>
        </div>
      </>
    </div>
  );
};

export default ArticleCard;
