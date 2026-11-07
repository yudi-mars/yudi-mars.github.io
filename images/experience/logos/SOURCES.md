# Experience logos

Downloaded from the institutions' official websites on November 7, 2026. These assets identify education and employment affiliations; ownership remains with the respective institutions.

| Local file | Official source |
| --- | --- |
| `zju.svg` | [Zhejiang University, homepage SVG](https://www.zju.edu.cn/_upload/tpl/0b/bf/3007/template3007/static/media/mlogo.66388675484ae2a807b2ad65b1d31ca9.svg) |
| `smu.svg` | [Singapore Management University, School of Computing and Information Systems](https://computing.smu.edu.sg/themes/smubase_5g/assets/site-headers/logo-smu-d.svg?revised=20251228) |
| `sufe.png` | [Shanghai University of Finance and Economics, English homepage](https://english.sufe.edu.cn/_upload/tpl/02/d9/729/template729/images/logo.png) |
| `mas.svg` | [Monetary Authority of Singapore](https://www.mas.gov.sg/) — decoded from the official page's inline base64 SVG (`img.mas-logo`). |
| `cardinal.svg` | [Cardinal Operations](https://copt.shanshu.ai/) — extracted from the homepage's inline logo SVG. The original CSS fill `#7a2731` is embedded in the SVG; framework-specific attributes are removed. |

The artwork is local, with no runtime dependency on the source websites. No logo is redrawn, stretched, cropped, or passed through a color filter. The original white ZJU and SUFE wordmarks sit on dark backing panels for visibility. All five logos use a 112 × 84 px desktop container and an 84 × 68 px mobile container, with `object-fit: contain` preserving their aspect ratios. Both SUFE education entries share the same file.
