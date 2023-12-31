export const games = {
  rain: {
    clouds: [
      {
        id: 1,
        picture:
          "./src/assets/games/rain/Liūtinis debesis_Nuotraukos aut. Arthur Goldstein iš Unsplash.jpg",
        alt: "Liūtinis debesis_Nuotraukos aut. Arthur Goldstein iš Unsplash",
        isCorrect: true,
        title: "Liūtiniai kamuoliniai",
        description:
          "Liūtiniai kamuoliniai debesys (lot. Cumulonimbus) – vieninteliai vertikalaus išsivystymo debesys, kurie pradeda formuotis maždaug 2&nbsp;km aukštyje, o jų viršūnės gali pasiekti aukščiausius troposferos sluoksnius (16–17&nbsp;km). Tai – galingi „priekalo“ formos audros debesys, kurių apatinė dalis plačiai nusidriekusi, labai tamsi, o viršutinę dalį sudaro dideli, balti kamuoliniai debesys. Liūtiniai kamuoliniai debesys sukelia pavojingiausius meteorologinius reiškinius: smarkius kritulius (liūtį, snygį) ir perkūniją, dažnai kyla škvalas, gali iškristi kruša.",
      },
      {
        id: 2,
        picture:
          "./src/assets/games/rain/Sluoksniniai kamuoliniai_Nuotraukos aut. Simon Eugster.jpg",
        alt: "Sluoksniniai kamuoliniai_Nuotraukos aut. Simon Eugster",
        isCorrect: true,
        title: "Sluoksniniai kamuoliniai",
        description:
          "Sluoksniniai kamuoliniai debesys (lot. Stratocumulus) – apatinio aukšto (0,7&shy;–&shy;2&nbsp;km), stori ir pilki debesys, po kuriais gali būti ir tamsesnių arba šviesesnių debesų lopų arba bangų. Uždengia visą dangų, neša kritulius (nedidelis lietus ar sniegas, dulksna), bet šie nebūna intensyvūs. Taip pat gali pranašauti artėjančią audrą.",
      },
      {
        id: 3,
        picture: "./src/assets/games/rain/Kamuoliniai_autorius nežinomas.jpg",
        alt: "Kamuoliniai_autorius nežinomas",
        isCorrect: false,
        title: "Kamuoliniai",
        description:
          "Kamuoliniai debesys (lot. Cumulus) – apatiniai vidutinio aukšto (2–7&nbsp;km), balti, kartais su tamsiu padu, pavieniai debesys, turintys ryškų kontūrą ir ištįsę į viršų. Šie debesys primena medvilnės pūką ar vatą, o debesims augant jie panašėja į pilies bokštus. Kamuoliniai debesys paprastai susidaro esant šiltiems, giedriems orams, lietus iš jų yra mažai tikėtinas.",
      },
      {
        id: 4,
        picture:
          "./src/assets/games/rain/Plunksniniai_Nuotraukos aut. Przemyslaw _BlueShade_ Idzkiewicz.jpg",
        alt: "Plunksniniai_Nuotraukos aut. Przemyslaw _BlueShade_ Idzkiewicz",
        isCorrect: false,
        title: "Plunksniniai",
        description:
          "Plunksniniai debesys (lot. Cirrus) – viršutinio aukšto (7–16&nbsp;km), ploni, pavieniai, balti debesys, turintys plunksnų išvaizdą. Šie debesys yra skaidrūs ir sudaryti iš ledo kristalų, todėl puikiai praleidžia saulės šviesą, taip formuodami įvairius optinius meteorologinius reiškinius (halas, saulės stulpai ir t. t.). Plunksniniai debesys pranašauja artėjantį šiltąjį atmosferos frontą, tačiau iš šių debesų krituliai žemės paviršiaus nepasiekia, nes išgaruoja ore.",
      },
    ],
  },
  snowflake: {
    snowflakes: [
      {
        id: 1,
        picture: "./src/assets/games/snowflake/1.Plokštelės.jpg.webp.jpeg",
        alt: "Plokštelės",
        isCorrect: false,
        title: "Plokštelės",
      },
      {
        id: 2,
        picture: "./src/assets/games/snowflake/2.Karpytos plokštelės.jpg",
        alt: "Karpytos plokštelės",
        isCorrect: false,
        title: "Karpytos plokštelės",
      },
      {
        id: 3,
        picture: "./src/assets/games/snowflake/3.Adatos.jpg.webp.jpeg",
        alt: "Adatos",
        isCorrect: true,
        title: "Adatos",
      },
      {
        id: 4,
        picture: "./src/assets/games/snowflake/4.Dendritai.jpg.webp.jpeg",
        alt: "Dendritai",
        isCorrect: false,
        title: "Dendritai",
      },
    ],
  },
  thunder: {
    places: [
      {
        id: 1,
        picture:
          "./src/assets/games/thunder/1. Nuotrauka iš Unsplash, aut. Gilly Stewart.jpg",
        alt: "Nuotrauka iš Unsplash, aut. Gilly Stewart",
        isCorrect: false,
      },
      {
        id: 2,
        picture:
          "./src/assets/games/thunder/2. Nuotrauka iš Unsplash, aut. Ben White.jpg",
        alt: "Nuotrauka iš Unsplash, aut. Ben White",
        isCorrect: false,
      },
      {
        id: 3,
        picture:
          "./src/assets/games/thunder/3. Nuotrauka iš Unsplash, aut. Kelly Sikkema.jpg",
        alt: "Nuotrauka iš Unsplash, aut. Kelly Sikkema",
        isCorrect: true,
      },
    ],
    detections: [
      {
        id: 1,
        title: "Pamatome",
        isCorrect: true,
      },
      {
        id: 2,
        title: "Išgirstame",
        isCorrect: false,
      },
    ],
  },
  wind: {
    winds: [
      {
        id: 1,
        picture:
          "./src/assets/games/wind/1. Nuotrauka iš Unsplash, aut. Zugr.jpg",
        alt: "1. Nuotrauka iš Unsplash, aut. Zugr",
        isCorrect: false,
        speed: "5–10 m/s",
      },
      {
        id: 2,
        picture:
          "./src/assets/games/wind/2. Nuotrauka iš Unsplash, aut. Cristobal Baeza.jpg",
        alt: "2. Nuotrauka iš Unsplash, aut. Cristobal Baeza",
        isCorrect: true,
        speed: "8–13 m/s",
      },
      {
        id: 3,
        picture:
          "./src/assets/games/wind/3. Nuotrauka iš Unsplash, aut. Marek Studzinski.jpg",
        alt: "3. Nuotrauka iš Unsplash, aut. Marek Studzinski",
        isCorrect: false,
        speed: "28–32 m/s",
      },
    ],
  },
  flood: {
    questions: [
      {
        id: 1,
        title:
          "1. Kuri iš šių priežasčių nėra viena iš dažniausių kilti potvyniui Lietuvos upėse?",
        correctAnswerId: 1,
        answers: [
          {
            id: 1,
            title: "Vėjo patvanka",
          },
          {
            id: 2,
            title: "Intensyvus lietus arba sniego tirpsmas",
          },
          {
            id: 3,
            title: "Ledų sangrūdos",
          },
        ],
      },
      {
        id: 2,
        title:
          "2. Koks kelias Lietuvoje yra beveik kasmet apsemiamas pavasario potvynio metu?",
        correctAnswerId: 2,
        answers: [
          {
            id: 1,
            title: "Prienai – Birštonas",
          },
          {
            id: 2,
            title: "Šilutė – Rusnė",
          },
          {
            id: 3,
            title: "Jurbarkas – Skaudvilė",
          },
        ],
      },
      {
        id: 3,
        title:
          "3. Kuriai Europos šaliai gresia didžiausias pavojus dėl jūros lygio kilimo, vykstant klimato kaitai?",
        correctAnswerId: 1,
        answers: [
          {
            id: 1,
            title: "Nyderlandai",
          },
          {
            id: 2,
            title: "Belgija",
          },
          {
            id: 3,
            title: "Italija",
          },
        ],
      },
    ],
  },
  sound: {
    sounds: [
      {
        id: 1,
        picture: "./src/assets/games/sound/1.png",
        soundUrl: "KqJ37MVf16Y",
        title: "Vėjas",
      },
      {
        id: 2,
        picture: "./src/assets/games/sound/2.png",
        soundUrl: "T-BOPr7NXME",
        title: "Perkūnija",
      },
      {
        id: 3,
        picture: "./src/assets/games/sound/3.png",
        soundUrl: "7pQPJNkGZHg",
        title: "Sniegas",
        start: 20,
      },
      {
        id: 4,
        picture: "./src/assets/games/sound/4.png",
        soundUrl: "4B7Cios0_OY",
        title: "Liūtis",
      },
    ],
  },
  earth: {
    answers: [
      {
        id: 1,
        title: "Domėkis",
      },
      {
        id: 2,
        title: "Rinkis taupius prietaisus",
      },
      {
        id: 3,
        title: "Rūšiuok",
      },
      {
        id: 4,
        title: "Keliauk tvariau",
      },
      {
        id: 5,
        title: "Išjunk, kai nenaudoji",
      },
      {
        id: 6,
        title: "Informuok kitus",
      },
      {
        id: 7,
        title: "Rinkis žaliąją energiją",
      },
      {
        id: 8,
        title: "Naudok mažiau",
      },
    ],
  },
  rainbow: {
    stripes: [
      {
        id: 1,
        color: "#E20613",
        text: "Raudonai,",
        type: "red",
      },
      {
        id: 2,
        color: "#F29100",
        text: "o",
        type: "orange",
      },
      {
        id: 3,
        color: "#FBE910",
        text: "gal",
        type: "yellow",
      },
      {
        id: 4,
        color: "#52B71D",
        text: "žaliai",
        type: "green",
      },
      {
        id: 5,
        color: "#36A8E0",
        text: "žydi",
        type: "blue",
      },
      {
        id: 6,
        color: "#27348A",
        text: "marių",
        type: "indigo",
      },
      {
        id: 7,
        color: "#81368B",
        text: "vandenai.",
        type: "violet",
      },
    ],
  },
};
