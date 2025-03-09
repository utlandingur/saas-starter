import { schemas } from "@/app/schemas/schemas";
import type { SchemaName } from "@/types/schema-types";
import { google } from "@ai-sdk/google";
import { generateObject, zodSchema } from "ai";

import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const request = await req.json();
  const schemaName = request.schemaName as SchemaName;

  const schema = schemas[schemaName];

  if (!schema) {
    return new NextResponse("Schema not found", { status: 404 });
  }

  if (!request.prompt) {
    return new NextResponse("Prompt is required", { status: 400 });
  }
  try {
    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001"),
      prompt: request.prompt,
      // @ts-ignore
      schema: zodSchema(schema),
    });
    return new NextResponse(JSON.stringify(object));
  } catch (error) {
    console.log("error generated is", error);
    return new NextResponse("Error generated", { status: 500 });
  }
}
