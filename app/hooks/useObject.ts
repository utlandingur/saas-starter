"use client";
import { generateObject } from "@/lib/generateObject";
import { RequestOptions } from "@/types/ai-types";
import { useRef, useState } from "react";
import { z, ZodSchema } from "zod";
import { SchemaName } from "@/app/schemas/schema";

export const useObject = <T extends ZodSchema>(schemaName: SchemaName) => {
  const [object, setObject] = useState<z.infer<T> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<undefined | Error>(undefined);
  const abortControllerRef = useRef<AbortController | null>(null);

  const generate = async (requestOptions: RequestOptions) => {
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsLoading(true);
    try {
      const data = await generateObject<T>(
        schemaName,
        controller,
        requestOptions
      );
      setObject(data);
      setIsLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error"));
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
