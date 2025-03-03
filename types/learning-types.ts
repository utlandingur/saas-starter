export type TranslationWord = {
  originalWord: string;
  translation: string;
};

export type ArticleType = {
  title: string;
  sections: Array<{
    paragraph: ParagraphType;
    quizQuestions: MultipleChoice[];
  }>;
};

export type ParagraphType = {
  content: string;
  translations: TranslationWord[];
};

export type MultipleChoice = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};
