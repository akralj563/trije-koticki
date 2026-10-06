// Gibanje domače strani (GSAP + ScrollTrigger).
// Načela: vsebina je vidna brez JS; animiramo transform in opacity; brez neskončnih animacij;
// pri prefers-reduced-motion: reduce se ne izvede nič (vse je takoj vidno, brez pin/parallax/nagiba).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GIBANJE = '(prefers-reduced-motion: no-preference)';
const NAMIZJE = '(min-width: 56rem) and (prefers-reduced-motion: no-preference)';
const MISKA = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

let mm: gsap.MatchMedia | null = null;

const vsi = <T extends Element = HTMLElement>(sel: string, koren: ParentNode = document) =>
  Array.from(koren.querySelectorAll<T & HTMLElement>(sel));

function pocisti() {
  mm?.revert();
  mm = null;
  document.documentElement.classList.remove('ton-aktiven');
}

function uvodniReveal() {
  const html = document.documentElement;
  const slika = vsi('[data-uvod-slika]');
  const vrstice = vsi('[data-uvod-vrstica]');
  const ostalo = vsi('[data-uvod]');
  const krog = vsi('[data-uvod-krog]');

  const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.4 } });
  if (slika.length) tl.fromTo(slika, { opacity: 0, scale: 1.06, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.9 }, 0);
  if (vrstice.length) tl.fromTo(vrstice, { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.12 }, 0.15);
  if (ostalo.length) tl.fromTo(ostalo, { y: 22, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.09, duration: 1.1 }, 0.5);
  if (krog.length) tl.fromTo(krog, { opacity: 0, scale: 0.86 }, { opacity: 1, scale: 1, duration: 1.5 }, 0.85);

  // Začetna stanja so nastavljena (fromTo), zato lahko CSS-skrivanje odstranimo.
  html.classList.remove('uvod-caka');
}

function razkrivanje() {
  vsi('[data-razkrij]').forEach((el) => {
    gsap.from(el, {
      y: 36,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  vsi('[data-stagger]').forEach((seznam) => {
    const otroci = Array.from(seznam.children);
    if (!otroci.length) return;
    gsap.from(otroci, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.09,
      scrollTrigger: { trigger: seznam, start: 'top 85%', once: true },
    });
  });
}

// Prehodi ozadij: fiksne plasti se zlijejo, ko vstopi ustrezni kotiček.
function atmosfera() {
  const pari: [string, string][] = [
    ['.atmosfera__nakit', '#unikatni'],
    ['.atmosfera__zelisca', '#zeliscni'],
    ['.atmosfera__energija', '#energijski'],
  ];
  const veljavni = pari.filter(([p, s]) => document.querySelector(p) && document.querySelector(s));
  if (!veljavni.length) return;

  document.documentElement.classList.add('ton-aktiven');
  veljavni.forEach(([plast, sekcija]) => {
    gsap.fromTo(
      plast,
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: { trigger: sekcija, start: 'top 85%', end: 'top 35%', scrub: true },
      },
    );
  });
  return () => document.documentElement.classList.remove('ton-aktiven');
}

function heroParallax() {
  const uvod = document.querySelector('.uvod');
  const slika = document.querySelector('[data-hero-slika]');
  if (!uvod || !slika) return;
  gsap.fromTo(
    slika,
    { yPercent: 0, scale: 1.08 },
    { yPercent: 7, scale: 1.12, ease: 'none', scrollTrigger: { trigger: uvod, start: 'top top', end: 'bottom top', scrub: true } },
  );
  const besedilo = uvod.querySelector('.uvod__besedilo');
  if (besedilo) {
    gsap.to(besedilo, { y: -50, ease: 'none', scrollTrigger: { trigger: uvod, start: 'top top', end: 'bottom top', scrub: true } });
  }
}

// Trije kotički: pripete plasti (CSS sticky); prejšnja plast se ob prihodu naslednje
// rahlo pomanjša in potemni — občutek globine brez zaklepanja scrolla.
function plasti() {
  const plasti = vsi('[data-plast]');
  plasti.forEach((plast, i) => {
    const naslednja = plasti[i + 1];
    if (!naslednja) return;
    const st = { trigger: naslednja, start: 'top bottom', end: 'top 25%', scrub: true };
    gsap.to(plast, { scale: 0.92, ease: 'none', scrollTrigger: st });
    const senca = plast.querySelector('.plast__senca');
    if (senca) gsap.to(senca, { opacity: 0.5, ease: 'none', scrollTrigger: { ...st } });
  });
}

function globina() {
  vsi('[data-globina]').forEach((el) => {
    const v = Number(el.dataset.globina) || 10;
    const sprozilec = el.closest('section, article') ?? el;
    gsap.fromTo(
      el,
      { yPercent: -v / 2 },
      { yPercent: v / 2, ease: 'none', scrollTrigger: { trigger: sprozilec, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });

  vsi('[data-globina-slika]').forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: -4, scale: 1.12 },
      { yPercent: 4, scale: 1.12, ease: 'none', scrollTrigger: { trigger: el.closest('article') ?? el, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });
}

// Subtilen nagib večjih vizualov, samo za miško.
function nagib() {
  const nadzor = new AbortController();
  vsi('[data-nagib]').forEach((el) => {
    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3.out' });
    el.addEventListener(
      'pointermove',
      (e) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 6);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
      },
      { signal: nadzor.signal },
    );
    el.addEventListener('pointerleave', () => { rx(0); ry(0); }, { signal: nadzor.signal });
  });
  return () => nadzor.abort();
}

function zazeni() {
  pocisti();
  mm = gsap.matchMedia();

  mm.add(GIBANJE, () => {
    uvodniReveal();
    razkrivanje();
    return atmosfera();
  });
  mm.add(NAMIZJE, () => {
    heroParallax();
    plasti();
    globina();
  });
  mm.add(MISKA, () => nagib());

  // Pri omejenem gibanju ali brez ujemanja nikoli ne pusti uvoda skritega.
  document.documentElement.classList.remove('uvod-caka');
}

zazeni();
// Če projekt kasneje doda Astro ClientRouter: ob menjavi strani počisti in ponovno zaženi.
document.addEventListener('astro:before-swap', pocisti);
document.addEventListener('astro:after-swap', zazeni);
