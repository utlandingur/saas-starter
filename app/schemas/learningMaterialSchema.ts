import { z } from "zod";

export const quizSchema = z.array(
  z.object({
    question: z.string().describe("Question to test comprehension"),
    options: z
      .array(z.string())
      // .length(4)
      .describe("Multiple choice options to question"),
    correctAnswer: z.number().describe("Index of the correct answer"),
    explanation: z
      .string()
      .describe("Translated explanation or context for the correct answer"),
  })
);

export const translationSchema = z.object({
  originalWord: z.string().describe("Original word"),
  translation: z.string().describe("Translation of the word"),
});

export const paragraphSchema = z.object({
  content: z.string().describe("Original text"),
  translations: z
    .array(translationSchema)
    // .min(3)
    // .max(5)
    .describe(
      "Translations of a small number of words in the text to help the learner understand the text"
    ),
});

export const learningMaterialSchema = z
  .object({
    title: z.string().describe("Translated title describing the text"),

    sections: z
      .array(
        z.object({
          paragraph: paragraphSchema.describe(
            "A paragraph with content and translations"
          ),

          quizQuestions: quizSchema // .min(2)
            // .max(4)
            .describe(
              "Multiple choice questions to test comprehension at beginner level"
            ),
        })
      )
      .describe("Sections containing paragraphs and quiz questions"),
  })
  .describe("Article schema with combined sections and quizzes");

export const sentenceOrderingSchema = z
  .object({
    original: z.string().describe("Original sentence"),
    shuffled: z.array(z.string()).describe("Shuffled words").max(4),
  })
  .describe(
    "Sentence ordering schema for a sentence to be ordered by the learner"
  );
