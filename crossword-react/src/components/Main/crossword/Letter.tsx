import { memo } from "react";
import classNames from "classnames";

import { Status } from "./crossword.types";

interface LetterProps {
  status: Status;
  isFinished: boolean;
  index: number;
  letterPosition: number;
  openClassIndex: number;
  letter: string;
}

const isOpened = (status: Status) =>
  [Status.CORRECT_OPEN, Status.ICORRECT_OPEN].includes(status);

const propsAreEqual = (prevProps: LetterProps, nextProps: LetterProps) => {
  if (prevProps.status !== nextProps.status) {
    return false;
  }

  if (prevProps.isFinished !== nextProps.isFinished) {
    return false;
  }

  if (nextProps.openClassIndex === nextProps.index) {
    return false;
  }

  return true;
};

export const Letter = memo<LetterProps>(
  ({ status, isFinished, index, letterPosition, openClassIndex, letter }) => (
    <td
      className={classNames("crossword-table_cell active", {
        selected: status !== Status.PENDING,
        correct: status === Status.CORRECT_OPEN,
        incorrect: status === Status.ICORRECT_OPEN,
        final: isFinished && index !== letterPosition,
        guessed: isFinished && index === letterPosition,
        open: isOpened(status) && index <= openClassIndex && !isFinished,
      })}
    >
      {isOpened(status) && index <= openClassIndex && letter}
    </td>
  ),
  propsAreEqual,
);
