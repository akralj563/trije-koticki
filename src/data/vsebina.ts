// Vsebina domače strani, povzeta po docs/IZVORNA-VSEBINA.md (OSNOVA.docx, kazalo).
// Besedila niso lektorirana; naročnica jih mora potrditi pred objavo.
// Zdravstvene navedbe, recepti in navodila uporabe namenoma NISO uporabljeni.

import type { ImageMetadata } from 'astro';
import kosara from '../assets/prototip/zelisca-uvod.jpg';
import snopiMiza from '../assets/prototip/snopi.jpg';
import sivka from '../assets/prototip/sivka.png';
import rozmarin from '../assets/prototip/rozmarin.png';
import zajbelj from '../assets/prototip/zajbelj.png';
// Uradni rastrski logotip, ki ga je dobavila naročnica (Kopija.jpeg). Ne riši ga na novo.
import logotip from '../assets/brand/potovanje-zivljenja-logo.jpeg';
// Slike, vdelane v Wordove dokumente energijskega kotička (glej docs/NAPREDEK.md, »Slike naročnice«).
// Vir in pravica uporabe nista znana, zato so označene kot začasni vizuali.
import slikaDotikAngela from '../assets/narocnica/dotik-angela.jpeg';
import slikaPodpora from '../assets/narocnica/podpora-in-svetovanje.jpeg';
import slikaNotranjaMoc from '../assets/narocnica/notranja-moc.jpeg';

// Ime znamke je potrjeno z logotipom naročnice. Opis je delovni in ga lahko naročnica spremeni.
export const znamka = {
  ime: 'Potovanje Življenja',
  opis: 'ustvarjalnost · narava · ravnovesje',
  logotip: {
    src: logotip,
    alt: 'Logotip Potovanje Življenja: ilustracija ženske v meditaciji z dvignjenimi rokami in svetlobo ter napis Potovanje Življenja, Soul Healing.',
  },
};

// Potrjen kontakt naročnice. Facebook: ime strani je znano (»potovanje življenja«), URL pa ne.
// Povezava se izriše samo, ko je facebookUrl vpisan s potrjeno vrednostjo — URL-ja ne ugibaj.
export const povezave: { eposta: string; facebookUrl?: string } = {
  eposta: 'potovanje.zivljenja@gmail.com',
  facebookUrl: undefined,
};

/** mailto: povezava z izpolnjeno zadevo sporočila. */
export const mailto = (zadeva?: string) =>
  `mailto:${povezave.eposta}${zadeva ? `?subject=${encodeURIComponent(zadeva)}` : ''}`;

