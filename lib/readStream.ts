/**
 * Takes a ReadableStream and reads it to completion, calling the onChunk callback for each chunk.
 * @example
 * ```ts
 * const response = await fetch("/api/chat");
 * await readStream(response.body, (chunk) => {
 *   console.log(chunk);
 * });
 * ```
 * @param stream - The ReadableStream to read
 * @param onChunk - The callback to call for each chunk
 */

export const readStream = async (
  stream: ReadableStream<Uint8Array<ArrayBufferLike>> | null,
  onChunk: (chunk: string) => void
): Promise<void> => {
  const reader = stream?.getReader();
  if (!reader) {
    console.error("Stream reader not initialized.");
    return;
  }

  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: readerDone } = (await reader?.read()) ?? {};
    done = readerDone ?? true;

    if (value) {
      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }
  }
};
