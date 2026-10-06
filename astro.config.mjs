// @ts-check
import { defineConfig } from 'astro/config';

// Produkcijska domena (`site`) še ni nastavljena; določimo jo pred objavo.
// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      fs: {
        // Delovno gradivo (docs, navodila) ne sme biti dosegljivo niti na razvojnem strežniku.
        // Prvi štirje vzorci so Vitove privzete vrednosti.
        deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/docs/**', '**/*.md', '**/01-PRVI-PROMPT.txt'],
      },
    },
  },
});
