import { useCallback, useContext, useEffect, useState } from "react";
import classNames from "classnames";

import { ActiveQuestionContext } from "../../../context/ActiveQuestion";
import { Status } from "./crossword.types";

interface WordProps {
  word: string;
  status: Status;
  letterPosition: number;
}

const isOpened = (status: Status) =>
  status === Status.CORRECT_OPEN || status === Status.ICORRECT_OPEN;

export const Word = ({ word, status, letterPosition }: WordProps) => {
  const { isFinished } = useContext(ActiveQuestionContext);

  const [openClassIndex, setOpenClassIndex] = useState(0);

  const increaseOpenClassIndex = useCallback(
    (openClassIndex: number) => {
      if (openClassIndex >= word.length) {
        return;
      }

      setTimeout(
        () => setOpenClassIndex((openClassIndex) => openClassIndex + 1),
        150,
      );
    },
    [word.length],
  );

  useEffect(() => {
    if (isOpened(status)) {
      increaseOpenClassIndex(openClassIndex);
    }
  }, [increaseOpenClassIndex, status, openClassIndex]);

  return Array.from(word).map((c, index) => (
    <td
      key={index}
      className={classNames("active", {
        green: status === Status.SELECTED || status === Status.CORRECT_OPEN,
        orange: status === Status.ICORRECT_OPEN,
        red: isFinished && index === letterPosition,
        open: isOpened(status) && index <= openClassIndex,
      })}
    >
      {isOpened(status) && index <= openClassIndex && c}
    </td>
  ));
};
