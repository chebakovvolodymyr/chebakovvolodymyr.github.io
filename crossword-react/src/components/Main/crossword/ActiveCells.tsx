interface ActiveCellsProps {
  word: string;
}

export const ActiveCells = ({ word }: ActiveCellsProps) =>
  Array.from(word).map((_, index) => <td key={index} className="active"></td>);
