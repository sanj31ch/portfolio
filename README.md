# Sanjana Chinta: Portfolio

Static site (HTML/CSS/JS) + Supabase (auth, database, file storage). No build step.

## What works now vs. what needs setup
- **Works immediately (no setup):** full public site with your starter content, light/dark mode, responsive nav, contact form validation, back-to-top, resume button.
- **Needs your Supabase project:** admin login, editing content, uploads, preview/publish, saving contact messages.
- **Needs your files:** `assets/profile.jpg` (your photo), `assets/resume.pdf`. Not included; the site shows your initials until the photo is added.

## Run locally
`python -m http.server 8000` in this folder, then open http://localhost:8000 (admin: /admin/).

## Supabase setup
1. Create a free project at supabase.com.
2. SQL Editor: paste and run `supabase/schema.sql`.
3. Authentication > Users > Add user (your email + strong password). Turn **off** public sign-ups in Authentication > Providers > Email.
4. In SQL Editor run: `insert into admins select id from auth.users where email = 'YOUR_EMAIL';`
5. Project Settings > API: copy the Project URL and the **anon** key into `js/config.js`. Never use the `service_role` key in this folder.
Security: Row Level Security allows the public to read only published rows and to insert contact messages; only users listed in `admins` can edit, upload or publish.

## Using the admin (/admin/)
1. Sign in, click **Import starter content** once, then **Publish changes**.
2. Pick a section, **Add new / Edit / Delete**. Upload images, certificates and PDFs in the form.
3. **Preview changes** shows drafts; **Publish changes** makes them live. Deletes and hides also apply on publish.
4. Add email, resume and photo under **Profile**. Missing project links stay blank until you add them.
5. New content types (papers, workshops, hackathons, blog, testimonials) go in **More**, or add a section in `js/schema.js`.

## Deploy (GitHub Pages)
Push to GitHub, Settings > Pages > deploy from branch `main` / root. `js/config.js` holds only public values, so it is safe to commit.

## Not yet tested
Written without a browser or a live Supabase project, so run through: admin login, add project, image upload, publish, contact form.
