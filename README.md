# Yashaswini G — Personal Portfolio

A clean, modern, single-page personal portfolio website built with plain HTML5, CSS3, and vanilla JavaScript — no frameworks, no build tools, no dependencies.

Created as part of the **CodeOrbit Full-Stack Development Internship** submission.

## Description

This portfolio introduces Yashaswini G — a BCA student, AI Intern, and aspiring Full-Stack Developer — and showcases her skills, projects, education, and professional experience in a soft, lavender-and-cream, developer-focused design.

## Features

- Sticky, responsive navbar with a mobile hamburger menu
- Two-column hero section with an in-browser profile photo uploader
- About, Skills, Projects, Education, Experience, and Contact sections
- Skill "pills" (no fake percentage bars)
- Four project cards, including a highlighted flagship project
- Vertical timelines for Education and Experience
- Leadership & campus involvement subsection
- Fully client-side contact form with validation and a success message (no backend — no email is actually sent)
- Subtle scroll-reveal animations
- Fully responsive: desktop, laptop, tablet, and mobile
- Accessible: semantic HTML, labeled form fields, alt text, visible focus states, ARIA attributes

## Technologies

- HTML5
- CSS3 (custom properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)

No React, Node.js, npm, Bootstrap, Tailwind, or any other framework/library is used or required.

## Project Structure

```
personal-portfolio/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── assets/
│   └── (only necessary static assets, if any are added later)
│
├── README.md
│
└── .gitignore
```

## How to Run

No installation or build step is required.

1. Download / clone the project.
2. Double-click `index.html`, or open it in any modern browser (Chrome, Edge, Firefox, Safari).
3. That's it — the site runs entirely in the browser.

## Profile Photo Upload Feature

You do **not** need to edit any code to add a profile photo.

1. Open the site and scroll to the hero section (top of the page).
2. Click the **"Upload Photo"** button next to the photo frame.
3. Choose a **JPG, JPEG, or PNG** file up to **5MB**.
4. The photo previews immediately inside the frame.
5. The photo is saved in your browser's `localStorage`, so it will still be there the next time you open `index.html` — even after refreshing.
6. To change it later, click the button again (it will now say **"Change Photo"**) and pick a new file.

No file is uploaded to any server — everything happens locally in your browser.

## How to Customize Content

Most content lives directly inside `index.html`, organized into clearly commented sections (Navbar, Hero, About, Skills, Projects, Education, Experience, What I Bring, Contact, Footer). Open the file in any code/text editor and update the text inside the relevant section.

### How to replace GitHub project links

Each project card currently uses a placeholder link:

```html
<a href="#github-link" class="btn btn-outline btn-small">GitHub</a>
```

Search for `#github-link` in `index.html` and replace each one with the actual repository URL for that project, e.g.:

```html
<a href="https://github.com/yashaswinigangadhara15-cpu/krushi-farm-connect" class="btn btn-outline btn-small">GitHub</a>
```

The flagship project also has a placeholder Live Demo link (`#live-demo`) — replace it the same way once a live deployment exists.

### How to replace the LinkedIn link

Search for the LinkedIn URL:

```
https://www.linkedin.com/in/yashaswini-g-24096a353
```

and replace every occurrence (navbar is not linked, but the Hero, Contact, and Footer sections are) with your updated LinkedIn URL.

### How to replace the email address

Search for:

```
yashaswini.gangadhara15@gmail.com
```

and replace it wherever it appears (the Contact section and the Footer), including inside the `mailto:` link.

## Future Improvements

- Connect the contact form to a real backend or email service (e.g. Formspree, EmailJS, or a custom API) to actually deliver messages.
- Add real GitHub repository links once each project is published.
- Add a dedicated "Live Demo" deployment for the flagship project.
- Consider adding light/dark theme toggle.

---

This portfolio was created as part of the **CodeOrbit Full-Stack Development Internship**.
