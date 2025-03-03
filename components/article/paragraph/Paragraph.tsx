import { Card, CardContent } from "@/components/ui/card";
import { highlightTranslations } from "@/lib/highlightTranslations";
import type { ParagraphType } from "@/types/learning-types";

type Props = {
  paragraph: ParagraphType;
  index: number;
  total: number;
  className?: string;
};
export const Paragraph = ({ paragraph, className, index, total }: Props) => {
  const { content, translationWords } = paragraph;
  return (
    <Card className={className}>
      <CardContent className="p-6 flex flex-col">
        <div className="text-muted-foreground text-sm mb-2 self-end">
          {index}/{total}
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <div className="mb-4 leading-7 text-muted-foreground">
            <div
              dangerouslySetInnerHTML={{
                __html: highlightTranslations(content, translationWords),
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
