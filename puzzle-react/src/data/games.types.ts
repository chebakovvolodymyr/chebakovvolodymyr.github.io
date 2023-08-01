export interface Cloud {
    id: number
    picture: string
    alt: string
    isCorrect: boolean
    title: string
    description: string
}

export interface Snowflake {
    id: number
    picture: string
    alt: string
    isCorrect: boolean
    title: string
}

export interface ThunderPlace {
    id: number
    picture: string
    alt: string
    isCorrect: boolean
}

export interface ThunderDetection {
    id: number
    title: string
    isCorrect: boolean
}

export interface Wind {
    id: number
    picture: string
    alt: string
    isCorrect: boolean
    speed: string
}