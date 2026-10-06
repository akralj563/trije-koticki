// Hero, ki ga vodi pomikanje (ScrollVideoHero.astro).
//
// Scrub način: ScrollTrigger preslika napredek pomikanja skozi hero na ciljni čas posnetka (poceni,
// samo zapis števila). Ločena zanka na gsap.tickerju (en sam requestAnimationFrame za vse GSAP
// animacije) posnetek zgladi proti cilju in nastavi currentTime le, ko prejšnje iskanje konča.
// Zanka teče samo, dokler se trenutni čas ne ujame s ciljem.
//
// Mirni način (brez posnetka ali Save-Data): poster/fotografija, na namizju blag premik slike.
// Pri prefers-reduced-motion se ta modul ne zažene (glej gibanje.ts).
import { gsap, ScrollTrigger } from './gsap';

interface Faze {
  besediloOd: number;
  besediloDo: number;
  prehodOd: number;
}

interface Moznosti {
  namizje: boolean;
}

type Pocisti = () => void;

const PRIVZETE_FAZE: Faze = { besediloOd: 0.18, besediloDo: 0.5, prehodOd: 0.8 };
const NAJMANJSI_KORAK = 1 / 240; // s; manjših razlik ne iščemo

function preberiFaze(hero: HTMLElement): Faze {
  try {
    return { ...PRIVZETE_FAZE, ...JSON.parse(hero.dataset.faze ?? '{}') };
  } catch {
    return PRIVZETE_FAZE;
  }
}

function varcujePodatke() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return c?.saveData === true;
}

export function heroGibanje({ namizje }: Moznosti): Pocisti | undefined {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const video = hero.querySelector<HTMLVideoElement>('[data-hero-video]');

  if (!video || !video.dataset.src || varcujePodatke()) {
    document.documentElement.classList.remove('hero-scrub');
    return heroMirno(hero, namizje);
  }
  return heroScrub(hero, video, namizje);
}

function heroMirno(hero: HTMLElement, namizje: boolean): Pocisti | undefined {
  const medij = hero.querySelector('[data-hero-medij]');
  if (!namizje || !medij) return;
  const ctx = gsap.context(() => {
    gsap.fromTo(
      medij,
      { yPercent: 0 },
      { yPercent: 10, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } },
    );
  });
  return () => ctx.revert();
}

