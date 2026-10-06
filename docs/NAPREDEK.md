# Napredek

Zadnja posodobitev: 6. 10. 2026. Faza: lokalni vizualni prototip domače strani (ni objavljeno).

**Narejeno**

- Okolje: Node 24.13.0, npm 11.6.2, Astro 7.3.5, TypeScript (strict), navaden CSS s spremenljivkami. Pisavi Newsreader in Figtree (Fontsource, SIL OFL, latin-ext za č, š, ž). Dodan `gsap` 3.15 (ScrollTrigger); Lenis in WebGL namenoma nista uporabljena.
- Domača stran je preoblikovana v uredniški prototip: prosojna glava z mobilnim menijem, hero z obokano fotografijo, editorialna zgodba, trije kotički kot plasti, ki se prekrivajo, Unikatni kotiček (tipografska kompozicija brez izdelkov), izbor šestih zelišč s ceno, trije posušeni snopi s ceno, štiri energijske storitve, zaključni CTA in noga.
- Komponente: `src/components/` (Glava, Uvod, Zgodba, Koticki, Nakit, Zelisca, Snopi, Energija, Zakljucek, Motiv). Vsa vsebina, cene in slike so v `src/data/vsebina.ts`. Gibanje je v `src/scripts/gibanje.ts`.
- Delovno ime »Trije kotički« z opisom »ustvarjalnost · narava · ravnovesje« (`znamka` v `vsebina.ts`, komentarji v Glava in Zakljucek). Ni potrjeno ime znamke.
- Odstranjeni: komponenti `Delovno` in `Herbarij`, pas »Lokalni prototip«, oznake »manjka gradivo«. Na strani ostaneta le značka »Začasni vizual« ob hero fotografiji in oznaka v nogi.
- Indeksiranje ostaja onemogočeno: meta `noindex, nofollow` v `src/layouts/Osnova.astro` in `public/robots.txt` (`Disallow: /`). `docs/` in `*.md` sta zaprta tudi na razvojnem strežniku.

**Začasne fotografije (iz OSNOVA.docx, izvorni dokument ni spremenjen)**

V gradivu so označene kot slike iz interneta za zamenjavo. Niso fotografije izdelkov naročnice, vir in pravica uporabe nista znana. Pred produkcijo jih je treba vse zamenjati.

| Datoteka v `src/assets/prototip/` | Izvor v DOCX | Uporaba |
|---|---|---|
| `zelisca-uvod.jpg` (476 × 520) | slika ob Zeliščnem kotičku | hero; izrez rmana v plasti Zeliščni kotiček; izreza rmana in ognjiča v izboru zelišč |
| `snopi.jpg` (325 × 581) | slika ob Posušenih snopih | pokončna fotografija v plasti Zeliščni kotiček |
| `sivka.png` (691 × 782) | sivka | krog v heroju; snop sivke |
| `rozmarin.png` (378 × 727) | rožmarin | snop rožmarina |
| `zajbelj.png` (465 × 471) | žajbelj | snop žajblja |

Slike imajo nizko ločljivost, zato niso raztegnjene čez ves zaslon. Za nakit in energijske storitve ni ustreznih fotografij; ti deli uporabljajo tipografijo, prelive in lastne SVG motive.

**Gibanje**

- Uvodni reveal: fotografija (opacity + rahlo skaliranje), vrstice naslova od spodaj, besedilo in CTA s staggerjem, krog s sivko.
- Hero ob scrollu: počasen premik in rahlo povečanje fotografije, besedilo se dvigne (samo namizje).
- Razkrivanje sekcij (`data-razkrij`) in stagger seznamov (`data-stagger`): opacity + transform, enkratno.
- Trije kotički: CSS sticky plasti; prejšnja plast se ob prihodu naslednje pomanjša na 0,92 in potemni (scrub, samo namizje).
- Globina: motivi in fotografije v plasteh ter obroč pri nakitu se premikajo počasneje od vsebine (samo namizje).
- Prehodi ozadij: fiksne barvne plasti (peščena → žajbljeva → globoka gozdna) se zlijejo med Unikatnim, Zeliščnim in Energijskim delom. Glava nad temnimi deli preklopi v temno različico.
- Nagib do 3° na hero fotografiji, motivu perl, fotografiji v plasti in fotografijah snopov, samo pri miški.
- Brez JS je vsa vsebina vidna (uvodno skrivanje ima varovalko 2,5 s). Pri `prefers-reduced-motion: reduce` se nič ne animira, plasti niso pripete, ni parallaxa ali nagiba. Na telefonu ni pin/parallaxa.

**Preverjeno**

- `npm run build`: uspešen, 1 stran, brez napak in opozoril. V `dist/` so samo stran, CSS, JS, pisave, slike, favicon in robots.txt.
- Chrome DevTools MCP ni dosegljiv, ker Google Chrome ni nameščen, `--executablePath` pa v trenutni seji ni nastavljiv. Pregled je bil narejen z Microsoft Edge v headless načinu prek CDP (skripta zunaj projekta), posnetki so v `.pregled/` (v .gitignore).
- 390 × 844 in 1440 × 1000: brez vodoravnega overflowa (tudi po pomikanju), vse notranje povezave imajo cilj, vseh 9 slik se naloži z določenimi dimenzijami, konzola brez napak (samo Edgeovo informativno sporočilo o lenem nalaganju slik).
- Mobilni meni: odpre se (`aria-expanded=true`), po kliku povezave se zapre in skoči na sekcijo, Esc ga zapre in vrne fokus na gumb.
- Reduced motion: naslov takoj viden, ni skritih ali premaknjenih elementov, plasti niso sticky, energijski del ima lastno temno ozadje.
- Posnetki so bili pregledani; popravljeni so izrezi zelišč, zamaknjeni SVG krogi, prekrivanje dekoracije v kontaktu in barva glave nad temnim delom.
- `astro check` ni nastavljen v projektu (zahteva dodatna paketa), zato ni bil zagnan.

**Pred produkcijo zamenjati ali potrditi**

- Vseh pet fotografij (zgoraj) z lastnimi fotografijami ali potrjenimi viri.
- Delovno ime »Trije kotički« in opis v glavi in nogi.
- Cene in količine zelišč (30 g / 5,00 €) ter snopov (10 cm / 8,00 €).
- Besedila: lektura, uskladitev tikanja/vikanja in jaz/mi. Hero naslov »Ustvarjeno s srcem, iz darov narave« in »Morda več miru« sta prirejena iz gradiva.
- Poimenovanja storitev (»Energijska podpora« ali »terapija«, »Pregled energetskih centrov (čaker)«).
- Pred objavo: odstraniti noindex in `Disallow: /`, nastaviti `site`, odstraniti značko »Začasni vizual« in oznako v nogi.

**Odprti podatki**

- Ime znamke in ustvarjalke, logotip, domena.
- Kontakt: e-pošta, telefon, kraj izvajanja storitev, način povpraševanja, poslovni podatki.
- Nakit: fotografije, imena, materiali, dimenzije, cene.
- Zelišča: opisi za smilj in semena koprive, ponudba čajev, dejanski recepti, pregled zdravstvenih navedb (niso uporabljene).
- Energijske storitve: opisi, potek, trajanje, cene, kraj.
- Kdo bo urejal vsebino (vpliva na izbiro CMS).

**Naslednji korak**

1. Pregled prototipa z naročnico (`npm run preview` → http://localhost:4321/ ali `npm run dev`).
2. Pridobiti ime, kontakt, lastne fotografije in fotografije nakita.
3. Nato podstran `/zeliscni-koticek/` z vsemi desetimi zelišči in snopi.
