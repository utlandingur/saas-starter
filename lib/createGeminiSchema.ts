import type { SchemaProperties } from "@/types/gemini";
import { type ResponseSchema, SchemaType } from "@google/generative-ai";

export const createGeminiSchema = (
  description: string,
  properties: SchemaProperties
): ResponseSchema => {
  return {
    description,
    type: SchemaType.OBJECT,
    properties,
    required: Object.keys(properties),
  };
};
