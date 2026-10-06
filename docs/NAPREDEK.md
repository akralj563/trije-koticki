# Napredek

Zadnja posodobitev: 6. 10. 2026. Faza: lokalni vizualni prototip domače strani s scroll izkušnjo (ni objavljeno).

**Narejeno**

- Okolje: Node 24.13.0, npm 11.6.2, Astro 7.3.5, TypeScript (strict), navaden CSS s spremenljivkami. Pisavi Newsreader in Figtree (Fontsource, SIL OFL, latin-ext). `gsap` 3.15 (ScrollTrigger); drugih animacijskih knjižnic ni.
- Domača stran: prosojna glava z mobilnim menijem, **celozaslonski hero s posnetkom, ki ga vodi pomikanje**, editorialna zgodba, trije kotički kot plasti, Unikatni kotiček, izbor šestih zelišč s ceno, trije snopi s ceno, štiri energijske storitve, skoraj celozaslonski zaključni del s kontaktom in noga.
- Komponente: `src/components/` (Glava, ScrollVideoHero, Zgodba, Koticki, Nakit, Zelisca, Snopi, Energija, Zakljucek, Motiv). Prejšnji `Uvod.astro` (obokana fotografija) je zamenjan s `ScrollVideoHero.astro`. Vsa vsebina in nastavitve heroja so v `src/data/vsebina.ts` (`uvod`, `heroVizual`).
- Delovno ime »Trije kotički« (ni potrjeno ime znamke).
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
- Vseh pet fotografij, delovno ime in opis, cene in količine, besedila (lektura, tikanje/vikanje), poimenovanja storitev.
- Ali je posnetek dejansko gradivo naročnice; dokler ni, ostane oznaka »Začasni vizual« (`heroVizual.oznaka`).
- Pred objavo: odstraniti noindex in `Disallow: /`, nastaviti `site`, odstraniti oznake začasnega gradiva.

**Odprti podatki**

- Ime znamke in ustvarjalke, logotip, domena.
- Kontakt: e-pošta, telefon, kraj, način povpraševanja, poslovni podatki.
- Nakit: fotografije, imena, materiali, dimenzije, cene.
- Zelišča: opisi za smilj in semena koprive, čaji, pregled zdravstvenih navedb (niso uporabljene).
- Energijske storitve: opisi, potek, trajanje, cene, kraj.
- Kdo bo urejal vsebino (vpliva na izbiro CMS).

**Naslednji korak**

1. Dodati `hero-scroll.mp4` in `hero-poster.avif`, zagnati `npm run preveri:video` in `npm run build`.
2. Pregled na resničnem telefonu in z naročnico (`npm run preview` → http://localhost:4321/).
3. Pridobiti ime, kontakt, lastne fotografije in fotografije nakita; nato podstran `/zeliscni-koticek/`.
