import { getSchema, SchemaName } from "@/app/schemas/schema";
import { RequestOptions } from "@/types/ai-types";
import { ZodSchema } from "zod";

export const generateObject = async <T extends ZodSchema>(
  schemaName: SchemaName,
  controller: AbortController,
  requestOptions: RequestOptions
): Promise<T> => {
  const schema = getSchema(schemaName);

  try {
    const response = await fetch("/api/generateObject", {
      method: "POST",
      body: JSON.stringify(requestOptions),
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    const result = schema.safeParse(data);
    return result.data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to parse response from server"
    );
  }
};
