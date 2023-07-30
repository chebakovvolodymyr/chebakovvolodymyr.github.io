export enum CardName {
    RAIN = 'rain',
    SNOWFLAKE = 'snowflake',
    RAINBOW = 'rainbow',
    THUNDER = 'thunder',
    MELTING_ICE = 'melting-ice',
    EARTH = 'earth',
    SOUND = 'sound',
    WIND = 'wind',
    FLOOD = 'flood',
}

export type Card = {
    id: string | number,
    name: CardName,
    image: string,
}

export const cards = [
    {
        id: 1,
        name: CardName.RAIN,
        image: './src/assets/cards/rain.svg',
    },
    {
        id: 2,
        name: CardName.SNOWFLAKE,
        image: './src/assets/cards/snowflake.svg',
    },
    {
        id: 3,
        name: CardName.RAINBOW,
        image: './src/assets/cards/rainbow.svg',
    },
    {
        id: 4,
        name: CardName.THUNDER,
        image: './src/assets/cards/thunder.svg',
    },
    {
        id: 5,
        name: CardName.MELTING_ICE,
        image: './src/assets/cards/melting-ice.svg',
    },
    {
        id: 6,
        name: CardName.EARTH,
        image: 'https://picsum.photos/200/300',
    },
    {
        id: 7,
        name: CardName.SOUND,
        image: 'https://picsum.photos/200/300',
    },
    {
        id: 8,
        name: CardName.WIND,
        image: 'https://picsum.photos/200/300',
    },
    {
        id: 9,
        name: CardName.FLOOD,
        image: 'https://picsum.photos/200/300',
    },
]

const shuffle = (array: Card[]) => {
    let currentIndex = array.length
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

const doubledCards = (cards: Card[]) => [
    ...cards.map(card => ({...card, id: card.id + '_0'})), 
    ...cards.map(card => ({...card, id: card.id + '_1'})),
]

export const getDoubledAndShuffledCards = (cards: Card[]) => shuffle(doubledCards(cards))