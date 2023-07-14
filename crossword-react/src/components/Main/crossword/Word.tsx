import { useEffect, useState } from "react"
import { Status } from "./crossword.types"

interface WordProps {
    word: string
    status: Status
}

const isOpened = (status: Status) => status === Status.CORRECT_OPEN || status === Status.ICORRECT_OPEN

export const Word = ({word, status}: WordProps) => {
    const [openClassIndex, setOpenClassIndex] = useState(0)

    const increaseOpenClassIndex = () => {
        if (openClassIndex >= word.length) {
            return
        }

        setTimeout(() => setOpenClassIndex(openClassIndex => openClassIndex + 1), 150)
    }

    useEffect(() => {
        if (isOpened(status)) {
            increaseOpenClassIndex()
        }
    }, [status, openClassIndex])
    
    return Array.from(word).map((c, index) => (
        <td 
            key={index} 
            className={`active ${(status === Status.SELECTED || status === Status.CORRECT_OPEN) ? 'green' : ''} ${status === Status.ICORRECT_OPEN ? 'orange': ''} ${isOpened(status) && (index <= openClassIndex) ? 'open' : ''}`}
        >
            {isOpened(status) && (index <= openClassIndex) && c}
        </td>
    ))
}