"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { createLearning } from "@/lib/createLearning";
import { Article } from "./article/Article";
import { ArticleType } from "@/types/learning-types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const Test = () => {
  const [text, setText] = useState("");
  const [state, setState] = useState<ArticleType | undefined>(undefined);

  const handleOnClick = async () => {
    const data = await createLearning(text, "beginner");
    if (data.error) {
      console.log(data.error);
    }
    if (data.response) {
      console.log(data.response);
      setState(data.response);
    }
  };

  return (
    <>
      <div className="flex gap-2 flex-col max-w-3xl mx-auto p-4">
        <Label htmlFor="article">Copy and paste text here.</Label>
        <Input
          type="textarea"
          placeholder="Text goes here"
          name="article"
          id="article"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          onClick={!state ? handleOnClick : undefined}
          disabled={!!state || !text}
        >
          Create learning material
        </Button>
      </div>
      {state && <Article article={state} />}
    </>
  );
};
