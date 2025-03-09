import { recipeSchema } from "./recipeSchema";
import { ZodSchema } from "zod";

type SchemaShape = {
  description: string;
  schema: ZodSchema;
};

export const schemas: Record<string, SchemaShape> = {
  recipe: {
    description: "To create a recipe",
    schema: recipeSchema,
  },
};

export const getSchema = (schemaName: SchemaName) => schemas[schemaName].schema;

export type SchemaName = keyof typeof schemas;
export type SchemaProperties = typeof schemas;
export type Schema<T extends SchemaName> =
  (typeof schemas)[T]["schema"]["_output"];
