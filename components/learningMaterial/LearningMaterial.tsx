import { cn } from "@/lib/utils";
import { Paragraph } from "./paragraph/Paragraph";
import { MultipleChoice } from "./quiz/multipleChoice/MultipleChoice";
import { LearningMaterialType } from "@/app/schemas/learningMaterialSchema";

type Props = {
  learningMaterial?: LearningMaterialType;
  className?: string;
};

export const LearningMaterial = ({ learningMaterial, className }: Props) => {
  if (!learningMaterial) {
    return null;
  }
  return (
    <div
      className={cn(
        "w-full max-w-3xl mx-auto px-2 overflow-hidden py-4",
        className
      )}
    >
      <h1 className="text-3xl font-bold mb-4">{learningMaterial.title}</h1>
      <div className="space-y-4">
        {learningMaterial.sections.map(
          ({ paragraph, quizQuestions }, index) => (
            <div key={index} className="space-y-6">
              <Paragraph
                paragraph={paragraph}
                index={index + 1}
                total={learningMaterial.sections.length}
              />
              <MultipleChoice questions={quizQuestions} />
            </div>
          )
        )}
      </div>
    </div>
  );
};
