import { questions } from "../data/questions"

type Question = typeof questions[0]

type QuestionWithLetterPosition = Question & {letterPosition: number}

const findClosestToMiddleLetterPosition = (matches: RegExpMatchArray[], middlePosition: number) => {
    const indexesDistance = matches.map(({index = 0}) => Math.abs(index - middlePosition))

    const minDistance = Math.min(...indexesDistance);

    return matches[indexesDistance.indexOf(minDistance)].index;
}

const getLetterPosition = ({word, letter}: {word: string, letter: string}) => {
    const matches = Array.from(word.matchAll(new RegExp(letter, 'ig')));
    const middlePosition = Math.ceil(word.length / 2)
    if (!matches.length) {
        return middlePosition;
    }

    if (matches.length === 1) {
        return matches[0].index || middlePosition;
    }

    return findClosestToMiddleLetterPosition(matches, middlePosition) || middlePosition;
}

const calculateMaxShifts = (questionsWithLetterPosition: QuestionWithLetterPosition[]) => 
    questionsWithLetterPosition.reduce((acc, {word, letterPosition}) => {
            const leftShift = letterPosition ? letterPosition - 1 : letterPosition;
            const rightShift = word.length - letterPosition;

            if (acc.maxLeftShift < leftShift) {
                acc.maxLeftShift = leftShift;
            }

            if (acc.maxRightShift < rightShift) {
                acc.maxRightShift = rightShift;
            }
            return acc;
        }, 
        {maxLeftShift: 0, maxRightShift: 0}
    )

const calculateShifts = (questionsWithLetterPosition: QuestionWithLetterPosition[], maxLeftShift: number, maxRightShift: number) => 
    questionsWithLetterPosition.map((question) => {
        const leftShift = question.letterPosition ? question.letterPosition - 1 : question.letterPosition;
        const rightShift = question.word.length - question.letterPosition;
        return {
            ...question,
            leftShift: maxLeftShift - leftShift,
            rightShift: maxRightShift - rightShift,
        }
    })

export const placeQuestions = () => {
    const questionsWithLetterPosition: QuestionWithLetterPosition[] = questions.map((question) => {
        const letterPosition = getLetterPosition(question);

        return {
            ...question,
            letterPosition,
        }
    });

    const {maxLeftShift, maxRightShift} = calculateMaxShifts(questionsWithLetterPosition)

    return calculateShifts(questionsWithLetterPosition, maxLeftShift, maxRightShift)
}