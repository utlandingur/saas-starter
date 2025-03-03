import { TranslationWord } from "@/types/learning-types";

const StyledTranslation = ({ word, translation }: TranslationWord) =>
  `<span class="relative">
    <span tabindex="0" class="peer cursor-pointer font-semibold text-primary underline underline-offset-4 focus:outline-none">
      ${word}
    </span>
    <span class="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden peer-hover:block peer-focus:block bg-primary text-primary-foreground text-xs py-1 px-2 rounded z-50">
      ${translation}
    </span>
  </span>`;

/**
 * Highlights the specified words in the content and displays their translations when hovered over.
 *
 * @param {string} content - The content in which to highlight words.
 * @param {TranslationWord[]} words - An array of objects containing words and their translations.
 * @returns {string} A HTML string with the highlighted content.
 */
export const highlightTranslations = (
  content: string,
  words: TranslationWord[]
): string => {
  let highlightedContent = content;

  words.forEach(({ word, translation }) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    highlightedContent = highlightedContent.replace(regex, (match) => {
      return StyledTranslation({ word: match, translation });
    });
  });
  return highlightedContent;
};
