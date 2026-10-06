// Preveri, ali je hero posnetek primeren za scrubbing (iskanje po sličicah med pomikanjem).
// Brez dodatnih paketov: prebere strukturo MP4 (ISO BMFF) in izpiše velikost, ločljivost,
// trajanje, kodek, razmik ključnih sličic, faststart in zvok.
//
// Uporaba: npm run preveri:video [-- pot/do/posnetka.mp4]
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const pot = process.argv[2] ?? join('public', 'video', 'hero-scroll.mp4');
const poster = join('public', 'video', 'hero-poster.avif');
const MB = (b) => `${(b / 1024 / 1024).toFixed(2)} MB`;

if (!existsSync(pot)) {
  console.log(`Posnetka ni: ${pot}`);
  console.log('Hero uporablja nadomestno fotografijo brez scroll prostora. Glej docs/NAPREDEK.md.');
  console.log(existsSync(poster) ? `Poster: ${poster} (${MB(statSync(poster).size)})` : `Posterja ni: ${poster}`);
  process.exit(0);
}

const buf = readFileSync(pot);
const VSEBNIKI = new Set(['moov', 'trak', 'mdia', 'minf', 'stbl', 'edts', 'dinf']);

function skatle(od, do_, cb, globina = 0) {
  let i = od;
  while (i + 8 <= do_) {
    let velikost = buf.readUInt32BE(i);
    const tip = buf.toString('latin1', i + 4, i + 8);
    let glava = 8;
    if (velikost === 1) {
      velikost = Number(buf.readBigUInt64BE(i + 8));
      glava = 16;
    } else if (velikost === 0) {
      velikost = do_ - i;
    }
    if (velikost < glava) break;
    cb(tip, i + glava, i + velikost, i, globina);
    if (VSEBNIKI.has(tip)) skatle(i + glava, i + velikost, cb, globina + 1);
    i += velikost;
  }
}

const vrh = [];
const sledi = [];
let film = {};
let sled = null;

skatle(0, buf.length, (tip, p, konec, zacetek, globina) => {
  if (globina === 0) vrh.push({ tip, zacetek });
  const v = buf[p];
  switch (tip) {
    case 'mvhd':
      film = v === 1
        ? { casovnaEnota: buf.readUInt32BE(p + 20), trajanje: Number(buf.readBigUInt64BE(p + 24)) }
        : { casovnaEnota: buf.readUInt32BE(p + 12), trajanje: buf.readUInt32BE(p + 16) };
      break;
    case 'trak':
      sled = { vrsta: '?', vzorci: 0, kljucne: null };
      sledi.push(sled);
      break;
    case 'mdhd':
      Object.assign(sled, v === 1
        ? { casovnaEnota: buf.readUInt32BE(p + 20), trajanje: Number(buf.readBigUInt64BE(p + 24)) }
        : { casovnaEnota: buf.readUInt32BE(p + 12), trajanje: buf.readUInt32BE(p + 16) });
      break;
    case 'hdlr':
      sled.vrsta = buf.toString('latin1', p + 8, p + 12);
      break;
    case 'stsd': {
      const e = p + 8;
      sled.kodek = buf.toString('latin1', e + 4, e + 8);
      if (sled.vrsta === 'vide') {
        sled.sirina = buf.readUInt16BE(e + 32);
        sled.visina = buf.readUInt16BE(e + 34);
      }
      break;
    }
    case 'stsz':
      sled.vzorci = buf.readUInt32BE(p + 8);
      break;
    case 'stss':
      sled.kljucne = buf.readUInt32BE(p + 4);
      break;
  }
});

const video = sledi.find((s) => s.vrsta === 'vide');
const zvok = sledi.some((s) => s.vrsta === 'soun');
const moov = vrh.find((b) => b.tip === 'moov');
const mdat = vrh.find((b) => b.tip === 'mdat');
const fragmentiran = vrh.some((b) => b.tip === 'moof');
const velikost = statSync(pot).size;

if (!video) {
  console.log('V datoteki ni video sledi ali je ni mogoče prebrati.');
  process.exit(1);
}

const sekunde = video.trajanje / video.casovnaEnota || film.trajanje / film.casovnaEnota;
const fps = video.vzorci / sekunde;
const kljucne = video.kljucne ?? video.vzorci; // brez stss so vse sličice ključne
const gop = video.vzorci / Math.max(kljucne, 1);
const faststart = moov && mdat ? moov.zacetek < mdat.zacetek : false;

console.log(`Posnetek:        ${pot}`);
console.log(`Velikost:        ${MB(velikost)} (${Math.round((velikost * 8) / sekunde / 1000)} kbit/s)`);
console.log(`Ločljivost:      ${video.sirina} × ${video.visina}`);
console.log(`Trajanje:        ${sekunde.toFixed(2)} s, ${video.vzorci} sličic (~${fps.toFixed(1)} fps)`);
console.log(`Kodek:           ${video.kodek}`);
console.log(`Ključne sličice: ${kljucne} (povprečno vsaka ${gop.toFixed(1)}. sličica, ${(gop / fps).toFixed(2)} s)`);
console.log(`Faststart:       ${faststart ? 'da (moov pred mdat)' : 'ne'}${fragmentiran ? ', fragmentiran MP4' : ''}`);
console.log(`Zvok:            ${zvok ? 'da' : 'ne'}`);
console.log(existsSync(poster) ? `Poster:          ${poster} (${MB(statSync(poster).size)})` : `Poster:          manjka (${poster})`);

const opozorila = [];
if (velikost > 8 * 1024 * 1024) opozorila.push('Datoteka je večja od 8 MB; za hero ciljaj na 3–6 MB.');
if (Math.max(video.sirina, video.visina) > 1920) opozorila.push('Ločljivost nad 1920 px ne izboljša videza, poveča pa velikost in čas dekodiranja.');
if (gop > 12) opozorila.push('Ključne sličice so redke: iskanje med pomikanjem bo zatikajoče. Uporabi -g 6 do -g 10 (ali vsako sličico ključno za najbolj gladko).');
if (!faststart && !fragmentiran) opozorila.push('Manjka faststart (-movflags +faststart): metapodatki so na koncu datoteke.');
if (zvok) opozorila.push('Posnetek ima zvočno sled; za hero ni potrebna (-an).');
if (sekunde > 12) opozorila.push('Posnetek je daljši od 12 s; pri scrollu se posamezni prizori odvrtijo prehitro.');
if (!['avc1', 'avc3'].includes(video.kodek)) opozorila.push(`Kodek ${video.kodek} ni H.264; za najširšo podporo uporabi H.264 (avc1) kot osnovni vir.`);

console.log('');
if (opozorila.length) {
  console.log('Opozorila:');
  opozorila.forEach((o) => console.log(`  - ${o}`));
} else {
  console.log('Posnetek je primeren za scrubbing.');
}
console.log('\nPredlagana priprava (ffmpeg):');
console.log('  ffmpeg -i izvor.mov -an -vf "scale=1920:-2,fps=30" -c:v libx264 -preset slow -crf 23 \\');
console.log('    -g 8 -keyint_min 8 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/video/hero-scroll.mp4');
console.log('  ffmpeg -i public/video/hero-scroll.mp4 -frames:v 1 -c:v libaom-av1 -still-picture 1 -crf 32 public/video/hero-poster.avif');
