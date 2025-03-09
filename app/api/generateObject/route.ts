import { schemas } from "@/app/schemas/schema";
import type { SchemaName } from "@/types/schema-types";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

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

  const { object } = await generateObject({
    model: google("gemini-2.0-flash-001"),
    schema,
    prompt: request.prompt,
  });
  return new NextResponse(JSON.stringify(object));
}
