import { forwardRef } from "react";

interface PictureCheckboxProps {
  url: string;
  alt: string;

  checked: boolean;

  onChange: () => void;
  onLoad?: () => void
}

export const PictureCheckbox = forwardRef<HTMLDivElement, PictureCheckboxProps>(({
  url,
  alt,
  checked,
  onChange,
  onLoad,
}, forwardedRef) => {
  return (
    <div className="picture-checkbox" ref={forwardedRef}>
      <img src={url} alt={alt} onLoad={onLoad}/>
      <div className="picture-checkbox_customized">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <label className="picture-checkbox_label"></label>
      </div>
    </div>
  );
});
