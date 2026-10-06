// Skupna točka za GSAP: plugin se registrira enkrat in samo v brskalniku.
// Vsi moduli uvažajo gsap od tukaj, zato je v bundlu en sam izvod.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  // Mobilna naslovna vrstica med pomikanjem ne sproži ponovnega merjenja.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const MEDIJ = {
  gibanje: '(prefers-reduced-motion: no-preference)',
  zmanjsano: '(prefers-reduced-motion: reduce)',
  namizje: '(min-width: 56rem)',
  miska: '(hover: hover) and (pointer: fine)',
} as const;

export { gsap, ScrollTrigger };
