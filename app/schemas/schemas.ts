import type { SchemaName } from "@/types/schema-types";
import { recipeSchema } from "./recipeSchema";
import { articleSchema } from "./quizSchema";

export const schemas = {
  recipe: recipeSchema,
  article: articleSchema,
} as const;

export function isValidSchema(key: string): key is SchemaName {
  return key in schemas;
}
