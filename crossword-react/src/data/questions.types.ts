import { questions } from "../data/questions";

export type Question = (typeof questions)[0];

export type QuestionWithLetterPosition = Question & { letterPosition: number };

export type QuestionWithLetterPositionAndShifts = QuestionWithLetterPosition & {
  leftShift: number;
  rightShift: number;
};
