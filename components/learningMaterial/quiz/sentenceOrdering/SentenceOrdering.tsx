import { sentenceOrderingSchema } from "@/app/schemas/learningMaterialSchema";
import { z } from "zod";

// Function to shuffle words
const shuffleArray = (array: string[]) => {
  const shuffledArray: string[] = [];
  for (let i = Math.min(4, array.length); i > 1; i--) {
    const stringsToPush = array.splice(Math.floor(array.length / i));
    shuffledArray.push(...stringsToPush);
  }
};

// Example Usage
const createSentenceReorderingQuiz = (text: string) => {
  const words = text.split(" ");
  const shuffledWords = shuffleArray([...words]);

  return sentenceOrderingSchema.parse({
    type: "sentence-reordering",
    original: text,
    shuffled: shuffledWords,
  });
};

// Example
const quiz = createSentenceReorderingQuiz(
  "Ein birtingarmynd ofbeldisins er fjárhagslegt ofbeldi."
);
console.log(quiz);