// Absolutne poti, da navigacija deluje tudi na podstraneh.
export const navigacija = [
  { href: '/delavnice/', oznaka: 'Delavnice' },
  { href: '/#unikatni', oznaka: 'Unikatni kotiček' },
  { href: '/#zeliscni', oznaka: 'Zeliščni kotiček' },
  { href: '/energijski-koticek/', oznaka: 'Energijski kotiček' },
  { href: '/#kontakt', oznaka: 'Kontakt' },
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
    { href: '#delavnice', oznaka: 'Ustvarjalne delavnice' },
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
    besedilo:
      'Energijska podpora za odrasle in otroke, podpora in svetovanje, pregled energetskih centrov in Kansa Wand masaža.',
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

// Ustvarjalne delavnice — lektorirano po delavnica.docx (tikanje kot v izvirniku).
// Lokacija, cena, trajanje in prosti termini v gradivu niso podani; ne dopolnjuj jih.
export const delavnice = {
  naslov: 'Ustvarjalne delavnice',
  podnaslov: 'Ustvari nekaj svojega',
  uvod: 'Si želiš preživeti prijeten, sproščen in ustvarjalen čas ter ob tem ustvariti nekaj, kar bo res tvoje?',
  besedilo:
    'Pripravljam ustvarjalne delavnice, na katerih skupaj spoznavamo nove tehnike in naravne materiale ter pustimo domišljiji prosto pot.',
  vrste: [
    {
      id: 'mazilo',
      naslov: 'Izdelaj svoje mazilo',
      opis: 'Spoznaj naravne sestavine in osnove izdelave mazil ter si izdelaj svoje mazilo, ki ga odneseš domov.',
      motiv: 'list',
    },
    {
      id: 'nakit',
      naslov: 'Izdelaj svoj nakit',
      opis: 'Izberi najljubše materiale, barve in detajle ter ustvari unikaten kos nakita, ki bo samo tvoj – zase ali kot posebno darilo.',
      motiv: 'perle',
    },
  ] as const,
  komu: 'Delavnice so namenjene vsem, ki radi ustvarjate, raziskujete kaj novega in uživate v prijetnem druženju.',
  predznanje: 'Predznanje ni potrebno – pomembni sta le dobra volja in kanček ustvarjalnosti.',
  termin: 'Delavnice predvidoma potekajo ob sobotah.',
  poziv: 'Za termin, prijavo in več informacij mi piši.',
  sklep: 'Pridi, ustvarjaj, se sprosti in odnesi domov nekaj, kar je nastalo pod tvojimi rokami.',
  zadeva: 'Prijava na ustvarjalno delavnico',
};

// Energijski kotiček — pet aktivnih storitev (reiki je umaknjen iz ponudbe, 8. 10. 2026).
// Besedila so lektorirana in skrajšana po Wordovih dokumentih naročnice. Zdravstvene navedbe
// (npr. prehladi, virusi, toksini, hormoni) so namenoma izpuščene; glej docs/NAPREDEK.md.
// Cen, lokacije, razpoložljivosti in kvalifikacij, ki niso v gradivu, ne dopolnjuj.
export type StoritevSlug =
  | 'notranja-moc'
  | 'dotik-angela'
  | 'podpora-in-svetovanje'
  | 'pregled-energetskih-centrov'
  | 'kansa-wand-masaza';

export interface Odsek {
  naslov: string;
  odstavki?: string[];
  seznam?: string[];
  /** Zaporedni koraki (oštevilčen seznam). */
  koraki?: string[];
  /** Pari naslov–besedilo, npr. starostne skupine. */
  skupine?: { naslov: string; besedilo: string }[];
  /** Notranje povezave na druge storitve (slug). */
  povezave?: StoritevSlug[];
  /** Daljše besedilo, skrito za »Preberi več« (<details>). */
  vec?: { povzetek: string; odstavki: string[] };
}

export interface Storitev {
  slug: StoritevSlug;
  ime: string;
  /** Kratka oznaka za kartice in nadnaslov podstrani. */
  oznaka: string;
  /** Ena poved za kartico na domači in pregledni strani. */
  kratko: string;
  uvod: string;
  odseki: Odsek[];
  komu: string;
  poziv: { naslov: string; besedilo: string; zadeva: string };
  slika?: Slika;
  povezave: StoritevSlug[];
  /** Podatki iz gradiva, ki jih je treba pred javno objavo dokazno potrditi. */
  potrditi?: string[];
}

export const energija = {
  podnaslov: 'Podpora telesu in notranjemu ravnovesju.',
  uvod:
    'Nežni pristopi za več miru, sproščenosti in stika s seboj – za odrasle in za otroke. Vsaka storitev ima svojo stran z opisom in potekom.',
  opomba:
    'Energijske storitve so namenjene podpori dobremu počutju in ne nadomeščajo zdravniške, psihološke ali druge strokovne obravnave.',
  storitve: [
    {
      slug: 'notranja-moc',
      ime: 'Notranja moč',
      oznaka: 'Energijska podpora za odrasle',
      kratko: 'Potovanje k notranji moči in harmoničnemu ravnovesju.',
      uvod:
        'Energijska podpora »Notranja moč« je nežen, a poglobljen pristop, ki se posveča energijskim poljem telesa in uma ter pomaga sproščati napetosti.',
      slika: {
        src: slikaNotranjaMoc,
        alt: 'Silhueta ženske z razprtimi rokami pred žarečo zlato svetlobo in zvezdnim nebom.',
        pozicija: '50% 35%',
      },
      odseki: [
        {
          naslov: 'Vse, kar smo, je energija',
          odstavki: [
            'Ko so naši energijski tokovi v ravnovesju, se to odraža kot harmonija telesa, uma in duha. Takrat občutimo več vitalnosti, notranjega miru, odprtosti srca in jasnosti misli.',
            'Energijske blokade, stres in čustvene obremenitve se pogosto pokažejo tudi v počutju in kakovosti življenja. Energijska podpora pomaga sproščati napetosti, ponovno vzpostavljati pretočnost in nas vrača v stanje notranjega ravnovesja ter povezanosti s seboj.',
          ],
        },
        {
          naslov: 'Kako deluje',
          odstavki: [
            'Pristop izhaja iz razumevanja, da nas prežemajo energijski centri (čakre), avra in subtilna telesa, povezani z vsemi vidiki našega življenja.',
            'S pomočjo dotika, intuitivnih pristopov in naravnih energij se odkrivajo blokade in usklajujejo energijski tokovi. Tako se lahko uglasijo čustva, um in telo, kar prinese občutek sproščenosti, vitalnosti in globokega miru.',
            'Gre za celosten pristop, ki upošteva vse ravni bitja: fizično, čustveno, mentalno in duhovno.',
          ],
        },
        {
          naslov: 'Kako poteka',
          koraki: [
            'Posamezna energijska podpora traja približno eno uro.',
            'Priporočljivo je začeti z vsaj tremi zaporednimi srečanji, najbolje v 7 do 10 dneh, da se energija stabilizira in začne integrirati.',
            'Sledi 10-dnevni premor, v katerem se telo in energijski centri prilagodijo novemu ravnovesju.',
            'Po premoru skupaj določimo nadaljnje korake, prilagojene vašim potrebam.',
          ],
        },
      ],
      komu: 'Odraslim, ki si želijo več notranjega miru, sproščenosti in ponovnega stika s seboj in svojo notranjo močjo.',
      poziv: {
        naslov: 'Brezplačen uvodni pogovor',
        besedilo: 'Za brezplačen neobvezujoč pogovor in kratko brezplačno podporo mi pišite.',
        zadeva: 'Notranja moč – energijska podpora',
      },
      povezave: ['dotik-angela', 'podpora-in-svetovanje', 'pregled-energetskih-centrov'],
      potrditi: ['Brezplačen pogovor in brezplačna kratka podpora (ponudba iz gradiva).'],
    },
    {
      slug: 'dotik-angela',
      ime: 'Dotik angela',
      oznaka: 'Energijska podpora za otroke',
      kratko: 'Nežna podpora otrokom za ravnovesje, mir in izražanje njihovih potencialov.',
      uvod:
        'V današnjem hitrem in stresnem vsakdanu tudi otroci potrebujejo podporo, ki jim pomaga ohranjati ravnovesje, se celostno razvijati ter izražati svojo ustvarjalnost in potenciale.',
      slika: {
        src: slikaDotikAngela,
        alt: 'Roka odraslega nežno drži drobno roko otroka v topli sončni svetlobi.',
        pozicija: '50% 55%',
      },
      odseki: [
        {
          naslov: 'Kdaj se starši odločijo zanjo',
          odstavki: [
            'Energijska podpora »Dotik angela« je podobna podpori »Notranja moč«, a je v celoti prilagojena otrokom – njihovi starosti, zmožnostim in potrebam. Starši se zanjo pogosto odločijo, ko otrok doživlja:',
          ],
          seznam: [
            'nemir ter težave s spanjem in sproščanjem,',
            'večjo občutljivost, jokavost in močno čustvovanje,',
            'jezo in razdražljivost,',
            'umikanje vase in težave pri izražanju čustev,',
            'izrazito potrebo po pozornosti,',
            'težave pri komunikaciji, navezovanju stikov in sklepanju prijateljstev,',
            'težave s koncentracijo, pozornostjo in učenjem.',
          ],
          povezave: ['notranja-moc'],
        },
        {
          naslov: 'Prilagojena otrokom vseh starosti',
          skupine: [
            {
              naslov: 'Otroci do 4. leta',
              besedilo:
                'Mlajši otroci podporo najlažje in najbolj sproščeno doživijo v udobju svojega doma, v prostoru, ki jim je domač – tudi med počitkom ali spanjem. Zato se pri njih podpora največkrat izvaja na daljavo.',
            },
            {
              naslov: 'Otroci od 4. do 10. leta',
              besedilo:
                'Podpora se lahko izvaja v živo ali na daljavo in je vedno prilagojena starosti in zmožnostim otroka. Pri izvedbi v živo z vizualizacijskimi zgodbicami, pesmicami ali glasbo poskrbim, da se otrok umiri in sprosti.',
            },
            {
              naslov: 'Otroci od 10. leta dalje',
              besedilo:
                'Podpora poteka podobno kot pri odraslih, način in čas pa se še vedno prilagodita otroku.',
            },
          ],
        },
        {
          naslov: 'Skrb zase je tudi skrb za otroka',
          odstavki: [
            'Ko skrbimo za otroka, najprej pomislimo nanj: na njegove potrebe, počutje, čustva in varnost. A zlahka pozabimo, da otrok najmočneje čuti svet skozi ljudi, ki so mu najbližje.',
            'Otroci ne spremljajo samo tega, kar govorimo. Opazujejo naše odzive, čutijo naše razpoloženje in se učijo skozi naš zgled. Ko si vzamete čas zase in poskrbite za svoj mir in ravnovesje, ustvarjate tudi bolj varen in podporen prostor za svojega otroka.',
            'Vaše ravnovesje ne pomeni, da morate biti popolni. Pomeni, da si dovolite ustaviti se, zadihati in ponovno priti v stik s sabo. Skrb zase ni sebičnost – je temelj, iz katerega lahko raste mirnejši in bolj povezan odnos z otrokom.',
          ],
          povezave: ['notranja-moc', 'podpora-in-svetovanje'],
        },
      ],
      komu: 'Otrokom vseh starosti in staršem, ki želijo svojemu otroku ponuditi nežno podporo pri ohranjanju ravnovesja.',
      poziv: {
        naslov: 'Pogovorimo se o vašem otroku',
        besedilo: 'Za več informacij in dogovor o načinu izvedbe mi pišite.',
        zadeva: 'Dotik angela – energijska podpora za otroke',
      },
      povezave: ['notranja-moc', 'podpora-in-svetovanje'],
    },
    {
      slug: 'podpora-in-svetovanje',
      ime: 'Podpora in svetovanje',
      oznaka: 'Pogovor in nežno usmerjanje',
      kratko: 'Prostor za vaše občutke, izzive in pot do notranjega ravnovesja.',
      uvod:
        'Včasih se znajdemo na razpotju: ne vemo, kako naprej, preplavljajo nas misli, strahovi ali čustva, ali pa si želimo spremembe, a ne vemo, kje začeti.',
      slika: {
        src: slikaPodpora,
        alt: 'Ženska v beli obleki sedi na skali in gleda sončni zahod nad dolino in jezerom.',
        pozicija: '50% 40%',
      },
      odseki: [
        {
          naslov: 'Kaj skupaj raziskujemo',
          odstavki: [
            'Skupaj raziskujemo, kaj vas obremenjuje, kaj vam jemlje energijo in kaj lahko spremenite, da boste lažje zaživeli v skladu s sabo in svojimi potrebami. Skozi pogovor, podporo in nežno usmerjanje ustvarjamo prostor, kjer lahko:',
          ],
          seznam: [
            'bolje razumete sebe in svoje potrebe,',
            'prepoznate vzorce, ki vas omejujejo,',
            'umirite misli in poiščete notranji mir,',
            'okrepite zaupanje vase,',
            'se soočite s strahovi, skrbmi in negotovostjo,',
            'izboljšate družinske, partnerske in prijateljske odnose,',
            'lažje sprejemate odločitve in poiščete novo življenjsko pot.',
          ],
        },
        {
          naslov: 'Ni vam treba vsega nositi sami',
          odstavki: [
            'Včasih je prvi korak k spremembi preprosto to, da se ustavite in si dovolite podporo.',
            'Podpora. Razumevanje. Nov pogled. Pot nazaj k sebi.',
          ],
          vec: {
            povzetek: 'Moja pot – pot nazaj k sebi',
            odstavki: [
              'Že od malih nog sem čutila, da sem drugačna. Zaznavala sem stvari, ki jih drugi niso, čutila globlje, kot sem znala ubesediti, in v sebi nosila vprašanja, na katera dolgo nisem poznala odgovorov: Kdo sem? Zakaj tako čutim? Kaj mi življenje želi pokazati?',
              'Odraščala sem v okolju, kjer za takšno občutljivost ni bilo veliko prostora. Zato sem tisto, kar je bilo tako zelo moje, potisnila globoko vase. Naučila sem se prilagajati, utišati notranji glas in živeti tako, kot se je od mene pričakovalo.',
              'Toda nekaterih delov sebe ne moremo za vedno utišati. Življenje me je – včasih nežno, drugič zelo boleče – začelo voditi nazaj k sebi. Danes vem, da moja pot ni bila pot stran od mene. Bila je pot, ki me je vodila domov.',
              'Ne prihajam iz popolnosti in ne le iz znanja, ki sem ga našla v knjigah. Prihajam iz življenja: iz lastnih izkušenj, preizkušenj, padcev in ponovnih vstajanj. Iz tega prostora danes podpiram druge – nežno, brez obsojanja in z globokim spoštovanjem do vsake življenjske zgodbe.',
              'Včasih ne potrebujemo nekoga, ki nam pove, kako moramo živeti. Potrebujemo nekoga, ki nas za trenutek ustavi, nas resnično vidi in nam pomaga ponovno zaslišati tihi glas v sebi.',
            ],
          },
        },
      ],
      komu: 'Vsem, ki si želite bolje razumeti sebe, izboljšati odnose z drugimi in v svoje življenje vnesti več miru, sprejemanja in zadovoljstva.',
      poziv: {
        naslov: 'Morda je vaša pot nazaj k sebi bližje, kot si mislite',
        besedilo: 'Dovolite si podporo in mi pišite.',
        zadeva: 'Podpora in svetovanje',
      },
      povezave: ['notranja-moc', 'pregled-energetskih-centrov'],
    },
    {
      slug: 'pregled-energetskih-centrov',
      ime: 'Pregled energetskih centrov',
      oznaka: 'Čakre in ravnovesje vaše energije',
      kratko: 'Pregled z nihalom za vpogled v trenutno energijsko stanje.',
      uvod:
        'Vsak človek je več kot le fizično telo. Skozi nas teče življenjska energija, ki vpliva na naše počutje, odnose, ustvarjalnost in osebni razvoj.',
      odseki: [
        {
          naslov: 'Ko energija ne teče svobodno',
          odstavki: [
            'Ko energija teče svobodno in uravnoteženo, občutimo notranji mir, vitalnost, jasnost misli in povezanost s seboj. Kadar pride do energijskih blokad, neravnovesij ali preobremenjenosti, se lahko pojavijo utrujenost, nemir, nezadovoljstvo ali čustvene stiske.',
            'Z energijskim pregledom z nihalom lahko preverimo delovanje vaših energijskih centrov – čaker, pretok življenjske energije in področja, kjer energija ne teče optimalno.',
          ],
        },
        {
          naslov: 'Kako poteka pregled z nihalom',
          odstavki: ['Nihalo je občutljivo energijsko orodje, ki pomaga zaznavati vibracije in energijska stanja. Med pregledom se preveri:'],
          seznam: [
            'odprtost in pretočnost vseh čaker,',
            'stopnja energijske aktivnosti posameznih centrov,',
            'morebitne energijske blokade in obremenitve,',
            'energijsko ravnovesje telesa,',
            'stanje avre in energijskega polja,',
            'pretok življenjske energije skozi telo,',
            'povezava med telesnim, čustvenim, mentalnim in duhovnim nivojem.',
          ],
        },
        {
          naslov: 'Kaj dobite',
          odstavki: [
            'Na podlagi pregleda dobite vpogled v trenutno energijsko stanje ter usmeritve za vzpostavljanje večjega ravnovesja in harmonije.',
            'V hitrem tempu življenja pogosto pozabimo prisluhniti sebi. Pregled je priložnost, da se ustavite, pogledate globlje vase in razumete, kje izgubljate energijo in katera področja kličejo po pozornosti.',
          ],
        },
      ],
      komu: 'Vsem, ki želite bolje razumeti svoje trenutno energijsko stanje in poiskati pot do večjega ravnovesja.',
      poziv: {
        naslov: 'Prisluhnite svoji energiji',
        besedilo: 'Za več informacij in brezplačen neobvezujoč pogovor mi pišite.',
        zadeva: 'Pregled energetskih centrov',
      },
      povezave: ['notranja-moc', 'podpora-in-svetovanje'],
      potrditi: ['Brezplačen neobvezujoč pogovor (ponudba iz gradiva).'],
    },
    {
      slug: 'kansa-wand-masaza',
      ime: 'Kansa Wand masaža',
      oznaka: 'Masaža obraza',
      kratko: 'Starodavna modrost za sodobno ravnovesje – ritual vračanja k sebi.',
      uvod:
        'Kansa Wand masaža je masaža obraza s tradicionalnim pripomočkom iz kovine kansa. Ni le dotik kože, temveč ritual umiritve in vračanja k sebi.',
      odseki: [
        {
          naslov: 'Kaj je kansa',
          odstavki: [
            'Kansa je tradicionalna zlitina bakra in kositra, ki v indijski tradiciji velja za sveto kovino. Je koži prijazen material, ki ne oksidira in je odporen proti koroziji.',
            'Zaradi dobre toplotne prevodnosti bakra drsenje pripomočka po koži hitro ustvari prijeten občutek topline.',
          ],
        },
        {
          naslov: 'Kako jo lahko doživite',
          odstavki: [
            'Masaža je namenjena globoki sprostitvi obraza in vratu. Po masaži je koža lahko bolj sveža, gladka in prožna, telo pa iz napetosti lažje preide v stanje sproščenosti in miru.',
          ],
        },
        {
          naslov: 'Moje znanje in pristop',
          odstavki: [
            'Znanje sem pridobila pri ge. Poloni Kršmanc Šiško, magistrici znanosti s področja kineziologije in kvalificirani maserki, ki se je Kansa masaže obraza učila v Indiji in znanje nadgradila na LCIC International Ayurvedic Centre v Londonu.',
            'Pri delu združujem znanje, občutek za telo in spoštovanje do tradicionalnih tehnik.',
            'Moj pripomoček Kansa Wand je ročno izdelan v družinskem podjetju v Indiji z dolgoletno tradicijo in ima certifikat avtentičnosti.',
          ],
        },
      ],
      komu: 'Vsem, ki si želite sprostitve, nege obraza in trenutka zase.',
      poziv: {
        naslov: 'Rezervirajte svoj termin',
        besedilo: 'Za termin in dodatne informacije mi pišite.',
        zadeva: 'Kansa Wand masaža – termin',
      },
      povezave: ['notranja-moc', 'pregled-energetskih-centrov'],
      potrditi: [
        'Navedba usposabljanja pri ge. Poloni Kršmanc Šiško in njenih nazivov (magisterij, kvalifikacija, LCIC London).',
        'Certifikat avtentičnosti pripomočka Kansa Wand.',
      ],
    },
  ] satisfies Storitev[],
};

export const storitev = (slug: StoritevSlug) => energija.storitve.find((s) => s.slug === slug)!;
export const urlStoritve = (slug: StoritevSlug) => `/energijski-koticek/${slug}/`;

export const kontakt = {
  naslov: 'Za informacije in naročila',
  besedilo:
    'Morda bo prav tukaj tudi tebe pričakala zgodba, ki bo našla pot v tvoje življenje.',
  poziv: 'Piši mi za informacije, termin ali naročilo.',
};
