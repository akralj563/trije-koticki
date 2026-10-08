# Napredek

Zadnja posodobitev: 8. 10. 2026. Faza: lokalni prototip, razširjen z gradivom naročnice (ni objavljeno, ni commita).

**Razširitev 8. 10. 2026 (novo gradivo naročnice)**

- Znamka: **Potovanje Življenja** (potrjeno z logotipom). Ime v glavi, nogi, naslovih strani in opisih. »Trije kotički« ostaja samo naslov sekcije. Strukturiranih podatkov ni.
- Logotip: `Kopija.jpeg` → `src/assets/brand/potovanje-zivljenja-logo.jpeg` (nespremenjen, servira se prek Astro `Image`, WebP). Prikazan v predstavitvenem pasu `ZnamkaPas.astro` na plošči v barvi ozadja logotipa (#ECDFCC); v glavi ostaja berljivo tekstovno ime.
- Kontakt: `potovanje.zivljenja@gmail.com` z `mailto:` (z vnaprej izpolnjeno zadevo) v kontaktu, nogi, delavnicah in pri vseh storitvah. Brez obrazca. `povezave.facebookUrl` je pripravljen in prazen; povezava se izriše samo, ko je vpisan potrjen URL.
- Delavnice: v heroju drugi poziv »Ustvarjalne delavnice« (→ `#delavnice`); takoj po heroju sekcija `Delavnice.astro` (dve kartici, sobote, brez predznanja, prijava po e-pošti, povezava na podstran). Nova stran `/delavnice/` (lektorirano iz `delavnica.docx`). Lokacija, cena, trajanje in termini niso navedeni, ker jih ni v gradivu.
- Energijski kotiček: reiki odstranjen iz ponudbe, navigacije in podatkov. Pet storitev v enem modelu (`energija.storitve` v `src/data/vsebina.ts`) in ena dinamična predloga `src/pages/energijski-koticek/[slug].astro` (`getStaticPaths`). Pregledna stran `/energijski-koticek/`. Domači blok vodi na podstrani. Dotik angela ima povezavi na Notranjo moč in Podporo in svetovanje.
- Navigacija: Delavnice · Unikatni kotiček · Zeliščni kotiček · Energijski kotiček · Kontakt (absolutne poti, delujejo tudi s podstrani).
- Nove komponente: `Delavnice`, `KarticeDelavnic`, `ZnamkaPas`, `PodstranUvod`, `PozivEposta`. `Zakljucek` ima `sKontaktom={false}` za podstrani (samo noga).
- Obstoječe uporabnikove spremembe (mobilni CSS v devetih datotekah) so ohranjene; datoteke so urejene le z dodatki.

**Uredniške odločitve pri besedilih storitev (preveri z naročnico)**

- Izpuščene zdravstvene navedbe: pri Dotiku angela »pogosti prehladi, viroze, vnetja in druge zdravstvene težave« ter »agresivno vedenje / vedenjske težave«; pri Kansa masaži učinki na limfo, toksine, stresne hormone, spanje, biokemija bakra in »energija Venere / plodnost«; pri Notranji moči in pregledu besedi »zdravje«. Seznam »priporočljiv pri« je preoblikovan v »starši se zanjo pogosto odločijo, ko otrok doživlja«.
- Dodana odgovorna opomba (po zgledu opombe pri zeliščih): »Energijske storitve so namenjene podpori dobremu počutju in ne nadomeščajo zdravniške, psihološke ali druge strokovne obravnave.«
- Izraza »terapija« in »terapevt« sta zamenjana s »podpora«, da besedilo ne nakazuje strokovnega naziva.
- Delavnice so v tikanju (kot izvirnik), storitve v vikanju; ženska oblika »ustvarila sama« je spremenjena v nevtralno.
- Odsek »Komu je namenjena« je pri Kansa masaži in Pregledu centrov izpeljan iz besedila, ni dobesedno v gradivu.

**Pred javno objavo dokazno potrditi** (v podatkih kot `potrditi`)

- Kansa: usposabljanje pri ge. Poloni Kršmanc Šiško in njeni nazivi (magisterij kineziologije, kvalificirana maserka, Indija, LCIC International Ayurvedic Centre London) ter soglasje za objavo njenega imena.
- Kansa: certifikat avtentičnosti pripomočka. Logotipov ustanov in fotografij certifikatov ni (niso priloženi).
- Brezplačen uvodni pogovor in brezplačna kratka podpora (Notranja moč, Pregled centrov).

**Slike naročnice** (`src/assets/narocnica/`, izluščene iz Wordovih dokumentov 8. 10. 2026, izvorni dokumenti niso spremenjeni)

| Datoteka | Izvor | Uporaba |
|---|---|---|
| `dotik-angela.jpeg` (359 × 640) | `(energiski kotiček) DOTIK ANGELA.docx` | Dotik angela, pregledna stran |
| `podpora-in-svetovanje.jpeg` (736 × 981) | `(energisjki kotiček) PODPORA IN SVETOVANJE.docx` | Podpora in svetovanje, pregledna stran |
| `notranja-moc.jpeg` (735 × 919) | `(energijski kotiček) ENERGIJSKA PODPORA.docx` | Notranja moč, pregledna stran |
| — | `(energijski kotiček) Kansa wand MASAŽA.docx` (1000 × 1000) | **Ni uporabljena**: videti je kot produktna/stock fotografija s prepoznavnim obrazom, vir in pravice niso znani. |

Vse tri uporabljene slike so videti kot slike s spleta ali generirane; vir in pravica uporabe nista znana. Na straneh so označene »Začasni vizual« in jih je treba pred objavo potrditi ali zamenjati. `Dotik angela` je majhna (359 px), zato je na namizju rahlo mehka. DOCX datoteke in posnetki e-pošte niso v projektu ali `public/`.

**Preverjeno (8. 10. 2026)**

- `npm run build`: uspešen, 8 strani, brez opozoril (prvi poskus je padel zaradi pomanjkanja sistemskega pomnilnika; ponovitev uspešna). `tsc --noEmit` (začasno prek `npx -p typescript@5`): brez napak (ne preverja `.astro` datotek).
- Pregled prek CDP (Edge headless; Chrome/Playwright ni nameščen) pri 390 × 844 in 1440 × 900 z `prefers-reduced-motion: reduce`, na `npm run preview`: vseh 8 strani brez vodoravnega overflowa, brez napak v konzoli, `noindex, nofollow` povsod, vse notranje povezave in sidra imajo cilj. Posnetki v `.pregled/razsiritev/` (v .gitignore).
- Ni preverjeno: animacije brez reduced motion na podstraneh, mobilni meni s petimi postavkami ob odpiranju, resnični telefon, odpiranje `mailto:` v poštnem odjemalcu.

**Odprta vprašanja (nova)**

- Točen URL Facebook strani »potovanje življenja« (vpiši v `povezave.facebookUrl`).
- Recepti (macerati, mazila, sirupi): dokumenti so prebrani, a **niso vgrajeni** — navodila za ta del niso bila prejeta (prompt je bil prekinjen), gradivo pa vsebuje zdravstvene navedbe in odmerke (npr. sirupi »pri kašlju ali prehladu«), ki po CLAUDE.md zahtevajo ločen vsebinski pregled.
- Lokacija, cena, trajanje in termini delavnic; cene, kraj in trajanje storitev (razen ~1 ure pri Notranji moči).
- Ali naj se opis znamke »ustvarjalnost · narava · ravnovesje« (delovni) zamenja z »Soul healing« iz logotipa ali drugim podnaslovom.
- Potrditev izpuščenih zdravstvenih navedb in dodane opombe.

**Prejšnje stanje (6. 10. 2026)**

- Okolje: Node 24.13.0, npm 11.6.2, Astro 7.3.5, TypeScript (strict), navaden CSS s spremenljivkami. Pisavi Newsreader in Figtree (Fontsource, SIL OFL, latin-ext). `gsap` 3.15 (ScrollTrigger); drugih animacijskih knjižnic ni.
- Domača stran: prosojna glava z mobilnim menijem, **celozaslonski hero s posnetkom, ki ga vodi pomikanje**, editorialna zgodba, trije kotički kot plasti, Unikatni kotiček, izbor šestih zelišč s ceno, trije snopi s ceno, štiri energijske storitve, skoraj celozaslonski zaključni del s kontaktom in noga.
- Komponente: `src/components/` (Glava, ScrollVideoHero, Zgodba, Koticki, Nakit, Zelisca, Snopi, Energija, Zakljucek, Motiv). Prejšnji `Uvod.astro` (obokana fotografija) je zamenjan s `ScrollVideoHero.astro`. Vsa vsebina in nastavitve heroja so v `src/data/vsebina.ts` (`uvod`, `heroVizual`).
- ~~Delovno ime »Trije kotički«~~ — od 8. 10. 2026 potrjeno ime Potovanje Življenja.
- Indeksiranje ostaja onemogočeno: meta `noindex, nofollow` v `src/layouts/Osnova.astro` in `public/robots.txt` (`Disallow: /`).

**Scroll hero (ScrollVideoHero.astro + src/scripts/scrollVideo.ts)**

- Ob buildu komponenta preveri, ali obstajata `public/video/hero-scroll.mp4` in `public/video/hero-poster.avif`. Manjkajoči datoteki se ne zahtevata (ni 404).
- **Scrub način** (posnetek obstaja, JS, brez reduced motion, brez Save-Data): kratek inline skript pred izrisom doda `html.hero-scrub`, zato je višina rezervirana od začetka (CLS 0). Zunanji prostor 290svh na namizju, 200svh na telefonu (`heroVizual.razdalja`); prizor je pripet s CSS `position: sticky` in visok 100svh (brez scroll hijackinga in brez GSAP pin-spacerja).
- ScrollTrigger preslika napredek (0–1) na ciljni čas posnetka. Ločena zanka na `gsap.ticker` (en rAF za vse animacije) posnetek zgladi proti cilju (`glajenje` 0,16, neodvisno od fps) in nastavi `currentTime` samo, ko prejšnje iskanje konča. Zanka se ustavi, ko je cilj dosežen.
- Posnetek se naloži šele po dogodku `load` (ne tekmuje s posterjem), v celoti kot blob za lokalno iskanje; če fetch ne uspe, neposredno z `preload="auto"`. HTML ima `preload="none"`, `muted`, `playsinline`, brez kontrolnikov in autoplaya; medij je `aria-hidden`. Za iOS je posnetek ob pripravi enkrat utišano zagnan in takoj ustavljen.
- Besedilo je prvih 18 % pomika polno vidno, do 50 % se dvigne in izgine (`autoAlpha`, zato skriti gumbi niso fokusabilni); kazalnik izgine takoj. Posnetek se rahlo približa (1,06 namizje, 1,03 telefon), zadnjih 20 % se spodnji del zlije v barvo naslednje sekcije.
- Fokus slike: `heroVizual.fokus` (ločeno za telefon in namizje). Medij sega čez `100dvh`, vsebina pa je omejena na `100svh`, zato CTA ni nikoli pod naslovno vrstico brskalnika.
- **Mirni način** (ni posnetka, reduced motion, Save-Data, brez JS ali napaka posnetka): poster oziroma trenutna fotografija, 100svh (raste z vsebino na zelo nizkih zaslonih), vsa vsebina takoj vidna, brez pripetja in dodatne višine. Na namizju (brez reduced motion) blag premik slike.
- Ob napaki posnetka modul odstrani scrub, povrne vse animacije in na novo izmeri strani.

**Gibanje (src/scripts/gibanje.ts, src/scripts/gsap.ts)**

- `gsap.ts`: ena registracija ScrollTriggerja (samo v brskalniku), skupni medijski pogoji. `gibanje.ts` je edina vstopna točka; en `gsap.matchMedia` z enim čiščenjem (brez podvojenih sprožilcev ali poslušalcev).
- Uvodni reveal hero naslova in besedila; reveali `data-razkrij` (navpično ali izmenično vodoravno `levo`/`desno`); stagger seznamov in kartic; zlaganje treh kotičkov (namizje); premik fotografij znotraj mask (manjši na telefonu); prehodi tona ozadja (peščena → žajbljeva → gozdna → kontaktna); nagib samo pri natančnem kazalcu; dvig gumbov ob hoverju (samo miška) in fokusu.
- Telefon: brez pripetih plasti, parallaxa dekoracije in nagiba; manjši premiki revealov.
- Brez JS je vsa vsebina vidna (varovalka 2,5 s). Pri reduced motion se nič ne animira.

**Preverjeno (6. 10. 2026)**

- `npm run build`: uspešen, 1 stran, brez napak in opozoril. Tipi: `tsc --noEmit` (začasno prek npx) brez napak. GSAP je v bundlu enkrat (en JS paket, ~116 kB nestisnjen).
- Chrome DevTools MCP ni bil uporabljen, ker Google Chrome ni nameščen. Pregled: Microsoft Edge headless prek CDP na `npm run preview`, posnetki v `.pregled/scroll/` in `.pregled/sekcije/` (v .gitignore).
- Scrubbing je bil preverjen s **sintetičnim testnim posnetkom** (testni vzorec s števcem sličic, ustvarjen lokalno s ffmpeg, 1920 × 1080, 8 s), ki je bil po pregledu odstranjen iz `public/`. Naprej in nazaj se čas ujema s pričakovanim (±0,05 s), po 40 hitrih zaporednih skokih se ustali na pravem času brez dolgih okvirjev, v mirovanju ni iskanj.
- 320 × 568, 390 × 844, 768 × 1024, 1440 × 900 in 1440 × 900 pri zoomu 125 %: ime, H1, razlaga, oba CTA in kazalnik nad pregibom (v obeh načinih); brez vodoravnega overflowa; CLS 0; glava nad herojem svetla, po njem temna.
- Reduced motion in Save-Data: ni scruba, ni zahteve za posnetek, hero 100svh, ni skritih elementov. Napaka posnetka (blokirana zahteva): samodejni prehod v mirni način, CLS 0.
- Mobilni meni: odpre, zapre po kliku in skoči na sekcijo, Esc zapre in vrne fokus. Tipkovnica: CTA ima viden obris (zarenje na temnem). Vse notranje povezave imajo cilj. Konzola brez napak (razen namerno blokiranega posnetka v testu napake).
- Ni preverjeno na resničnem telefonu (iOS Safari, Android Chrome); emulacija ne pokaže dejanskega obnašanja naslovne vrstice in dekodiranja.

**Datoteki, ki ju moraš dodati**

| Datoteka | Priporočilo |
|---|---|
| `public/video/hero-scroll.mp4` | H.264 (avc1), 1920 px širine ali manj, 6–10 s, 24–30 fps, brez zvoka, ključna sličica vsakih 6–10 sličic, faststart, 3–6 MB. Pomemben motiv blizu sredine kadra (telefon prikaže ozek pokončen izrez). |
| `public/video/hero-poster.avif` | Prva sličica posnetka (isti kader), AVIF, ~1920 px. |

Po dodajanju: `npm run preveri:video` izpiše velikost, ločljivost, trajanje, kodek, razmik ključnih sličic, faststart in zvok ter opozori na težave. Skripta izpiše tudi predlagana ukaza ffmpeg. Nato `npm run build` (prisotnost datotek se preveri ob buildu). Če kader zahteva drugo žarišče, spremeni `heroVizual.fokus`.

**Začasne fotografije (iz OSNOVA.docx, izvorni dokument ni spremenjen)**

Označene kot slike iz interneta za zamenjavo; vir in pravica uporabe nista znana. Pred produkcijo jih je treba vse zamenjati.

| Datoteka v `src/assets/prototip/` | Uporaba |
|---|---|
| `zelisca-uvod.jpg` (476 × 520) | nadomestni hero (dokler ni posnetka); izreza v plasti in izboru zelišč |
| `snopi.jpg` (325 × 581) | plast Zeliščni kotiček |
| `sivka.png`, `rozmarin.png`, `zajbelj.png` | snopi |

Hero fotografija je raztegnjena čez cel zaslon in je na namizju opazno mehka (476 px). Pod temnim prelivom je sprejemljiva za prototip, ne za objavo.

**Pred produkcijo zamenjati ali potrditi**

- Hero posnetek in poster (zgoraj); pregled scrubbinga na resničnih telefonih.
- Vseh pet fotografij in tri slike iz energijskih dokumentov, opis znamke, cene in količine, besedila (lektura, tikanje/vikanje), podatki iz razdelka »Pred javno objavo dokazno potrditi«.
- Ali je posnetek dejansko gradivo naročnice; dokler ni, ostane oznaka »Začasni vizual« (`heroVizual.oznaka`).
- Pred objavo: odstraniti noindex in `Disallow: /`, nastaviti `site`, odstraniti oznake začasnega gradiva.

**Odprti podatki**

- Ime ustvarjalke, domena (naročnik je še ne ureja), Facebook URL.
- Kontakt: telefon, kraj, poslovni podatki (e-pošta je potrjena).
- Nakit: fotografije, imena, materiali, dimenzije, cene.
- Zelišča: opisi za smilj in semena koprive, čaji, pregled zdravstvenih navedb (niso uporabljene); recepti (glej zgoraj).
- Energijske storitve: cene, kraj, trajanje (razen Notranje moči), potrditve iz razdelka zgoraj.
- Kdo bo urejal vsebino (vpliva na izbiro CMS).

**Naslednji korak**

1. Naročnici pokazati lokalni predogled (`npm run preview` → http://localhost:4321/, `/delavnice/`, `/energijski-koticek/`) in potrditi besedila storitev ter izpuščene navedbe.
2. Pridobiti Facebook URL, potrditve za Kansa in odločitev o receptih; nato podstran `/zeliscni-koticek/` in morebitni `/recepti/`.
3. Dodati `hero-scroll.mp4` in `hero-poster.avif` (če posnetek obstaja), zagnati `npm run preveri:video` in `npm run build`.
