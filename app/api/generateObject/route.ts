import { getSchema } from "@/app/schemas/schema";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const request = await req.json();
  const schema = getSchema(request.schema);
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
