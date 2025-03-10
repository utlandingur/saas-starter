import { ShuffledSentence } from "@/types/learning-types";

const splitArray = (array: string[]) => {
  const mutatingArray = [...array];
  const shuffledArray: string[] = [];
  for (let i = Math.min(4, mutatingArray.length); i > 0; i--) {
    const stringsToPush = mutatingArray.splice(
      0,
      Math.floor(mutatingArray.length / i)
    );
    shuffledArray.push(stringsToPush.join(" "));
  }

  return shuffledArray;
};

const arraysAreEqual = (array1: any[], array2: any[]): boolean => {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every((value, index) => value === array2[index]);
};

const shuffleArray = (array: any[]) => {
  if (array.length < 2) {
    return array;
  }
  const mutatingArray = [...array];
  const shuffledArray = [];
  while (mutatingArray.length > 0) {
    const randomIndex = Math.floor(Math.random() * mutatingArray.length);
    const randomElement = mutatingArray.splice(randomIndex, 1)[0];
    shuffledArray.push(randomElement);
  }

  // lazy fix for edge case where the array is shuffled back to its original order
  if (arraysAreEqual(shuffledArray, array)) {
    const temp = [...array];
    shuffledArray[0] = temp[temp.length - 1];
    shuffledArray[shuffledArray.length - 1] = temp[0];
  }
  return shuffledArray;
};

/**
 * Shuffles the words in a sentence and returns the original and shuffled sentence.
 * @param sentence
 * @returns
 */
/**
 * Shuffles the words in a sentence and returns the original and shuffled sentence.
 * @param {string} sentence - The sentence to shuffle.
 * @returns {{ original: string, shuffled: string[] }} An object containing the original sentence and the shuffled sentence as an array of strings.
 */
export const shuffleSentence = (sentence: string): ShuffledSentence => {
  const words = sentence.split(" ");
  const splitWords = splitArray(words);
  const shuffledSentence = shuffleArray(splitWords);

  return {
    original: sentence,
    shuffled: shuffledSentence,
  };
};

// for testing purposes
export { splitArray, shuffleArray };
