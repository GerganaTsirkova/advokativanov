# advokativanov.bg

Static website for "Адвокат Светломир Иванов" (Русе, България).

## Overview
The site is a fully static HTML/CSS/JS project optimized for:
- Local SEO (geo meta tags, structured data JSON-LD `LegalService`)
- Performance (no heavy frameworks, minimal JS)
- Accessibility & UX (consistent buttons, mobile-friendly navbar, scroll indicator)
- Legal compliance (privacy policy, terms, cookie consent banner)
- Branding consistency (gradient theme, glassmorphism accents)

## Structure
```
index.html                # Landing page
privacy.html               # Политика за поверителност
terms.html                 # Общи условия
404.html                   # Custom not-found page (GitHub Pages fallback)
robots.txt                 # Search engine crawl directives
sitemap.xml                # URL index for search engines
manifest.webmanifest       # Progressive enhancement / PWA metadata
security.txt               # Security contact disclosure
humans.txt                 # Human attribution file
CNAME                      # Custom domain mapping (advokativanov.bg)
css/style.css              # All custom design & overrides
js/main.js                 # AOS init, cookie consent, navbar collapse, scroll indicator
favicon.svg                # Primary site icon
images/                    # Service and hero images
service pages (multiple *.html)
```

## Deployment (GitHub Pages + Custom Domain)
1. Push repository to GitHub (`GerganaTsirkova/advokativanov`).
2. In repo settings -> Pages: Source = `main` branch, root (`/`), Save.
3. Ensure `CNAME` file contains: `advokativanov.bg` (already present).
4. DNS provider: create `CNAME` record `www` -> `GerganaTsirkova.github.io`; for apex domain use A records -> GitHub Pages IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
5. Wait for DNS propagation; verify via:
   ```bash
   nslookup advokativanov.bg
   nslookup www.advokativanov.bg
   ```
6. After Pages build, confirm HTTPS is enabled (enforce HTTPS toggle in Pages settings).

## Optional Enhancements
## Optional Enhancements (Implemented)
 - Analytics: Cookie-gated (localStorage key `cookieConsent`). Script loads only after acceptance (see `main.js`). Replace Plausible snippet with chosen provider if needed.
 - Service Worker: Implemented (`sw.js`) for offline fallback (`offline.html`) + asset caching.
 - Images: `<picture>` tags added on service cards for AVIF/WebP with JPG fallback. Generate optimized variants:
    ```bash
    # Bulk conversion (Linux/macOS) using ImageMagick
    for f in images/*.jpg images/*.jpeg; do \
       base="${f%.*}"; \
       magick "$f" -quality 65 "${base}.webp"; \
       magick "$f" -quality 50 "${base}.avif"; \
    done
    ```
    Commit the new `.webp` & `.avif` files to enable sources.

Displayed until user accepts/declines (stored in `localStorage` under key `cookieConsent`). Analytics script loads only after acceptance. No tracking before consent.
Update `sitemap.xml` after adding/removing pages and set `<lastmod>` to current date.

7. Verify service worker: DevTools > Application > Service Workers.
8. Test offline: open site, then toggle offline (DevTools Network) and reload.
## Cookie Consent
Displayed until user accepts/declines (stored in `localStorage` under key `cookieConsent`). Only essential cookies used now; integrate analytics behind acceptance later.

## Accessibility Notes
- SVGs include descriptive structure; consider adding `aria-label` or `<title>` for icons.
- Color contrast verified for primary gradients on dark background.

## Development
No build step required. Edit files directly and commit.
Recommended editor settings:
- UTF-8 encoding
- LF line endings

## License / Rights
Content proprietary to Адвокат Светломир Иванов. Do not redistribute without permission.

## Contact
Email: `swet_m@abv.bg`
Phone: `+359 888 411 957`
Location: Русе, България
