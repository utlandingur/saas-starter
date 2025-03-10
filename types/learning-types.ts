import {
  quizSchema,
  learningMaterialSchema,
  paragraphSchema,
  translationSchema,
} from "@/app/schemas/learningMaterialSchema";
import { z } from "zod";

export type ParagraphType = z.infer<typeof paragraphSchema>;

export type TranslationWord = z.infer<typeof translationSchema>;

export type QuizQuestions = z.infer<typeof quizSchema>;

export type LearningMaterialType = z.infer<typeof learningMaterialSchema>;
