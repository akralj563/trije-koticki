// Vsebina domače strani, povzeta po docs/IZVORNA-VSEBINA.md (OSNOVA.docx, kazalo).
// Besedila niso lektorirana; naročnica jih mora potrditi pred objavo.
// Zdravstvene navedbe, recepti in navodila uporabe namenoma NISO uporabljeni.

import type { ImageMetadata } from 'astro';
import kosara from '../assets/prototip/zelisca-uvod.jpg';
import snopiMiza from '../assets/prototip/snopi.jpg';
import sivka from '../assets/prototip/sivka.png';
import rozmarin from '../assets/prototip/rozmarin.png';
import zajbelj from '../assets/prototip/zajbelj.png';

// DELOVNO IME — zamenjaj po potrditvi imena znamke (glej docs/NAPREDEK.md).
export const znamka = {
  ime: 'Trije kotički',
  opis: 'ustvarjalnost · narava · ravnovesje',
};

export const navigacija = [
  { href: '#unikatni', oznaka: 'Unikatni kotiček' },
  { href: '#zeliscni', oznaka: 'Zeliščni kotiček' },
  { href: '#energijski', oznaka: 'Energijski kotiček' },
  { href: '#kontakt', oznaka: 'Kontakt' },
];

// ZAČASNI VIZUALI iz OSNOVA.docx. Gradivo jih označuje kot slike iz interneta za zamenjavo;
// ne prikazujejo dejanskih izdelkov naročnice in niso za produkcijsko objavo.
export interface Slika {
  src: ImageMetadata;
  alt: string;
  pozicija?: string;
}

export const slike = {
  kosara: {
    src: kosara,
    alt: 'Pletena košara, polna svežih zelišč in cvetov: beli rman, oranžni ognjič, sivka in srebrnkasti listi.',
  },
  snopiMiza: {
    src: snopiMiza,
    alt: 'Posušeni snopi zelišč, vejice rožmarina in listi na leseni mizi v topli svetlobi.',
  },
} satisfies Record<string, Slika>;

export const uvod = {
  pozdrav: 'Dobrodošel v prostoru, kjer se ustvarjalnost prepleta z naravo.',
  naslov: ['Ustvarjeno', 's srcem, iz', 'darov narave'],
  besedilo:
    'Trije ustvarjalni kotički, vsak s svojo zgodbo, a vsi povezani z isto željo – ustvarjati izdelke, ki nagovorijo, razveselijo in ostanejo del nečesa lepega.',
  pozivi: [
    { href: '#koticki', oznaka: 'Razišči kotičke' },
    { href: '#zeliscni', oznaka: 'Izbrana zelišča' },
  ],
  kazalnik: { href: '#zgodba', oznaka: 'Pomakni se' },
};

// Celozaslonski hero s posnetkom, ki ga vodi pomikanje (src/components/ScrollVideoHero.astro).
// Datoteki v public/video/ še nista dodani; dokler ju ni, se prikaže `nadomestna` fotografija
// brez scroll prostora. Preverjanje: npm run preveri:video (glej docs/NAPREDEK.md).
export const heroVizual = {
  video: '/video/hero-scroll.mp4',
  poster: '/video/hero-poster.avif',
  nadomestna: slike.kosara,
  // Oznaka ostane, dokler posnetek ali fotografija nista potrjeno gradivo naročnice.
  oznaka: 'Začasni vizual',
  // Žarišče za object-position: pomemben del kadra ostane viden pri 390 in 1440 px.
  fokus: { mobilno: '50% 55%', namizje: '50% 50%' },
  // Višina celotnega hero prostora v svh (vključno s 100svh pripetega prizora).
  razdalja: { mobilno: 200, namizje: 290 },
  // Delež razlike med trenutnim in ciljnim časom, ki ga posnetek dohiti v enem okvirju (60 fps).
  glajenje: 0.16,
  // Faze glede na napredek pomikanja (0–1): kdaj besedilo odide in kdaj se prizor zlije v naslednjo sekcijo.
  faze: { besediloOd: 0.18, besediloDo: 0.5, prehodOd: 0.8 },
};

