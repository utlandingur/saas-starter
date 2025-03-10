import type { SchemaName } from "@/types/schema-types";
import { recipeSchema } from "./recipeSchema";
import { learningMaterialSchema } from "./learningMaterialSchema";

export const schemas = {
  recipe: recipeSchema,
  article: learningMaterialSchema,
} as const;

export function isValidSchema(key: string): key is SchemaName {
  return key in schemas;
}
