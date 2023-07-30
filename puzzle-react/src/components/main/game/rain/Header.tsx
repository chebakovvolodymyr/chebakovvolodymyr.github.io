import { FC } from "react"

interface HeaderProps {
    isContinueButtonDisabled: boolean
    closeGame: () => void
}

export const Header: FC<HeaderProps> = ({closeGame, isContinueButtonDisabled}) => {
    return (
        <header>
            <span>Lietaus iššūkis. Priskirk debesims jų tipų pavadinimus, pažymėk, iš kurių galima tikėtis lietaus ir spausk „Pateikti“.</span>
            <button>Pateikti</button>
            <button onClick={closeGame}>X</button>
        </header>
    )
}