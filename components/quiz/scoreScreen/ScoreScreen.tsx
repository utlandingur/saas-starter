import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = {
  qCorrect: number;
  qTotal: number;
  handleRestart: () => void;
  next?: {
    handleNext:() => void;
    buttonText?: string;
  }
};

export const ScoreScreen = ({ qCorrect, qTotal, handleRestart, next }:Props) => (
  <Card className="w-full max-w-md mx-auto">
  <CardHeader>
    <CardTitle className="text-center">Quiz Completed!</CardTitle>
  </CardHeader>
  <CardContent className="text-center">
    <p className="text-2xl font-bold mb-4">
      Your Score: {qCorrect}/{qTotal}
    </p>
    <p className="mb-6">
      {qCorrect === qTotal
        ? "Perfect! You've mastered this content."
        : "Keep practicing to improve your language skills!"}
    </p>
    <Button onClick={handleRestart} className="w-full">
      Restart Quiz
    </Button>
    {next && (<Button onClick={next.handleNext} className="w-full">
      {next.buttonText ?? "Next"}
    </Button>)}
  </CardContent>
</Card>)