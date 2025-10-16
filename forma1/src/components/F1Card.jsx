import "../assets/style.css";
import ferrari from "../assets/ferrari.jpg";
import ferrari2 from "../assets/ferrari2.jpg";

export default function F1Card() {
  return (
    <div className="f1-card">
      <h1>F1 hírek</h1>
      <img src={ferrari} className="f1-image" title="Ferrari" />
      <p>
        A Ferrari bemutatta új, 2025-ös Forma–1-es autóját a nagyközönségnek,
        miután a csapat az F1 75 Live szezonindító eseményen már leleplezte az
        új versenyfestést. A csapat új pilótapárosa, Lewis Hamilton és Charles
        Leclerc, valamint a csapatfőnök Fred Vasseur közösen mutatták be a
        szezonra szánt dizájnt a londoni The O2 arénában tartott különleges
        esten. Az új versenygép, az SF-25 első képei nem sokkal később kerültek
        nyilvánosságra. További olvasnivaló: Új csapattársak közötti
        rivalizálás, többcsapatos bajnoki harc – 5 izgalmas küzdelem, amit
        érdemes figyelni 2025-ben
      </p>
      <img src={ferrari2} className="f1-image" title="Ferrari" />
      <p>
        Ez egy új korszak kezdetét jelenti a Ferrari számára, hiszen Hamilton új
        fejezetet nyit karrierjében, miután lezárta 12 éves időszakát a
        Mercedesnél. A hétszeres világbajnok az F1 75 Live eseményen úgy
        nyilatkozott, hogy „tele van élettel”, és izgatottan várja első
        szezonját a Scuderiánál. A keddi bemutató után az SF-25 szerdán gördül
        pályára először, egy shakedown keretében a csapat fioranói
        tesztpályáján, ahol mindkét pilóta, Hamilton és Leclerc is vezeti majd
        az autót. Ezt követően a Ferrari csatlakozik a mezőny többi tagjához a
        bahreini előszezoni teszten, amelyet február 26–28. között rendeznek meg
        a Bahrain International Circuit pályán. A szezon pedig az Ausztrál
        Nagydíjjal veszi kezdetét március 14–16. között.
      </p>
    </div>
  );
}
