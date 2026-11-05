# Matrimonial Profile Website

A corporate-style, single-page personal matrimonial profile. Plain HTML, CSS and JavaScript: no framework, no build step, no database, no external or local storage. All content is hardcoded in `data.js`.

## Project structure

```
matrimonial-site/
├── index.html     Page skeleton
├── styles.css     Design (navy + gold, fully responsive)
├── data.js        ALL profile details (the only file you normally edit)
├── script.js      Renders the page and runs the photo slideshow
├── media/         Your photos (commit these to GitHub)
└── README.md      This file
```

## 1. Add your photos

Copy your images into the `media/` folder using these names:

| File | Used for |
|---|---|
| `profile.jpg` | Hero banner and personal section (portrait, about 4:5, e.g. 800x1000) |
| `father.jpg`, `mother.jpg`, `sister.jpg` | Family cards (square-ish crop works best) |
| `gallery-1.jpg` ... `gallery-6.jpg` | Photo gallery slideshow |

- Keep each image under about 500 KB (resize or compress first) for fast loading.
- Different file names, `.png`/`.webp`, or more or fewer gallery photos? Edit the paths in `data.js` (`gallery` list).
- Missing photos show an initials placeholder, so the site never looks broken.

## 2. Add your contact details

Open `data.js` and fill the `contact` block. Empty values are hidden automatically.

```js
contact: {
  phone: "+91 98765 43210",
  whatsapp: "919876543210",          // digits only, with country code
  email: "you@example.com",
  linkedin: "https://www.linkedin.com/in/your-id",
  instagram: "",
  github: "https://github.com/your-id",
  facebook: ""
}
```

## 3. Preview locally (optional)

Just double-click `index.html`, or run a tiny server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## 4. Push to GitHub

```bash
cd matrimonial-site
git init
git add .
git commit -m "Initial matrimonial profile site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

(Create the empty repo on GitHub first. Make it **Private** if you want to limit who can read the source.)

## 5. Deploy on Vercel

1. Sign in at https://vercel.com with your GitHub account.
2. Click **Add New... > Project** and import the repository.
3. Settings:
   - **Framework Preset:** Other
   - **Build Command:** leave empty
   - **Output Directory:** leave empty (the root folder is served)
   - **Install Command:** leave empty
4. Click **Deploy**. You get a URL like `https://<project>.vercel.app`.
5. Every `git push` to `main` redeploys automatically.

Optional: add a custom domain under Project > Settings > Domains.

## 6. Updating later

Edit `data.js` (text) or replace files in `media/` (photos), then:

```bash
git add .
git commit -m "Update profile"
git push
```

## Privacy checklist (please read)

The page shows your full address, your parents' dates of birth and your CTC, and anything on a public URL is visible to anyone who has the link. `index.html` includes `noindex` so search engines skip it, but that does not make it private. Consider:

- Removing the full `address`, parents' `dob` values and `ctc` from `data.js`, and sharing them privately with serious enquiries.
- Using Vercel's Password Protection (paid plans) or sharing the link only with trusted people.
- Not posting the URL on public social media.

## Troubleshooting

- **Photo not showing:** check the file name and extension match `data.js` exactly (names are case-sensitive on Vercel).
- **Blank page locally:** make sure `data.js` and `script.js` sit next to `index.html`.
- **Changes not visible after deploy:** hard refresh (Ctrl+Shift+R) or check the Vercel deployment finished.
