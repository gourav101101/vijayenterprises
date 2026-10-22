# Website review — 22 October 2026

## Verdict

The hero is the strongest visual feature. The rest of the site is functional and consistent, but its service grid and process accordion are conventional. More hero effects alone will not make the whole experience feel distinctive. The next investment should be explaining services and demonstrating real work.

## What was tested

Local Chrome browser testing of the current source: 14 page routes, image loading, process accordion, service preselection, sample enquiry submission, unauthorized admin access, rejected cross-origin submissions, invalid form input, mobile navigation, and browser errors. All passed. The stored sample is local demo data, not a customer lead.

A separate visual audit covered 1440×900, 1366×768, 390×844, 375×667, and 844×390. Desktop and standard mobile passed the initial layout checks. The small phone hid the chapter navigation below its viewport and overlapped some copy with scene controls. Landscape had the same navigation-reachability problem with the pinned layout. These findings drove the short-screen corrections.

Previous dedicated 3D verification covered all chapters, direct selection, Blueprint view, rendering stopping at idle, reduced motion, missing WebGL and disabled JavaScript. This is not a real-device performance benchmark or a comprehensive accessibility audit.

## Applied in this review

- Removed the oversized decorative background word.
- Removed the generic opening eyebrow and repeated service names from the opening paragraph.
- Reduced the model caption to “Illustrative scene”.
- Removed the duplicate contact link from the chapter bar.
- Shortened chapter descriptions and the scroll instruction.
- Shortened the scroll journey while retaining all service chapters.
- Adjusted the short portrait layout to keep controls accessible.
- Used ordinary page scrolling with manual chapter selection on very short landscape screens.

## Recommended next work, in order

| Priority | Area | Concrete change | Why it matters |
| --- | --- | --- | --- |
| First | Services | Replace the four identical cards with one interactive service explorer: selected service, relevant visual, concise scope, and a direct enquiry action. Keep normal links and keyboard selection. | Carries the interactive identity beyond the hero and helps visitors understand the offering. |
| First | Work and credibility | Add approved site photos and two or three factual project stories: scope, location, challenge, work completed, and client-approved outcomes. | Real evidence builds trust that animation cannot provide. No invented logos, testimonials or numbers. |
| Next | Delivery process | Replace the text-only accordion with a compact assembly sequence: foundation, installation, connections, handover. Use simple SVG or CSS motion and preserve the text. | Explains how the company works without loading another 3D renderer. |
| Next | Enquiries | Offer a short first step asking service, location and project stage; show relevant follow-up fields after selection. Preserve validation and the existing inbox. | Makes the enquiry path feel tailored and less like a generic form. |
| Later | Service pages | Give each service a distinct diagram and practical “What we need from you” checklist, with a matching enquiry action. | Brings the inner pages closer to the homepage's quality. |
| Later | Hero refinement | Add subtle focus styling to the selected district and tune framing for tablets. Consider one keyboard-accessible hotspot per service, mirrored by the existing buttons. | Improves the relationship between the text and the model. Avoid filling the scene with labels. |

## Keep / avoid

Keep the light theme, clear headline, one primary action, normal navigation, readable text, manual chapter controls, and reduced-motion/fallback behavior. Keep the illustration disclosure concise.

Avoid another long pinned animation immediately below the hero, looping particles, autoplay audio, decorative counters, large loading screens, and motion on every paragraph. Each animation should explain a service or guide the next action.

## Recommended next design pass

Build the service explorer and visual delivery process together. Then add approved project evidence. This would improve the whole website more than adding another effect to the hero.
