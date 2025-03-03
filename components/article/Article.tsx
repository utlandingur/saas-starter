import { cn } from "@/lib/utils";
import type { ArticleType } from "@/types/learning-types";
import { Paragraph } from "./paragraph/Paragraph";
import { MultipleChoice } from "./quiz/multipleChoice/MultipleChoice";

type Props = {
  article: ArticleType;
  className?: string;
};

export const Article = ({ article, className }: Props) => {
  console.log("article is ", article);
  return (
    <div
      className={cn(
        "w-full max-w-3xl mx-auto px-2 overflow-hidden py-4",
        className
      )}
    >
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="space-y-4">
        {article.sections.map(({ paragraph, quizQuestions }, index) => (
          <div key={index} className="space-y-6">
            <Paragraph
              paragraph={paragraph}
              index={index + 1}
              total={article.sections.length}
            />
            <MultipleChoice questions={quizQuestions} />
          </div>
        ))}
      </div>
    </div>
  );
};
