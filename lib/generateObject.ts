import { RequestOptions } from "@/types/ai-types";
import { schemas } from "@/app/schemas/schemas";
import type { SchemaName, InferSchema } from "@/types/schema-types";

export const generateObject = async <T extends SchemaName>(
  schemaName: T,
  controller: AbortController,
  requestOptions: RequestOptions
): Promise<InferSchema<T>> => {
  try {
    const response = await fetch("/api/generateObject", {
      method: "POST",
      body: JSON.stringify({ ...requestOptions, schemaName }),
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    const schema = schemas[schemaName];
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new Error("Validation failed");
    }
    return result.data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to parse response from server"
    );
  }
};
