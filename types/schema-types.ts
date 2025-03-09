import { schemas } from "@/app/schemas/schema";
import { z } from "zod";

export type SchemaName = keyof typeof schemas;

export type Schema<T extends SchemaName> = (typeof schemas)[T];

export type InferSchema<T extends SchemaName> = z.infer<Schema<T>>;
