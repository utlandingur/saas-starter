"use client";
import { Button } from "./ui/button";
import { Article } from "./article/Article";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useObject } from "@/app/hooks/useObject";

export const Test = () => {
  const { prompt, setPrompt, object, isLoading, error, generate } =
    useObject("article");
  const languagePrompt = "Provide this test for a native English speaker.";
  const prompts = [
    "Split the text into very short paragraphs.",
    "For each paragraph show the text in original language, provide translations for difficult words and create a multiple choice quiz for it with multiple questions.",
    "The person taking the test is English and not good at the language.",
    `The article content is: + ${prompt}`,
  ];

  const handleOnClick = async () =>
    await generate({ prompt: prompts.join("\n") });

  return (
    <>
      <div className="flex gap-2 flex-col max-w-3xl mx-auto p-4">
        <Label htmlFor="article">Copy and paste text here.</Label>
        <Input
          type="textarea"
          placeholder="Text goes here"
          name="article"
          id="article"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          onClick={handleOnClick}
          disabled={!!object || isLoading || !prompt}
        >
          Create learning material
        </Button>
      </div>
      {object && <Article article={object} />}
    </>
  );
};
