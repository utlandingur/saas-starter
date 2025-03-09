import { z } from "zod";

export const articleSchema = z
  .object({
    title: z.string().describe("Translated title describing the text"),

    sections: z
      .array(
        z.object({
          paragraph: z
            .object({
              content: z.string().describe("Original text"),
              translations: z
                .array(
                  z.object({
                    originalWord: z.string().describe("Original word"),
                    translation: z.string().describe("Translation of the word"),
                  })
                )
                // .min(3)
                // .max(5)
                .describe(
                  "Translations of a small number of words in the text to help the learner understand the text"
                ),
            })
            .describe("A paragraph with content and translations"),

          quizQuestions: z
            .array(
              z.object({
                question: z.string().describe("Question to test comprehension"),
                options: z
                  .array(z.string())
                  // .length(4)
                  .describe("Multiple choice options to question"),
                correctAnswer: z
                  .number()
                  .describe("Index of the correct answer"),
                explanation: z
                  .string()
                  .describe(
                    "Translated explanation or context for the correct answer"
                  ),
              })
            )
            // .min(2)
            // .max(4)
            .describe(
              "Multiple choice questions to test comprehension at beginner level"
            ),
        })
      )
      .describe("Sections containing paragraphs and quiz questions"),
  })
  .describe("Article schema with combined sections and quizzes");

export type ArticleType = z.infer<typeof articleSchema>;
