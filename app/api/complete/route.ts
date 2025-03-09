import { streamText } from "ai";
import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    prompt,
    system,
    model = google("models/gemini-2.0-flash-exp"),
  } = await req.json();

  const result = streamText({
    model,
    messages,
    system,
    prompt,
  });
  const readableStream = new ReadableStream({
    start(controller) {
      (async () => {
        for await (const chunk of result.textStream) {
          if (chunk) {
            controller.enqueue(chunk);
          } else {
            console.warn("Received undefined chunk");
          }
        }
        controller.close();
      })();
    },
  });

  return new NextResponse(readableStream);
}
