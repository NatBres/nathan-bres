# Nathan Guérineau — Personal Portfolio

A professional one-page portfolio site for sports & data analytics, hosted on GitHub Pages.

## Structure

```
portfolio/
├── index.html          ← Main page (edit this)
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← Interactions, modals, scroll effects
├── img/                ← Add your profile photo and project images here
└── README.md
```

## Deploy to GitHub Pages

1. **Create a new GitHub repository** named `your-username.github.io`
   - Go to github.com → New repository
   - Name it exactly: `nathanguerin.github.io` (replace with your username)
   - Set to Public

2. **Upload these files**
   - Drag and drop the entire folder contents into the repository
   - Or use git:
     ```bash
     git init
     git add .
     git commit -m "Initial portfolio"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
     git push -u origin main
     ```

3. **Enable GitHub Pages**
   - Go to repo Settings → Pages
   - Source: Deploy from branch → main → / (root)
   - Your site will be live at `https://YOUR_USERNAME.github.io`

## Customization Checklist

### Before going live:
- [ ] Replace `Nathan Guérineau` with your actual full name in `index.html`
- [ ] Update the hero tagline if desired
- [ ] Add your photo to `img/` and link it in the About section
- [ ] Update GitHub and LinkedIn URLs in the Contact section
- [ ] Set up Formspree (free at formspree.io) and replace `YOUR_FORM_ID` in the form action
- [ ] Add your resume PDF to `img/` or link to a hosted version
- [ ] Update the `href` on the "Download Resume" button

### Adding project images to portfolio cards:
Replace the gradient backgrounds in `css/style.css` with actual images:
```css
.card-thumb--pitcher {
  background-image: url('../img/pitcher-analysis.jpg');
  background-size: cover;
  background-position: center;
}
```

### Adding a new portfolio project:
1. Copy a `.port-card` block in `index.html`
2. Give it a new `data-modal` id (e.g. `data-modal="modal-newproject"`)
3. Add a corresponding `.modal` block at the bottom
4. Add a thumb style for it in `style.css`

## Contact Form Setup (Formspree)
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form → copy the form ID
3. In `index.html`, replace:
   ```
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   with your actual form endpoint.
