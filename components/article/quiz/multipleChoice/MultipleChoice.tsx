"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { QuizQuestion } from "@/types/learning-types";
import { ScoreScreen } from "@/components/article/quiz/scoreScreen/ScoreScreen";
import { useMultipleChoice } from "./useMultipleChoice";
import { MultipleChoiceType } from "@/app/schemas/quizSchema";

type Props = {
  questions: MultipleChoiceType[];
  next?: () => void;
  className?: string;
};

export function MultipleChoice({ questions, next, className }: Props) {
  const {
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
  } = useMultipleChoice(questions, next);

  if (quizCompleted) {
    return (
      <ScoreScreen
        qCorrect={score}
        qTotal={questions.length}
        handleRestart={handleRestart}
      />
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1}/{questions.length}
          </span>
          <span className="text-sm font-medium">Score: {score}</span>
        </div>
        <CardTitle>{currentQuestion.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedOption === index
                  ? isAnswered
                    ? isCorrect
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isAnswered &&
                  selectedOption === index &&
                  (isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ))}
                {isAnswered &&
                  index === currentQuestion.correctAnswer &&
                  selectedOption !== index && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
              </div>
            </div>
          ))}
        </div>

        {isAnswered && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm">{currentQuestion.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isAnswered ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="w-full"
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="w-full">
            {currentQuestionIndex < questions.length - 1
              ? "Next Question"
              : "See Results"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
