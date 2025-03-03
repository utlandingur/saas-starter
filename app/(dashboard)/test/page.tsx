import { MultipleChoice } from "@/components/quiz/multipleChoice/MultipleChoice";

// Sample quiz data - in a real app this would come from an API
const sampleQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the correct translation of 'Good morning' in Spanish?",
    options: ["Buenas noches", "Buenos días", "Buenas tardes", "Hola"],
    correctAnswer: 1,
    explanation:
      "Buenos días is the correct way to say Good morning in Spanish.",
  },
  {
    id: 2,
    question: "Which word is a synonym for 'happy' in English?",
    options: ["Sad", "Angry", "Joyful", "Tired"],
    correctAnswer: 2,
    explanation:
      "Joyful means feeling or expressing great pleasure and happiness.",
  },
  {
    id: 3,
    question: "What does the French phrase 'Je ne sais pas' mean?",
    options: ["I am well", "I don't know", "I like it", "I am hungry"],
    correctAnswer: 1,
    explanation: "Je ne sais pas translates to 'I don't know' in English.",
  },
];

const TestComponent = () => {
  return (
    <div>
      <MultipleChoice questions={sampleQuizQuestions} />
    </div>
  );
};

export default TestComponent;
