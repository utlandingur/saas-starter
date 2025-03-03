import { QuizQuestion } from "@/types/learning-types";
import { useState } from "react";

export const useMultipleChoice = (
  questions: QuizQuestion[],
  next?: () => void
) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion?.correctAnswer;

  const handleOptionSelect = (index: number) => {
    if (!isAnswered) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    setIsAnswered(true);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return {
    currentQuestion,
    currentQuestionIndex,
    selectedOption,
    isAnswered,
    score,
    quizCompleted,
    isCorrect,
    handleOptionSelect,
    handleSubmit,
    handleNext,
    handleRestart,
  };
};
