import classNames from "classnames"
import { FC } from "react"

interface HeaderProps {
    isContinueButtonDisabled: boolean
    closeGame: () => void
}

export const Header: FC<HeaderProps> = ({closeGame, isContinueButtonDisabled}) => {
    return (
        <header>
            <div className="question_title">
                <span>
                    Lietaus iššūkis. Priskirk debesims jų tipų pavadinimus, pažymėk, iš kurių galima tikėtis lietaus ir spausk „Pateikti“.
                </span>
            </div>
            <button className={classNames({
                'continue-button--disabled': isContinueButtonDisabled,
            })}>Pateikti</button>
            <button className="question_close" onClick={closeGame}></button>
        </header>
    )
}