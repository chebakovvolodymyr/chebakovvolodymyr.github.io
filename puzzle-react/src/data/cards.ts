import { shuffle } from "../utils/shuffle";

export enum CardName {
  RAIN = "rain",
  SNOWFLAKE = "snowflake",
  RAINBOW = "rainbow",
  THUNDER = "thunder",
  MELTING_ICE = "melting-ice",
  EARTH = "earth",
  SOUND = "sound",
  WIND = "wind",
  FLOOD = "flood",
}

export type Card = {
  id: string | number;
  name: CardName;
  image: string;
  alt: string;
};

export const cards = [
  {
    id: 1,
    name: CardName.RAIN,
    image: "./assets/cards/1.png",
    alt: "Lietaus iššūkis (Iš flaticon.com, aut. Freepic)",
  },
  {
    id: 2,
    name: CardName.SNOWFLAKE,
    image: "./assets/cards/2.png",
    alt: "Sniego iššūkis (Iš flaticon.com, aut. Freepic)",
  },
  {
    id: 3,
    name: CardName.RAINBOW,
    image: "./assets/cards/3.png",
    alt: "Vaivorykštės iššūkis (Iš flaticon.com, aut. Freepic)",
  },
  {
    id: 4,
    name: CardName.THUNDER,
    image: "./assets/cards/4.png",
    alt: "Perkūnijos iššūkis (Iš flaticon.com, aut. Freepic)",
  },
  {
    id: 5,
    name: CardName.WIND,
    image: "./assets/cards/5.png",
    alt: "Vėjo iššūkis (Iš flaticon.com, aut. Freepic)",
  },
  {
    id: 6,
    name: CardName.FLOOD,
    image: "./assets/cards/6.png",
    alt: "Potvynio iššūkis (Iš flaticon.com, aut. Freepic)",
  },
  {
    id: 7,
    name: CardName.MELTING_ICE,
    image: "./assets/cards/7.png",
    alt: "Ledonešio iššūkis (Iš flaticon.com, aut. Freepic)",
  },
  {
    id: 8,
    name: CardName.SOUND,
    image: "./assets/cards/8.png",
    alt: "Garsinis iššūkis (Iš flaticon.com, aut. Freepic)",
  },
  {
    id: 9,
    name: CardName.EARTH,
    image: "./assets/cards/9.png",
    alt: "Klimatosaugos iššūkis (Iš flaticon.com, aut. Freepic)",
  },
];

const doubledCards = (cards: Card[]) => [
  ...cards.map((card) => ({ ...card, id: card.id + "_0" })),
  ...cards.map((card) => ({ ...card, id: card.id + "_1" })),
];

export const getDoubledAndShuffledCards = (cards: Card[]) =>
  shuffle(doubledCards(cards));
