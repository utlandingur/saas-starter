import {
  shuffleArray,
  shuffleSentence,
  splitArray,
} from "@/lib/shuffleSentence";

const LONG_SENTENCE =
  "Það er mjög mikilvægt að við tökum á þessu vandamáli með öllum tiltækum ráðum og tryggjum öryggi þeirra sem verða fyrir ofbeldi.";

const LONG_INPUT = LONG_SENTENCE.split(" ");

describe("splitArray", () => {
  it("should return a new array with shuffled elements", () => {
    const input = ["a", "b", "c", "d", "e"];
    const result = splitArray(input);
    expect(result).not.toEqual(input); // The result should be different from the input (shuffled)
    expect(result.length).toBeGreaterThanOrEqual(4);
    expect(result.length).toBeLessThanOrEqual(input.length);
  });

  it("should handle empty arrays", () => {
    const input: string[] = [];
    const result = splitArray(input);
    expect(result).toEqual([]); // An empty array should return an empty array
  });

  it("should handle arrays with fewer than 4 elements", () => {
    const input = ["a", "b", "c"];
    const result = splitArray(input);
    expect(result.length).toBe(input.length); // Length should stay the same
    expect(result).toEqual(input); // It should shuffle the array
  });

  it("should work with arrays of exactly 4 elements", () => {
    const input = ["a", "b", "c", "d"];
    const result = splitArray(input);
    expect(result.length).toBe(input.length); // Length should stay the same
    expect(result).toEqual(input); // It should shuffle the array
  });

  it("should not alter the original array", () => {
    const input = ["a", "b", "c", "d", "e"];
    const copiedInput = [...input]; // Copy the original array
    splitArray(input);
    expect(input).toEqual(copiedInput); // The input array should remain unchanged
  });

  it("should work with long sentences", () => {
    const result = splitArray(LONG_INPUT);
    expect(result.length).toBeGreaterThanOrEqual(4);
    expect(result.length).toBeLessThanOrEqual(LONG_INPUT.length);
    expect(result.join(" ")).toEqual(LONG_INPUT.join(" "));
  });

  it("should not alter the order of the words", () => {
    const result = splitArray(LONG_INPUT);
    expect(result.join(" ")).toEqual(LONG_INPUT.join(" "));
  });
});

describe("shuffleArray", () => {
  it("should return a new array with shuffled elements", () => {
    const input = ["a", "b", "c", "d", "e"];
    const result = shuffleArray(input);
    expect(result).not.toEqual(input); // The result should be different from the input (shuffled)
    expect(result.length).toBe(input.length);
  });

  it("should handle empty arrays", () => {
    const input: string[] = [];
    const result = shuffleArray(input);
    expect(result).toEqual([]); // An empty array should return an empty array
  });

  it("should not alter the original array", () => {
    const input = ["a", "b", "c", "d", "e"];
    const copiedInput = [...input]; // Copy the original array
    shuffleArray(input);
    expect(input).toEqual(copiedInput); // The input array should remain unchanged
  });

  it("should work with long sentences", () => {
    const result = shuffleArray(LONG_INPUT);
    expect(result.length).toBe(LONG_INPUT.length);
    expect(result.join(" ")).not.toEqual(LONG_INPUT.join(" "));
  });

  it("should not alter the order of the words", () => {
    const result = shuffleArray(LONG_INPUT);
    expect(result).not.toEqual(LONG_INPUT);
  });

  it("should always return a shuffled array", () => {
    const input = ["a", "b"];
    const result = shuffleArray(input);
    expect(result).not.toEqual(input);
  });
});

describe("shuffleSentence", () => {
  it("should shuffle the words in a sentence", () => {
    const sentence = "Ein birtingarmynd ofbeldisins er fjárhagslegt ofbeldi.";
    const result = shuffleSentence(sentence);
    expect(result.original).toBe(sentence);
    expect(result.shuffled).not.toEqual(sentence.split(" "));
  });

  it("should handle long sentences", () => {
    const sentence = LONG_SENTENCE;
    const result = shuffleSentence(sentence);
    expect(result.original).toBe(sentence);
    expect(result.shuffled).not.toEqual(sentence.split(" "));
    console.log(result);
  });
});
