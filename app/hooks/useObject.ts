"use client";
import { generateObject } from "@/lib/generateObject";
import { RequestOptions } from "@/types/ai-types";
import { useRef, useState } from "react";
import { isValidSchema } from "@/app/schemas/schema";
import type { InferSchema, SchemaName } from "@/types/schema-types";

export const useObject = <T extends SchemaName>(schemaName: T) => {
  // compile time validation
  if (!isValidSchema(schemaName)) {
    throw new Error(`Invalid schema name: ${schemaName}`);
  }

  const [object, setObject] = useState<InferSchema<T> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<undefined | Error>(undefined);
  const abortControllerRef = useRef<AbortController | null>(null);

  const generate = async (requestOptions: RequestOptions) => {
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsLoading(true);
    try {
      const data = await generateObject(schemaName, controller, requestOptions);
      setObject(data);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error"));
    } finally {
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };
  return {
    object,
    isLoading,
    error,
    generate,
  };
};