export const zgodba = {
  poudarek:
    'Vsaka moja stvaritev nastaja z občutkom, potrpežljivostjo in spoštovanjem do materialov ter njihove edinstvene zgodbe.',
  odstavki: [
    'Navdih najdem v naravi, drobnih trenutkih in prepričanju, da predmeti, ustvarjeni s srcem, nosijo posebno energijo.',
    'Želim, da v mojih izdelkih ne najdeš le lepote, temveč tudi toplino in pristnost.',
  ],
  misel: 'Verjamem, da najlepše stvari nastanejo takrat, ko ustvarjamo s srcem.',
};

export interface Koticek {
  id: 'unikatni' | 'zeliscni' | 'energijski';
  naslov: string;
  podnaslov: string;
  besedilo: string;
  poziv: string;
}

export const koticki: Koticek[] = [
  {
    id: 'unikatni',
    naslov: 'Unikatni kotiček',
    podnaslov: 'Nakit in dodatki',
    besedilo: 'Nekatere stvari nosimo. Druge nosijo nas.',
    poziv: 'V Unikatni kotiček',
  },
  {
    id: 'zeliscni',
    naslov: 'Zeliščni kotiček',
    podnaslov: 'Ustvarjeno iz darov narave',
    besedilo:
      'Zeliščni kotiček je prostor, kjer se vračamo k naravi. V ponudbi so skrbno izbrana zelišča, nabrana z občutkom in spoštovanjem do narave.',
    poziv: 'V Zeliščni kotiček',
  },
  {
    id: 'energijski',
    naslov: 'Energijski kotiček',
    podnaslov: 'Podpora telesu in notranjemu ravnovesju',
    besedilo: 'Energijska podpora, reiki, pregled energetskih centrov in Kansa masaža obraza.',
    poziv: 'V Energijski kotiček',
  },
];

export const nakit = {
  uvod: 'Nekatere stvari nosimo. Druge nosijo nas.',
  majhen: ['Nakit je majhen.', 'A lahko nosi ogromno.'],
  pomeni: ['Spomin na človeka.', 'Pomemben trenutek.', 'Novo poglavje.', 'Obljubo sebi.'],
  pomeniKonec: 'Nekaj, česar si ne želimo nikoli pozabiti.',
  odstavki: [
    'Moj nakit je ustvarjen z namenom. Ne kot še en modni dodatek, ampak kot nekaj osebnega.',
    'Vsak moj kos nastaja ročno. Noben ni narejen samo zato, da zapolni prostor v vitrini ali sledi trenutnemu trendu. Ustvarjen je z mislijo, da bo nekega dne pristal pri določeni osebi. Pri vas.',
    'Po želji ga lahko povežemo tudi z vašo namero – z občutkom ali sporočilom, ki ga želite nositi s seboj.',
  ],
  namere: ['Morda več miru.', 'Morda pogum.', 'Morda ljubezen.'],
  sepet: '»Ne pozabi nase.«',
  sklep: ['Lepota ni edina stvar, ki jo nosimo.', 'Nosimo tudi pomen.'],
};

// Cene in količine so iz OSNOVA.docx; pred objavo jih mora naročnica ponovno potrditi.
export interface Zelisce {
  ime: string;
  oznaka: string;
  opis: string;
  kolicina: string;
  cena: string;
  slika?: Slika;
}

const sestava = (spol: 'ž' | 'm') =>
  spol === 'ž' ? 'ročno nabrana • nežno sušena • brez dodatkov' : 'ročno nabran • nežno sušen • brez dodatkov';

