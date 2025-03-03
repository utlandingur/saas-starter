export type TranslationWord = {
  word: string;
  translation: string;
};

export type ArticleType = {
  title: string;
  sections: Array<{
    paragraph: ParagraphType;
    quizQuestions: QuizQuestion[];
  }>;
};

export type ParagraphType = {
  content: string;
  translationWords: TranslationWord[];
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};
