// Gibanje domače strani (GSAP + ScrollTrigger) — edina vstopna točka za vse animacije.
// Načela: vsebina je vidna brez JS; animiramo transform in opacity; vsak element ima največ eno
// animacijo; brez neskončnih animacij. Pri prefers-reduced-motion: reduce se ne izvede nič
// (vse je takoj vidno, brez scrubbinga, pripetja, parallaxa ali nagiba). Na telefonu so premiki manjši.
//
// Oznake v HTML:
//   data-uvod, data-uvod-vrstica   uvodni reveal hero besedila
//   data-razkrij[="levo"|"desno"]  enkratni reveal ob prihodu na zaslon (navpično ali vodoravno)
//   data-stagger                    zaporedni reveal otrok (seznami, kartice)
//   data-plast                      zlaganje kartic treh kotičkov (namizje)
//   data-globina="n"                počasnejši premik dekoracije (namizje)
//   data-globina-slika              premik fotografije znotraj maske
//   data-nagib                      blag nagib ob premiku miške (samo natančen kazalec)
import { gsap, ScrollTrigger, MEDIJ } from './gsap';
import { heroGibanje } from './scrollVideo';

type Pocisti = (() => void) | void | undefined;

let mm: gsap.MatchMedia | null = null;

const vsi = <T extends Element = HTMLElement>(sel: string, koren: ParentNode = document) =>
  Array.from(koren.querySelectorAll<T & HTMLElement>(sel));

const zdruzi = (...p: Pocisti[]) => () => p.forEach((f) => f?.());

function pocisti() {
  mm?.revert();
  mm = null;
  document.documentElement.classList.remove('ton-aktiven');
}

function uvodniReveal() {
  const vrstice = vsi('[data-uvod-vrstica]');
  const ostalo = vsi('[data-uvod]');

  const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.3 } });
  if (vrstice.length) tl.fromTo(vrstice, { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.11 }, 0.1);
  if (ostalo.length) tl.fromTo(ostalo, { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 1 }, 0.4);

  // Začetna stanja so nastavljena (fromTo), zato lahko CSS-skrivanje odstranimo.
  document.documentElement.classList.remove('uvod-caka');
}

function razkrivanje(namizje: boolean) {
  const pomik = namizje ? 36 : 22;
  const vodoravno = namizje ? 56 : 18;

  vsi('[data-razkrij]').forEach((el) => {
    const smer = el.dataset.razkrij;
    const od = smer === 'levo' ? { x: -vodoravno } : smer === 'desno' ? { x: vodoravno } : { y: pomik };
    gsap.from(el, {
      ...od,
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
      y: pomik * 0.85,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: namizje ? 0.09 : 0.06,
      scrollTrigger: { trigger: seznam, start: 'top 85%', once: true },
    });
  });
}

// Prehodi ozadij: fiksne plasti se zlijejo, ko vstopi ustrezni del strani.
function atmosfera() {
  const pari: [string, string][] = [
    ['.atmosfera__nakit', '#unikatni'],
    ['.atmosfera__zelisca', '#zeliscni'],
    ['.atmosfera__energija', '#energijski'],
    ['.atmosfera__kontakt', '#kontakt'],
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
}

// Fotografija se znotraj maske premakne za nekaj odstotkov; na telefonu manj.
function slikeVMaskah(namizje: boolean) {
  const v = namizje ? 4 : 2;
  vsi('[data-globina-slika]').forEach((el) => {
    const maska = el.closest('.okvir') ?? el;
    gsap.fromTo(
      el,
      { yPercent: -v, scale: 1.12 },
      { yPercent: v, scale: 1.12, ease: 'none', scrollTrigger: { trigger: maska, start: 'top bottom', end: 'bottom top', scrub: true } },
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

  mm.add(
    { gibanje: MEDIJ.gibanje, namizje: MEDIJ.namizje, miska: MEDIJ.miska },
    (ctx) => {
      const { gibanje, namizje, miska } = ctx.conditions as Record<'gibanje' | 'namizje' | 'miska', boolean>;
      if (!gibanje) return;

      uvodniReveal();
      razkrivanje(namizje);
      slikeVMaskah(namizje);
      const odstrani = zdruzi(atmosfera(), heroGibanje({ namizje }), miska ? nagib() : undefined);
      if (namizje) {
        plasti();
        globina();
      }
      return odstrani;
    },
  );

  // Pri omejenem gibanju ali brez ujemanja nikoli ne pusti uvoda skritega.
  document.documentElement.classList.remove('uvod-caka');

  // Pisave spremenijo višine besedil; po nalaganju enkrat na novo izmerimo sprožilce.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

zazeni();
// Če projekt kasneje doda Astro ClientRouter: ob menjavi strani počisti in ponovno zaženi.
document.addEventListener('astro:before-swap', pocisti);
document.addEventListener('astro:after-swap', zazeni);