export const zelisca = {
  uvod: 'Naša zelišča so skrbno nabrana v času, ko je njihova naravna moč in aroma najlepša.',
  besedilo:
    'Vsako rastlino naberemo z občutkom, jo nežno posušimo in shranimo tako, da ohrani svojo pristno barvo, vonj in značaj.',
  izbor: [
    {
      ime: 'Rman',
      oznaka: sestava('m'),
      opis: 'Drobni beli cvetovi in topel, rahlo grenak zeliščni okus z nežnimi cvetličnimi notami.',
      kolicina: '30 g',
      cena: '5,00 €',
      slika: { src: kosara, alt: 'Izrez začasne fotografije: beli cvetovi rmana v košari.', pozicija: '12% 82%' },
    },
    {
      ime: 'Lipa',
      oznaka: sestava('ž'),
      opis: 'Cvetovi, nabrani v polnem cvetenju in sušeni v senci. Nežna cvetlična aroma in blag, naravno sladkast pridih.',
      kolicina: '30 g',
      cena: '5,00 €',
    },
    {
      ime: 'Ognjič',
      oznaka: sestava('m'),
      opis: 'Živahni cvetovi za čaj nežnega cvetličnega okusa in čudovite zlato rumene barve.',
      kolicina: '30 g',
      cena: '5,00 €',
      slika: { src: kosara, alt: 'Izrez začasne fotografije: oranžni cvetovi ognjiča v košari.', pozicija: '47% 30%' },
    },
    {
      ime: 'Melisa',
      oznaka: sestava('ž'),
      opis: 'Svež limonasto-zeliščni vonj in nežen okus. Lepo se ujema z meto, lipo in kamilico.',
      kolicina: '30 g',
      cena: '5,00 €',
    },
    {
      ime: 'Materina dušica',
      oznaka: sestava('ž'),
      opis: 'Bogata zeliščna aroma z nežnimi cvetličnimi in rahlo pikantnimi notami.',
      kolicina: '30 g',
      cena: '5,00 €',
    },
    {
      ime: 'Kopriva',
      oznaka: sestava('ž'),
      opis: 'Listi, nabrani v času najboljše kakovosti in počasi sušeni, da ohranijo barvo, vonj in naraven značaj.',
      kolicina: '30 g',
      cena: '5,00 €',
    },
  ] satisfies Zelisce[],
  vsa: ['kopriva', 'lipa', 'bezeg', 'rman', 'črna detelja', 'materina dušica', 'meta', 'melisa', 'ognjič', 'trpotec'],
  // Stavek iz gradiva naročnice; ostane kot odgovorna opomba ob ponudbi.
  opomba:
    'Zelišča so del tradicionalne zeliščne uporabe in se uporabljajo kot podpora dobremu počutju, ne nadomeščajo medicinskega zdravljenja.',
};

export interface Snop {
  ime: string;
  oblika: string;
  opis: string;
  mera: string;
  cena: string;
  slika: Slika;
}

export const snopi = {
  naslov: 'Posušeni snopi zelišč',
  besedilo:
    'Izdelek je ohranjen v osnovni rastlinski obliki brez dodatkov ali predelave. Rastlinski deli so vezani v snop zaradi sušenja in skladiščenja.',
  izdelki: [
    {
      ime: 'Sivka',
      oblika: 'posušeni cvetovi, vezan snop',
      opis: 'Ročno nabrani cvetovi sivke, naravno posušeni in vezani v snop.',
      mera: '10 cm',
      cena: '8,00 €',
      slika: { src: sivka, alt: 'Začasna fotografija: snopa posušene sivke, povezana z modro vrvico.', pozicija: '60% 40%' },
    },
    {
      ime: 'Rožmarin',
      oblika: 'posušene vejice in listi, vezan snop',
      opis: 'Ročno nabrane vejice in listi rožmarina, naravno posušeni in vezani v snop.',
      mera: '10 cm',
      cena: '8,00 €',
      slika: { src: rozmarin, alt: 'Začasna fotografija: snop posušenega rožmarina, ovit z belo nitjo, na dlani.', pozicija: '50% 45%' },
    },
    {
      ime: 'Žajbelj',
      oblika: 'posušeni listi, vezan snop',
      opis: 'Ročno nabrani in naravno posušeni listi žajblja.',
      mera: '10 cm',
      cena: '8,00 €',
      slika: { src: zajbelj, alt: 'Začasna fotografija: snop posušenih listov žajblja, ovit z belo nitjo, v roki.', pozicija: '55% 50%' },
    },
  ] satisfies Snop[],
};

// Končna poimenovanja storitev uskladiti z naročnico (dokumenta uporabljata različne izraze).
// Opisi, potek, trajanje in cene še niso prejeti — ne dopolnjuj jih.
export const energija = {
  podnaslov: 'Podpora telesu in notranjemu ravnovesju.',
  storitve: ['Energijska podpora', 'Reiki', 'Pregled energetskih centrov', 'Kansa masaža obraza'],
};

export const kontakt = {
  naslov: 'Za informacije in naročila',
  besedilo:
    'Morda bo prav tukaj tudi tebe pričakala zgodba, ki bo našla pot v tvoje življenje.',
  // PROTOTIP: dejanski kontakt še ni prejet — ne izmišljaj e-pošte ali telefona.
  status: 'Kontaktni podatki bodo dodani po potrditvi.',
};
