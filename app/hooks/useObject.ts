"use client";
import { generateObject } from "@/lib/generateObject";
import type { RequestOptions } from "@/types/ai-types";
import { useRef, useState } from "react";
import { isValidSchema } from "@/app/schemas/schemas";
import type { InferSchema, SchemaName } from "@/types/schema-types";

export const useObject = <T extends SchemaName>(schemaName: T) => {
  // compile time validation
  if (!isValidSchema(schemaName)) {
    throw new Error(`Invalid schema name: ${schemaName}`);
  }

  const [prompt, setPrompt] = useState<string>("");
  const [object, setObject] = useState<InferSchema<T> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<undefined | Error>(undefined);
  const abortControllerRef = useRef<AbortController | null>(null);

  const generate = async (requestOptions?: RequestOptions) => {
    if (!prompt && !requestOptions?.prompt) return;

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsLoading(true);
    const options = { prompt, ...requestOptions };

    try {
      const data = await generateObject(schemaName, controller, options);
      setObject(data);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error"));
    } finally {
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };
  return {
    prompt,
    /**
     * Sets the prompt state to be used in the generate function.
     * @param {string} newPrompt - The new prompt to set.
     */
    setPrompt,
    object,
    isLoading,
    error,
    /**
     * Generates a new response object based on provided prompt.
     * Uses the prompt state by default, but can be overridden by passing a prompt in the options.
     * @param {RequestOptions} requestOptions - Additional options for the request.
     * @returns {Promise<void>} Resolves when the object is generated and stored in state.
     *
     * @throws {Error} If an error occurs during the object generation process.
     */
    generate,
  };
};
