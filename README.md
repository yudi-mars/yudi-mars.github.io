# Di Yu — Academic Homepage

An English academic homepage based on the original [Academic Homepage Template](https://github.com/w-r-s/academic-homepage-template). The Chinese CV supplies the factual record; the introduction and research summaries are written for an academic homepage rather than translated line by line.

## Preview

Open `index.html` directly, or run:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Visit http://127.0.0.1:8080. No build or dependencies are required.

## Design and content

The original `stylesheet.css` is unchanged. The page restores the template’s 800px layout, image-and-text publication rows, yellow paper highlights, compact author lists, topic filters, rotating project cloud, experience rows, custom cursors, and mountain footer. `profile.css` contains the original inline styles plus content and responsive layout fixes.

The Publications section features Frequency Matching, MASI, ECC-SNN, and EC-SNN as illustrated cards. All eleven other published papers appear in an always-visible standard list below, in reverse chronological order, with titles, full author lists, and publication venues. Topic filters, the featured-paper count, the four unused illustrated cards, and the manuscript list are retained in the source but hidden. SOUL and DaisyRec retain their visual project entries. Full patent and software registration details remain in the downloadable Chinese CV rather than being reproduced as a translated CV on the homepage.

## Files

- `index.html`: English homepage content, publication metadata, and project links.
- `stylesheet.css`: original template stylesheet.
- `profile.css`: extracted template styles and responsive adjustments.
- `homepage.js`: filtering, author expansion, copy actions, navigation, and project-cloud animation. Motion stops for reduced-motion preferences, keyboard focus, hover, and offscreen content.
- `files/Di-Yu-CV-zh.pdf`: original Chinese CV, explicitly labeled as Chinese.
- `images/research/`: actual research figures, not the template’s unrelated example images.
- `images/profile/monogram.svg`: name monogram; replace with a personal photo when available.
- `images/experience/logos/`: official school and employer logos, with consistent responsive display sizes. Asset sources and presentation notes are recorded in `SOURCES.md` in that directory.

## Figure sources

- `frequency-matching.png`: ICML 2026 manuscript, `fig2_22.pdf`.
- `masi.png`: MASI overview figure.
- `ecc-snn.png`: ECC-SNN overview figure.
- `fedlec.png`: federated SNN learning framework.
- `spiking-recommendation.png`: sequential recommendation framework.
- `ec-snn.png`: EC-SNN overview figure.
- `soul.png`: SOUL repository, `assets/overview.png`.
- `daisyrec.png`: [DaisyRec repository](https://github.com/yudi-mars/daisyRec/blob/dev/images/framework.png), `images/framework.png`.

PDF figures were rasterized without changing their content. These are research illustrations, not generated results. Publication status and author order follow the supplied CV. Missing paper URLs are not guessed. School and employer labels use established English names, including [SMU’s MITB](https://www.smu.edu.sg/education/postgraduates) and [Cardinal Operations](https://copt.shanshu.ai/).

## Editing

Add featured papers as `tr.publication-card[data-tags]` entries. Filter counts update automatically. Use the original `background-color: lightyellow` style to highlight first-author work. Update other published papers inside `#other-publications > ol`; the manuscript list remains in its separate hidden `details` block. Add or remove ordinary links inside `#tagcloud-container` to update the project cloud; they remain usable without JavaScript.

To restore the publication filters, remove `hidden` from `#tagFilter` and `#publication-count`. To promote a deferred paper to a featured card, remove both `hidden` and `data-deferred` from its row and remove the corresponding entry from Other Publications to avoid duplication; restore its project-cloud link the same way if present. Deferred rows are excluded from filtering so a filter or project link cannot reveal them accidentally. Remove `hidden` from the manuscript `details` element to show that list again. All text, images, styles, and interaction code remain available.

The page is local source code; no deployment has been performed.
