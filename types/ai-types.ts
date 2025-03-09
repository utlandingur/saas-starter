import { SchemaName } from "@/app/schemas/schema";

export type RequestOptions = {
  prompt: string;
  schema: SchemaName;
  system?: string;
  schemaName?: string;
  schemaDescription?: string;
};
