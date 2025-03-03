"use server";
import { SchemaProperties } from "@/types/gemini";
import {
  GenerativeModel,
  GoogleGenerativeAI,
  type ResponseSchema,
} from "@google/generative-ai";

const createGeminiModel = async (
  responseSchema: ResponseSchema
): Promise<{
  model: GenerativeModel | undefined;
  error: string | undefined;
}> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { model: undefined, error: "No gemini API key" };

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseSchema,
        responseMimeType: "application/json",
      },
    });
    return { model, error: undefined };
  } catch (error) {
    return {
      model: undefined,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const getGeminiResponse = async (
  schema: ResponseSchema,
  content: unknown
): Promise<
  | {
      response: undefined;
      error: string | undefined;
    }
  | {
      response: SchemaProperties;
      error: undefined;
    }
> => {
  const { model, error } = await createGeminiModel(schema);
  if (!model) {
    return { response: undefined, error };
  }
  try {
    const result = await model.generateContent(JSON.stringify(content));
    const text = await result.response.text();
    return { response: JSON.parse(text) as SchemaProperties, error: undefined };
  } catch (error) {
    return {
      response: undefined,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
