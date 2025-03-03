"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { createLearning } from "@/lib/createLearning";
import { SchemaProperties } from "@/types/gemini";
import { Article } from "./article/Article";
import { ArticleType } from "@/types/learning-types";

const text = `Um er að ræða 170 milljónir króna í tilfelli Sjálfstæðisflokksins en 240 milljónir í tilfelli Flokks fólksins.

„Mér finnst líka ábyrgð fjármálaráðuneytisins vera einhver. Að vera að greiða pening inn á reikninga ef fullnægjandi gögn liggja ekki fyrir. Það er enginn að fara að greiða mér öryrkjabætur ef ég hef ekki lagt fram örorkumat,“ sagði Guðrún Hafsteinsdóttir.

Sigurður Ingi Jóhannsson, formaður Framsóknarflokksins, var fjármálaráðherra á þeim tíma sem styrkir voru greiddir út án þess að flokkarnir uppfylltu skilyrðin.`;

export const Test = () => {
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

  return !state ? (
    <Button onClick={handleOnClick} />
  ) : (
    <Article article={state} />
  );
};
