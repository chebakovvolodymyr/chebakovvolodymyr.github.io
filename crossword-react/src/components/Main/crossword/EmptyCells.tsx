interface EmptyCellsProps {
  amount: number;
}

export const EmptyCells = ({ amount }: EmptyCellsProps) =>
  new Array(amount).fill("").map((_, index) => <td key={index}></td>);
