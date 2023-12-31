import { useState } from "react";

interface DescriptionProps {
  long: string;
  short: string;
}

export const Description = ({ long, short }: DescriptionProps) => {
  const [isExpended, setIsExpended] = useState(false);

  const openExpended = () => setIsExpended(true);

  return (
    <div className="description">
      <div
        className="description_text"
        dangerouslySetInnerHTML={{
          __html: isExpended ? long : short,
        }}
      />
      <div>
        {!isExpended && (
          <button
            onClick={openExpended}
            className="description_expended_button"
          >
            Daugiau
          </button>
        )}
      </div>
    </div>
  );
};
