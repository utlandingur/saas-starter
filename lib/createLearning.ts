import { getGeminiResponse } from "@/serverActions/getGeminiResponse";
import { ArticleType } from "@/types/learning-types";
import {
  ArraySchema,
  NumberSchema,
  ObjectSchema,
  SchemaType,
  StringSchema,
} from "@google/generative-ai";

const originalWord: StringSchema = {
  type: SchemaType.STRING,
  description: "Original word",
};

const translation: StringSchema = {
  type: SchemaType.STRING,
  description: "Translation of the word",
};

const translations: ArraySchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      originalWord,
      translation,
    },
    required: ["originalWord", "translation"],
  },
  description:
    "Translations of a small number of words in the text to help the learner understand the text",
  maxItems: 5,
  minItems: 3,
};

const content: StringSchema = {
  type: SchemaType.STRING,
  description: "Original text",
};

const paragraph: ObjectSchema = {
  type: SchemaType.OBJECT,
  properties: {
    content,
    translations,
  },
  required: ["content", "translations"],
};

const question: StringSchema = {
  type: SchemaType.STRING,
  description: "Question to test comprehension",
};

const options: ArraySchema = {
  type: SchemaType.ARRAY,
  description: "Multiple choice options to question",
  items: {
    type: SchemaType.STRING,
  },
  minItems: 4,
  maxItems: 4,
};

const correctAnswer: NumberSchema = {
  type: SchemaType.NUMBER,
  description: "Index of the correct answer",
};

const explanation: StringSchema = {
  type: SchemaType.STRING,
  description: "Translated explanation or context for the correct answer",
};

const multipleChoice: ObjectSchema = {
  type: SchemaType.OBJECT,
  properties: {
    question,
    options,
    correctAnswer,
    explanation,
  },
  description:
    "Multiple choice question to test comprehension in provided native language",
  required: ["question", "options", "correctAnswer", "explanation"],
};

const quizQuestions: ArraySchema = {
  type: SchemaType.ARRAY,
  items: multipleChoice,
  minItems: 2,
  maxItems: 4,
  description:
    "Multiple choice questions to test comprehension at beginner level",
};

const sections: ArraySchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      paragraph,
      quizQuestions,
    },
    required: ["paragraph", "quizQuestions"],
  },
};

const title: StringSchema = {
  type: SchemaType.STRING,
  description: "Translated title describing the text",
};

const lang = (nativeLang: string): StringSchema => {
  return {
    type: SchemaType.STRING,
    description: `The language to be used for translations and quiz questions`,
    enum: [nativeLang],
  };
};

const article = (nativeLang: string): ObjectSchema => {
  return {
    type: SchemaType.OBJECT,
    properties: {
      title,
      sections,
      nativeLanguage: lang(nativeLang),
    },
    required: ["title", "sections"],
  } as const;
};

/**
 * Generates a summary and specific keywords for a podcast.
 *
 * @param {string} summary - A summary of the podcast.
 * @param {string} description - The description of the podcast.
 * @param {string[]} keywords - Keywords for the podcast.
 * @returns {Recommendation} - A recommendation of what should be talked about next
 */
export const createLearning = async (originalText: string, ability: string) => {
  const data = await getGeminiResponse(article("english"), {
    originalText,
    ability,
  });
  if (!data.response) return data;
  const response = data.response as unknown as ArticleType;
  return { error: data.error, response };
};
