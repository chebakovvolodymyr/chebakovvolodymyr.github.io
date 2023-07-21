import { ReactElement } from "react";

interface EmptyCellsProps {
  amount: number;
}

export const EmptyCells = ({ amount }: EmptyCellsProps): ReactElement[] =>
  new Array(amount).fill("").map((_, index) => <td key={index}></td>);
