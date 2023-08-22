export const Result = () => {
  return (
    <div className="wind-result">
      <div className="wind-result-text">
        <span>
          Vėjas – horizontalus oro judėjimas žemės paviršiaus atžvilgiu,
          apibūdinamas kryptimi, greičiu ir trukme. Jis atsiranda dėl skirtingo
          atmosferos slėgio ir žemės paviršiaus temperatūrų skirtumo. Vėjo
          greitis matuojamas m/s (kartais – km/h), kryptis įvardijama pagal tai,
          iš kurios krypties jis pučia (šiaurės vakarų, pietų, pietryčių ir t.
          t.). Nors stiprūs vėjai padaro daug žalos, tačiau vėjo galia taip pat
          naudojama elektros energijos gamybai. <p>Pagal stiprumą ir trukmę vėjas
          gali būti skirstomas į brizą, škvalą, uraganą, viesulą. Brizas –
          švelnus vietinis vėjas jūrų ir ežerų pakrantėse, keičiantis kryptį du
          kartus per parą dėl atmosferos slėgio kaitos. Škvalas – tai staigus ir
          smarkus vėjo sustiprėjimas, kuris susidaro susidūrus šiltai ir šaltai
          oro masėms. Dažniausiai trunka trumpai, apima nedidelę teritoriją,
          vėjo greitis gali siekti 20–37 m/s. Uraganas yra labai galingas
          ciklonas, atnešantis ypač stiprius vėjus (≥33 m/s) ir liūtis. Viesulas
          – galingas oro sūkurys su beveik vertikalia ašimi, panašus į piltuvą
          ir pasižymintis labai dideliu sukimosi greičiu. Vėjas pučia nuolat,
          tačiau kartais jis būna toks silpnas, kad atrodo, lyg aplinka yra
          bevėjė – tai vadinama tyka (≤0,5 m/s). Dažniausiai tyka susidaro
          anticiklono metu, taip pat slėniuose, duburiuose.</p>
        </span>
      </div>
      <div className="wind-result-letters">
        Š – Šiaurės
        <br />
        ŠR – Šiaurės rytų
        <br />
        R – Rytų
        <br />
        PR – Pietryčių
        <br />
        P – Pietų
        <br />
        PV – Pietvakarių
        <br />
        V – Vakarų
        <br />
        ŠV – Šiaurės vakarų
        <br />
      </div>
    </div>
  );
};
