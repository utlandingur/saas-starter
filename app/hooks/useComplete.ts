"use client";

import { readStream } from "@/lib/readStream";
import { useRef, useState } from "react";

type RequestOptions = {
  /**
An optional object of headers to be passed to the API endpoint.
 */
  headers?: Record<string, string> | Headers;
  /**
An optional object to be passed to the API endpoint.
   */
  body?: object;
};

export const useComplete = (apiEndpoint?: string) => {
  const [completion, setCompletion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<undefined | Error>(undefined);
  const [input, setInput] = useState<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event?: { preventDefault?: () => void }) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }

    complete(input);
  };

  const complete = async (prompt: string, options?: RequestOptions) => {
    const endpoint = apiEndpoint ?? "/api/complete";

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ prompt, ...options?.body }),
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        setError(new Error(response.statusText));
        setIsLoading(false);
        return;
      }

      if (!response?.body) {
        console.error("Response body is not a stream.");
        return;
      }

      let result = "";

      await readStream(response.body, (chunk) => {
        result += chunk;
        setCompletion(result);
      });
      setInput("");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request was aborted");
      } else {
        console.error("Request failed", error);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const stop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return {
    completion,
    setCompletion,
    isLoading,
    error,
    input,
    setInput,
    /**
     * An input/textarea-ready onChange handler to control the value of the input
     * @example
     * ```jsx
     * <input onChange={handleInputChange} value={input} />
     * ```
     */
    handleInputChange,
    /**
     * Form submission handler to automatically reset input and append a user message
     * @example
     * ```jsx
     * <form onSubmit={handleSubmit}>
     *  <input onChange={handleInputChange} value={input} />
     * </form>
     * ```
     */
    handleSubmit,
    /**
     * Send a new prompt to the API endpoint and update the completion state.
     */
    complete,
    /**
     * Abort the current API request but keep the generated tokens.
     */
    stop,
  };
};
