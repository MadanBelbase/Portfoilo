# Madan Belbase - Developer Portfolio

A developer portfolio with a personal introduction on top and an interactive, command-driven terminal below.

## Technology Stack (unchanged)

- **Frontend**: HTML5, Tailwind CSS 2.2 (CDN), vanilla JavaScript - no build step
- **Icons**: Font Awesome 6.5.2
- **Fonts**: Google Fonts (Inter) + the system monospace stack
- **Forms**: Web3Forms (contact form)

## Layout

1. **Top - Introduction**: photo, name, role, tagline, quick facts, stack badges, resume + social links, and the `profile.js` code card.
2. **Bottom - Terminal**: type commands (or tap the chips / clickable commands) to explore the portfolio.

## Terminal commands

| Command | What it shows |
| --- | --- |
| `help` / `help <cmd>` | All commands, tips, usage |
| `about` | Introduction, focus, soft skills |
| `skills` | Skill bars + other tools |
| `projects` / `project <name\|n>` | Project list / project details with screenshot |
| `experience` | Roles and volunteering |
| `education` | Academic background |
| `achievements` | Highlights |
| `blog` | Technical articles |
| `contact` / `socials` | Email (with copy button), location, social links |
| `resume` | Open or download the PDF |
| `message` | Opens the contact form |
| `ls`, `cat <file>`, `history`, `clear`, `whoami` | Shell-style helpers |

Keyboard: `↑ ↓` history, `Tab` autocomplete, `Ctrl+L` clear, `Ctrl+C` cancel line, `Esc` leave the input.
Unknown commands get a "did you mean…?" suggestion.

## Editing your content

All terminal content lives in the `DATA` object at the top of `terminal.js` (profile, skills, projects, experience,
education, achievements, blog posts, links). Add a project by adding an entry to `DATA.projects`; its thumbnail goes in `image/`.
The intro section is plain HTML in `index.html`.

## Project Structure

```text
├── index.html       # Page: intro section + terminal markup + contact dialog
├── style.css        # Original styles + terminal/intro styles (appended at the bottom)
├── script.js        # Mobile menu + contact dialog (Web3Forms)
├── terminal.js      # Terminal engine + all portfolio content (DATA)
├── MadanBelbase.pdf # Resume
├── image/           # profile-384.jpg and thumb-*.webp are what the page loads
└── README.md
```

## Local Development

1. `git clone https://github.com/MadanBelbase/Portfolio.git`
2. Open `index.html` in a browser (or use VS Code Live Server).

## License

Open-source. Feel free to use it as inspiration for your own portfolio.

---
Built by [Madan Belbase](https://github.com/MadanBelbase)