function heroScrub(hero: HTMLElement, video: HTMLVideoElement, namizje: boolean): Pocisti {
  const html = document.documentElement;
  const faze = preberiFaze(hero);
  const glajenje = Math.min(Math.max(Number(hero.dataset.glajenje) || 0.16, 0.02), 1);
  const vsebina = hero.querySelector('[data-hero-vsebina]');
  const kazalnik = hero.querySelector('[data-hero-kazalnik]');
  const prehod = hero.querySelector('[data-hero-prehod]');
  const medij = hero.querySelector('[data-hero-medij]');

  // Če je bil scrub izklopljen (npr. sprememba prefers-reduced-motion), ga vklopimo in na novo izmerimo.
  const dodanRazred = !html.classList.contains('hero-scrub');
  html.classList.add('hero-scrub');

  const nadzor = new AbortController();
  const { signal } = nadzor;
  let blobUrl: string | null = null;
  let trajanje = 0;
  let cilj = 0;
  let trenutni = 0;
  let tece = false;
  let napredek = 0;
  let koncano = false;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (st) => nastaviCilj(st.progress),
        onRefresh: (st) => nastaviCilj(st.progress),
        onToggle: (st) => hero.classList.toggle('je-aktiven', st.isActive),
      },
    });
    if (kazalnik) tl.to(kazalnik, { autoAlpha: 0, y: 10, duration: 0.06 }, 0.01);
    if (vsebina) {
      tl.to(
        vsebina,
        { autoAlpha: 0, y: namizje ? -64 : -32, ease: 'power1.in', duration: faze.besediloDo - faze.besediloOd },
        faze.besediloOd,
      );
    }
    if (medij) tl.fromTo(medij, { scale: 1 }, { scale: namizje ? 1.06 : 1.03, duration: 1 }, 0);
    if (prehod) tl.fromTo(prehod, { opacity: 0 }, { opacity: 1, duration: 1 - faze.prehodOd }, faze.prehodOd);
    tl.set({}, {}, 1); // časovnica je vedno dolga 1 = celoten napredek
  });

  function nastaviCilj(p: number) {
    napredek = p;
    if (!trajanje) return;
    // Zadnjo sličico držimo malo pred koncem, ker nekateri brskalniki pri currentTime = duration pokažejo črno.
    cilj = Math.min(p * trajanje, trajanje - 0.05);
    zazeniZanko();
  }

  function korak(_cas: number, dt: number) {
    const razlika = cilj - trenutni;
    if (Math.abs(razlika) < NAJMANJSI_KORAK) {
      trenutni = cilj;
    } else {
      // Glajenje, neodvisno od frekvence osveževanja zaslona.
      trenutni += razlika * (1 - Math.pow(1 - glajenje, dt / (1000 / 60)));
    }
    if (!video.seeking && Math.abs(video.currentTime - trenutni) >= NAJMANJSI_KORAK) {
      video.currentTime = trenutni;
    }
    if (trenutni === cilj && Math.abs(video.currentTime - cilj) < NAJMANJSI_KORAK) ustaviZanko();
  }

  function zazeniZanko() {
    if (tece || koncano) return;
    tece = true;
    gsap.ticker.add(korak);
  }

  function ustaviZanko() {
    if (!tece) return;
    tece = false;
    gsap.ticker.remove(korak);
  }

  function napaka() {
    if (koncano) return;
    // Posnetka ni mogoče uporabiti: brez pripetja in dodatne višine, vsa vsebina takoj vidna.
    pocisti();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  function pripravljen() {
    trajanje = video.duration;
    if (!Number.isFinite(trajanje) || trajanje <= 0) return napaka();
    cilj = trenutni = Math.min(napredek * trajanje, trajanje - 0.05);
    // iOS Safari izriše sličico po iskanju šele, ko je bil posnetek enkrat zagnan (utišan, takoj ustavljen).
    const zagon = video.play();
    const nastavi = () => {
      video.pause();
      video.currentTime = trenutni;
    };
    if (zagon) zagon.then(nastavi, nastavi);
    else nastavi();
  }

  video.addEventListener('loadedmetadata', pripravljen, { signal, once: true });
  video.addEventListener('error', napaka, { signal });
  video.addEventListener('seeked', () => {
    video.classList.add('je-pripravljen');
    if (Math.abs(video.currentTime - trenutni) >= NAJMANJSI_KORAK) zazeniZanko();
  }, { signal });

  // Celoten posnetek naložimo kot blob: iskanje po sličicah je nato lokalno in gladko.
  // Nalaganje začne po dogodku load, da ne tekmuje s posterjem in pisavami.
  async function nalozi() {
    const src = video.dataset.src!;
    try {
      const odgovor = await fetch(src, { signal });
      if (!odgovor.ok) throw new Error(`HTTP ${odgovor.status}`);
      const blob = await odgovor.blob();
      if (signal.aborted) return;
      blobUrl = URL.createObjectURL(blob);
      video.src = blobUrl;
    } catch {
      if (signal.aborted) return;
      video.preload = 'auto';
      video.src = src;
    }
  }

  if (document.readyState === 'complete') void nalozi();
  else window.addEventListener('load', () => void nalozi(), { signal, once: true });

  if (dodanRazred) requestAnimationFrame(() => ScrollTrigger.refresh());

  function pocisti() {
    if (koncano) return;
    koncano = true;
    ustaviZanko();
    nadzor.abort();
    ctx.revert();
    hero.classList.remove('je-aktiven');
    html.classList.remove('hero-scrub');
    video.classList.remove('je-pripravljen');
    video.pause();
    video.removeAttribute('src');
    video.load();
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    blobUrl = null;
  }

  return pocisti;
}
