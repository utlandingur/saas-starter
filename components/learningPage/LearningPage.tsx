"use client";
import { Button } from "ui/button";
import { Label } from "ui/label";
import { useObject } from "hooks/useObject";
import { useMemo } from "react";
import { Textarea } from "ui/textarea";
import { MAX_ARTICLE_INPUT_LENGTH } from "@/contants";
import { LearningMaterial } from "components/learningMaterial/LearningMaterial";

type Props = {
  lang: string;
};

export const LearningPage = ({ lang }: Props) => {
  const {
    prompt,
    setPrompt,
    object: learningMaterial,
    isLoading,
    error,
    generate,
  } = useObject("article");

  const prompts = useMemo(
    () => [
      "Split the text into very short paragraphs.",
      "For each paragraph show the text in original language, provide translations for difficult words and create a multiple choice quiz for it with multiple questions.",
      `The person taking the test is ${lang} and not good at the language.`,
      `The article content is: + ${prompt}`,
    ],
    [prompt, lang]
  );

  const handleOnClick = async () =>
    await generate({ prompt: prompts.join("\n") });

  return (
    <>
      <div className="flex gap-2 flex-col max-w-3xl mx-auto p-4">
        <Label htmlFor="article">Copy and paste text here.</Label>
        <Textarea
          placeholder="Text goes here"
          name="article"
          id="article"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          maxLength={MAX_ARTICLE_INPUT_LENGTH}
          className="h-40"
        />
        <Button
          onClick={handleOnClick}
          disabled={!!learningMaterial || isLoading || !prompt}
        >
          Create learning material
        </Button>
      </div>
      <LearningMaterial learningMaterial={learningMaterial} />
    </>
  );
};
