import {
  FC,
  PropsWithChildren,
  createContext,
  useState,
  useMemo,
  useCallback,
} from "react";

import {
  QuestionWithLetterPositionAndShifts,
  Question,
} from "../data/questions.types";
import { placeQuestions } from "../utils/placeQuestions";

type ActiveQuestionContextProps = {
  activeQuestion: Question | null;
  setActiveQuestion: (question: Question | null) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  answeredQuestionsAmount: number;
  correctedAnswersAmount: number;
  questions: QuestionWithLetterPositionAndShifts[];
  isFinished: boolean;
  onAnimationFinished: () => void;
};

export const ActiveQuestionContext = createContext<ActiveQuestionContextProps>(
  {} as ActiveQuestionContextProps,
);

export const ActiveQuestionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answeredQuestionsAmount, setAnsweredQuestionsAmount] = useState(0);
  const [correctedAnswersAmount, setCorrectedAnswersAmount] = useState(0);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  const questions = useMemo(placeQuestions, []);

  const setActiveQuestionHandler = useCallback((question: Question | null) => {
    setActiveQuestion(question);
    if (question) {
      setAnsweredQuestionsAmount(
        (answeredQuestionsAmount) => answeredQuestionsAmount + 1,
      );
      setIsAnimationFinished(false);
    }
  }, []);

  const setSelectedAnswerHandler = useCallback(
    (answer: string) => {
      setSelectedAnswer(answer);

      if (!activeQuestion || !answer) {
        return;
      }

      if (activeQuestion.correctAnswer === answer) {
        setCorrectedAnswersAmount(
          (correctedAnswersAmount) => correctedAnswersAmount + 1,
        );
      }
    },
    [activeQuestion],
  );

  const onAnimationFinished = useCallback(() => {
    setIsAnimationFinished(true);
  }, []);

  const isFinished = 
    answeredQuestionsAmount === questions.length &&
    !!selectedAnswer &&
    isAnimationFinished;

  return (
    <ActiveQuestionContext.Provider
      value={{
        activeQuestion,
        setActiveQuestion: setActiveQuestionHandler,
        selectedAnswer,
        setSelectedAnswer: setSelectedAnswerHandler,
        answeredQuestionsAmount,
        correctedAnswersAmount,
        questions,
        isFinished,
        onAnimationFinished,
      }}
    >
      {children}
    </ActiveQuestionContext.Provider>
  );
};
