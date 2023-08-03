import { useCallback, useEffect, useState, memo } from "react";

import { Status } from "./crossword.types";
import { Letter } from "./Letter";

interface WordProps {
  word: string;
  status: Status;
  letterPosition: number;
  isFinished: boolean;

  onAnimationFinished: () => void;
}

const isOpened = (status: Status) =>
  status === Status.CORRECT_OPEN || status === Status.ICORRECT_OPEN;

export const Word = memo<WordProps>(
  ({
    word,
    status,
    letterPosition,
    isFinished,
    onAnimationFinished,
  }) => {
    const [openClassIndex, setOpenClassIndex] = useState(0);

    const increaseOpenClassIndex = useCallback(
      (openClassIndex: number) => {
        if (openClassIndex >= word.length) {
          onAnimationFinished();
          return;
        }

        setTimeout(
          () => setOpenClassIndex((openClassIndex) => openClassIndex + 1),
          150,
        );
      },
      [onAnimationFinished, word.length],
    );

    useEffect(() => {
      if (isOpened(status)) {
        increaseOpenClassIndex(openClassIndex);
      }
    }, [increaseOpenClassIndex, status, openClassIndex]);

    return (
      <>
        {Array.from(word).map((c, index) => (
          <Letter
            key={index}
            status={status}
            isFinished={isFinished}
            index={index}
            letterPosition={letterPosition}
            openClassIndex={openClassIndex}
            letter={c}
          />
        ))}
      </>
    );
  },
);
