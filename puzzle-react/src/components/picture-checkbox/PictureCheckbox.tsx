import { FC } from "react"

interface PictureCheckboxProps {
    url: string
    alt: string

    checked: boolean

    onChange: () => void
}

export const PictureCheckbox: FC<PictureCheckboxProps> = ({url, alt, checked, onChange}) => {
    return (
        <div className="picture-checkbox">
            <img src={url} alt={alt} />
            <label className="picture-checkbox_label">
                <input type="checkbox" checked={checked} onChange={onChange}/>
            </label>
        </div>
    )
}