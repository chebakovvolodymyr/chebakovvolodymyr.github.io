export interface Cloud {
  id: number;
  picture: string;
  alt: string;
  isCorrect: boolean;
  title: string;
  description: string;
}

export interface Snowflake {
  id: number;
  picture: string;
  alt: string;
  isCorrect: boolean;
  title: string;
}

export interface ThunderPlace {
  id: number;
  picture: string;
  alt: string;
  isCorrect: boolean;
}

export interface ThunderDetection {
  id: number;
  title: string;
  isCorrect: boolean;
}

export interface Wind {
  id: number;
  picture: string;
  alt: string;
  isCorrect: boolean;
  speed: string;
}

export interface FloodAnswer {
  id: number;
  title: string;
}

export interface FloodQuestion {
  id: number;
  title: string;
  correctAnswerId: number;
  answers: FloodAnswer[];
}

export interface Sound {
  id: number;
  picture: string;
  soundUrl: string;
  title: string;
  start?: number;
}

export interface EarthAnswer {
  id: number;
  title: string;
}

export interface RainbowStripe {
  id: number;
  color: string;
  text: string;
  type: string;
}
