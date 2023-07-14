import { useState } from "react";

interface DescriptionProps {
  long: string;
  short: string;
}

export const Description = ({ long, short }: DescriptionProps) => {
  const [isExpended, setIsExpended] = useState(false);

  const openExpended = () => setIsExpended(true);

  return (
    <div>
      <div>{isExpended ? long : short}</div>
      <div>
        {!isExpended && <button onClick={openExpended}>Daugiau</button>}
      </div>
    </div>
  );
};
