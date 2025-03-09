import { Test } from "@/components/Test";

const TestComponent = () => {
  return (
    <div>
      <Test />
      {/* <Article
        article={{
          title: "Test Article",
          sections: [
            { paragraph: testParagrapgh, quizQuestions: sampleQuizQuestions },
          ],
        }}
      /> */}
    </div>
  );
};

export default TestComponent;

// // TEST DATA
// const sampleQuizQuestions: QuizQuestion[] = [
//   {
//     id: 1,
//     question: "What is the capital of France?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: 2,
//     explanation: "Paris is the capital and most populous city of France.",
//   },
//   {
//     id: 2,
//     question: "Which planet is known as the Red Planet?",
//     options: ["Earth", "Mars", "Jupiter", "Saturn"],
//     correctAnswer: 1,
//     explanation:
//       "Mars is often called the 'Red Planet' because of its reddish appearance.",
//   },
//   {
//     id: 3,
//     question: "What is the largest ocean on Earth?",
//     options: [
//       "Atlantic Ocean",
//       "Indian Ocean",
//       "Arctic Ocean",
//       "Pacific Ocean",
//     ],
//     correctAnswer: 3,
//     explanation: "The Pacific Ocean is the largest and deepest ocean on Earth.",
//   },
//   {
//     id: 4,
//     question: "Who wrote 'To Kill a Mockingbird'?",
//     options: [
//       "Harper Lee",
//       "Mark Twain",
//       "Ernest Hemingway",
//       "F. Scott Fitzgerald",
//     ],
//     correctAnswer: 0,
//     explanation:
//       "'To Kill a Mockingbird' is a novel by Harper Lee published in 1960.",
//   },
//   {
//     id: 5,
//     question: "What is the chemical symbol for water?",
//     options: ["O2", "H2O", "CO2", "NaCl"],
//     correctAnswer: 1,
//     explanation: "The chemical symbol for water is H2O.",
//   },
// ];

// const testParagrapgh: ParagraphType = {
//   content: `The Amazon rainforest is the largest tropical rainforest in the world, covering over 5.5 million square kilometers. It is home to an incredibly diverse range of species, many of which are not found anywhere else on Earth.

// The rainforest plays a crucial role in regulating the Earth's climate by absorbing carbon dioxide and releasing oxygen. However, deforestation and climate change are threatening this vital ecosystem.

// Efforts are being made to protect the Amazon, including the establishment of protected areas and sustainable development initiatives. It is essential to continue these efforts to preserve the rainforest for future generations.`,

//   translations: [
//     { originalWord: "rainforest", translation: "selva tropical" },
//     { originalWord: "diverse", translation: "diverso" },
//     { originalWord: "species", translation: "especies" },
//     { originalWord: "regulating", translation: "regulando" },
//     { originalWord: "carbon dioxide", translation: "dióxido de carbono" },
//     { originalWord: "oxygen", translation: "oxígeno" },
//     { originalWord: "deforestation", translation: "deforestación" },
//     { originalWord: "ecosystem", translation: "ecosistema" },
//     { originalWord: "sustainable", translation: "sostenible" },
//     { originalWord: "generations", translation: "generaciones" },
//   ],
// };

// const testArticle = {
//   title: "Test Article",
//   sections: [
//     {
//       paragraph: testParagrapgh,
//       quizQuestions: sampleQuizQuestions,
//     },
//   ],
// };
