# playdisputt.com

Landingssiden til [Disputt](https://disputt.site), et quizspill med uenighetsgaranti. Selve spillet ligger på <https://disputt.site> (repoet [Disputt](https://github.com/Pettersommerseth1994/Disputt)).

Dette er en statisk side som publiseres med GitHub Pages (`CNAME` = playdisputt.com). Farger, fonter, tegninger og animasjonen «Slik spiller dere» er kopiert fra spillet:

- `css/` (tokens, base, components, regler) og `assets/` (fonter, teksturer, avatarer, tegninger, logo)
- `js/regler/`, `js/i18n/`, `js/paths.js`, `js/vendor/`, `shared/avatars.mjs`: historien «Rundt bordet». `js/ui.js` er bare Avatar-komponenten fra spillet.
- `css/landing.css`, `js/landing.js` og `index.html` er selve siden. `da/index.html` og `sv/index.html` er den danske og svenske utgaven (laget av den norske siden ved å oversette hver tekst; lenkene til spillet og vilkårene får `?sprak=da` / `?sprak=sv`, så spillet ikke spør om språk en gang til).

Bildene i `img/` er lagt inn av eieren av siden. Kilde og lisens bør føres opp her.
