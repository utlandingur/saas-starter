import type { SchemaName } from "@/types/schema-types";
import { recipeSchema } from "./recipeSchema";

export const schemas = {
  recipe: recipeSchema,
  recipe2: recipeSchema,
} as const;

export function isValidSchema(key: string): key is SchemaName {
  return key in schemas;
}
