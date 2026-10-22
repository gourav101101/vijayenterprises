# Vijay Enterprises — implementation handover

This is the working Energy Core concept website, using the demo contact/content requested by the owner. It is configured for private Sites hosting and is deliberately excluded from search indexing.

## Included

- Original Three.js infrastructure world with five scroll chapters, camera transitions, blueprint view, reduced-motion controls, and a photographic fallback.
- Responsive homepage and mobile navigation.
- Services index and four individual service pages.
- About, approach, safety, perspectives, two field-note articles, contact and privacy pages.
- Project, partnership and callback form modes with service preselection.
- Cloudflare D1 persistence, server validation, same-origin checks, honeypot and atomic hourly submission limits.
- Protected administrator content editor and demo enquiry inbox, including deletion.
- Local photography assets with source and licence credits.

## Run locally

Node.js 22.13+ is required. From this directory:

```powershell
npm ci
npm run dev
```

The preview starts at the Local URL printed by the server (normally http://127.0.0.1:5173).

The current workspace already has dependencies and the local schema installed. On a fresh checkout, build and initialise the local database:

```powershell
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_broad_retro_girl.sql
```

Apply each migration once; do not replay an already applied schema migration. Hosted migrations are applied by Sites when publishing. Local and hosted databases are separate.

For local admin testing only, put `SITE_ADMIN_EMAIL="seedy@sites.test"` in ignored `.dev.vars`, then visit `/signin-with-chatgpt?return_to=/admin`. This identity is provided only by the starter's loopback development simulator. Production uses Sites sign-in and the explicitly configured owner email.

If Windows' npm launcher cannot locate npm-cli.js, invoke npm directly using the installed Node.js path, e.g. `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run dev`. A project-local ignored npm wrapper was used for the Sites helper on this machine; it is not part of the deployed app.

## Where to edit

| File / location | Purpose |
| --- | --- |
| `app/lib/data.ts` | Default homepage copy, service descriptions, demo contacts and process content |
| `/admin` | Edit main homepage text and contact fields; review/delete demo enquiries |
| `app/globals.css` | Palette, typography, responsive layouts, transitions |
| `app/components/ScrollWorld.tsx`, `infrastructure-world.ts` | Scroll chapters, scene geometry, camera and rendering lifecycle |
| `app/components/HomeExperience.tsx` | Homepage sections and process interaction |
| `app/components/ContactForm.tsx` | Form presentation and submission states |
| `app/api/enquiries/route.ts` | Validation, rate limits, durable storage and cleanup |
| `app/lib/admin.ts` | Administrator allowlist and origin validation |
| `db/schema.ts`, `drizzle/` | Database schema and generated migrations |
| `public/images/CREDITS.md` | Image sources, photographers and usage notes |

The content editor is deliberately limited to the principal copy and contact fields. Service scope and article content are maintained in source. No third-party component/template has been represented as original artwork; the hero layout is custom code.

## Demo behaviour and production boundaries

The displayed `hello@example.com` is a placeholder. No phone/WhatsApp destination is invented. Those links appear when configured. Form success means a D1 demo record was saved, not that an email or WhatsApp notification was delivered. Email delivery and CRM integration are not configured.

The production administrator is the current Site owner's configured email, held in Sites environment settings. Access fails closed when that setting is missing or the signed-in user does not match. Signing in alone does not grant inbox access.

No file upload is enabled. Project photography is contextual and identified as such; the site does not claim fictional client work, credentials, awards, workforce numbers or project statistics. The concept imagery and descriptions require company review before a commercial launch.

Demo entries older than 90 days are removed when another accepted enquiry triggers cleanup; this is not a scheduled deletion guarantee. Admins may delete earlier. Rate-limit entries are transient hashed IP/window keys. No advertising analytics are installed.

Before commercial launch: replace demo content, confirm service scope/regions, add approved project evidence, configure sales notifications, review the privacy notice, decide retention and monitoring, configure domain and metadata, then intentionally enable indexing and the desired audience. Do not change visibility merely to test the site.

## Verification

```powershell
node node_modules/typescript/bin/tsc --noEmit
node scripts/verify-site.mjs
node scripts/verify-admin.mjs
npm run build
```

Browser scripts use the installed Chrome at the documented Windows path and a running preview at port 5173. They save screenshots and JSON results under ignored `outputs/`. Change the executable path for another OS. Admin tests require the local mock administrator setting above. Test data uses example.com addresses and stays in the local database.

The browser checks cover route availability, hero image loading, images, process selection, mobile navigation, horizontal overflow, service preselection, form persistence, origin validation, unauthorised access, CMS updates, deletion and rate limits. This is functional verification, not a complete independent accessibility or security audit.

## Scroll-driven 3D update

The homepage now uses an original geometric Three.js world rather than the old ray-marched Energy Core. Three.js loads in a separate dynamic chunk. There are no downloaded model or environment-map assets. Camera rendering is requested on scroll or interaction and stops after interpolation settles. DPR is capped at 1.35; shadows use a 1024px map. Canvas work is suspended offscreen.

Five chapters cover the vision, power, telecom, solar and civil. HTML chapter buttons also work by keyboard. Reduced-motion preferences and the manual motion control use a compact, manually selected scene. Failed or unavailable WebGL and JavaScript-disabled browsing retain a photo and normal service links. A skip link goes directly to all services.

The light theme, larger reading sizes, system fonts and demo-data boundaries remain. Models are explanatory illustrations and do not represent completed projects. There is no claimed universal performance score; low-end real devices still require field testing.

## Interactive services and guided enquiries

`ServiceExplorer.tsx` and `ServiceDiagram.tsx` power the homepage and services page: keyboard-accessible service tabs, original SVG illustrations, a photography switch, scope details, and service-prefilled enquiry links. `DeliveryProcess.tsx` powers the homepage and approach page with manually selected assembly stages; CSS transitions respect reduced-motion preferences and require no additional WebGL renderer.

The contact form now has project and contact steps. Native field checks apply before continuing; the existing server schema and abuse protections still apply on submission. Back navigation preserves typed fields. Service-specific brief prompts help visitors describe the work. Demo enquiries still persist to D1 without sending notifications.

Run `node scripts/verify-interactions.mjs` with the local preview running to check tab selection, keyboard navigation, image loading, guided-form validation and draft retention, actual demo submission, reduced motion, and mobile layouts. The script uses local demo data.
