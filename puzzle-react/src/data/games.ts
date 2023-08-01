export const games = {
    rain: {
        clouds: [
            {
                id: 1,
                picture: './src/assets/games/rain/Liūtinis debesis_Nuotraukos aut. Arthur Goldstein iš Unsplash.jpg',
                alt: 'Liūtinis debesis_Nuotraukos aut. Arthur Goldstein iš Unsplash',
                isCorrect: false,
                title: 'Liūtiniai kamuoliniai',
                description: 'Liūtiniai kamuoliniai debesys (lot. Cumulonimbus) – vieninteliai vertikalaus išsivystymo debesys, kurie pradeda formuotis maždaug 2 km aukštyje, o jų viršūnės gali pasiekti aukščiausius troposferos sluoksnius (16–17 km). Tai – galingi „priekalo“ formos audros debesys, kurių apatinė dalis plačiai nusidriekusi, labai tamsi, o viršutinę dalį sudaro dideli, balti kamuoliniai debesys. Liūtiniai kamuoliniai debesys sukelia pavojingiausius meteorologinius reiškinius: smarkius kritulius (liūtį, snygį) ir perkūniją, dažnai kyla škvalas, gali iškristi kruša.',
            },
            {
                id: 2,
                picture: './src/assets/games/rain/Sluoksniniai kamuoliniai_Nuotraukos aut. Simon Eugster.jpg',
                alt: 'Sluoksniniai kamuoliniai_Nuotraukos aut. Simon Eugster',
                isCorrect: true,
                title: 'Sluoksniniai kamuoliniai',
                description: 'Sluoksniniai kamuoliniai debesys (lot. Stratocumulus) – apatinio aukšto (0,7–2 km), stori ir pilki debesys, po kuriais gali būti ir tamsesnių arba šviesesnių debesų lopų arba bangų. Uždengia visą dangų, neša kritulius (nedidelis lietus ar sniegas, dulksna), bet šie nebūna intensyvūs. Taip pat gali pranašauti artėjančią audrą.',
            },
            {
                id: 3,
                picture: './src/assets/games/rain/Kamuoliniai_autorius nežinomas.jpg',
                alt: 'Kamuoliniai_autorius nežinomas',
                isCorrect: true,
                title: 'Kamuoliniai',
                description: 'Kamuoliniai debesys (lot. Cumulus) – apatiniai vidutinio aukšto (2–7 km), balti, kartais su tamsiu padu, pavieniai debesys, turintys ryškų kontūrą ir ištįsę į viršų. Šie debesys primena medvilnės pūką ar vatą, o debesims augant jie panašėja į pilies bokštus. Kamuoliniai debesys paprastai susidaro esant šiltiems, giedriems orams, lietus iš jų yra mažai tikėtinas.',
            },
            {
                id: 4,
                picture: './src/assets/games/rain/Plunksniniai_Nuotraukos aut. Przemyslaw _BlueShade_ Idzkiewicz.jpg',
                alt: 'Plunksniniai_Nuotraukos aut. Przemyslaw _BlueShade_ Idzkiewicz',
                isCorrect: false,
                title: 'Plunksniniai',
                description: 'Plunksniniai debesys (lot. Cirrus) – viršutinio aukšto (7–16 km), ploni, pavieniai, balti debesys, turintys plunksnų išvaizdą. Šie debesys yra skaidrūs ir sudaryti iš ledo kristalų, todėl puikiai praleidžia saulės šviesą, taip formuodami įvairius optinius meteorologinius reiškinius (halas, saulės stulpai ir t. t.). Plunksniniai debesys pranašauja artėjantį šiltąjį atmosferos frontą, tačiau iš šių debesų krituliai žemės paviršiaus nepasiekia, nes išgaruoja ore.',
            },
        ],
    },
    snowflake: {
        snowflakes: [
            {
                id: 1,
                picture: './src/assets/games/snowflake/1.Plokštelės.jpg.webp.jpeg',
                alt: 'Plokštelės',
                isCorrect: false,
                title: 'Plokštelės',
            },
            {
                id: 2,
                picture: './src/assets/games/snowflake/2.Karpytos plokštelės.jpg',
                alt: 'Karpytos plokštelės',
                isCorrect: false,
                title: 'Karpytos plokštelės',
            },
            {
                id: 3,
                picture: './src/assets/games/snowflake/3.Adatos.jpg.webp.jpeg',
                alt: 'Adatos',
                isCorrect: true,
                title: 'Adatos',
            },
            {
                id: 4,
                picture: './src/assets/games/snowflake/4.Dendritai.jpg.webp.jpeg',
                alt: 'Dendritai',
                isCorrect: false,
                title: 'Dendritai',
            },
        ],
    },
    thunder: {
        places: [
            {
                id: 1,
                picture: './src/assets/games/thunder/1. Nuotrauka iš Unsplash, aut. Gilly Stewart.jpg',
                alt: 'Nuotrauka iš Unsplash, aut. Gilly Stewart',
                isCorrect: false,
            },
            {
                id: 2,
                picture: './src/assets/games/thunder/2. Nuotrauka iš Unsplash, aut. Ben White.jpg',
                alt: 'Nuotrauka iš Unsplash, aut. Ben White',
                isCorrect: true,
            },
            {
                id: 3,
                picture: './src/assets/games/thunder/3. Nuotrauka iš Unsplash, aut. Kelly Sikkema.jpg',
                alt: 'Nuotrauka iš Unsplash, aut. Kelly Sikkema',
                isCorrect: false,
            },
        ],
        detections: [
            {
                id: 1,
                title: 'Pamatome',
                isCorrect: false,
            },
            {
                id: 2,
                title: 'Išgirstame',
                isCorrect: true,
            },
        ],
    },
    wind: {
        winds: [
            {
                id: 1,
                picture: './src/assets/games/wind/1. Nuotrauka iš Unsplash, aut. Zugr.jpg',
                alt: '1. Nuotrauka iš Unsplash, aut. Zugr',
                isCorrect: false,
                speed: '5–10 m/s',
            },
            {
                id: 2,
                picture: './src/assets/games/wind/2. Nuotrauka iš Unsplash, aut. Cristobal Baeza.jpg',
                alt: '2. Nuotrauka iš Unsplash, aut. Cristobal Baeza',
                isCorrect: true,
                speed: '8–13 m/s',
            },
            {
                id: 3,
                picture: './src/assets/games/wind/3. Nuotrauka iš Unsplash, aut. Marek Studzinski.jpg',
                alt: '3. Nuotrauka iš Unsplash, aut. Marek Studzinski',
                isCorrect: false,
                speed: '28–32 m/s',
            },
        ]
    }
}