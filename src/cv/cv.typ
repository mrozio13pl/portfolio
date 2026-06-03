#import "./vendor/basic-resume/src/lib.typ": *

#let name = "Jakub Mrożek"
#let location = "Rabka-Zdrój, Poland"
#let email = "mrozio13pl@gmail.com"
#let github = "github.com/mrozio13pl"
#let linkedin = "linkedin.com/in/jakub-mrożek"
#let phone = "+48 668 331 663"
#let personal-site = "mraza.pages.dev"

#show: resume.with(
  author: name,
  // All the lines below are optional.
  // For example, if you want to to hide your phone number:
  // feel free to comment those lines out and they will not show.
  location: location,
  email: email,
  github: github,
  linkedin: linkedin,
  phone: phone,
  personal-site: personal-site,
  accent-color: "#26428b",
  font: "New Computer Modern",
  paper: "us-letter",
  author-position: left,
  personal-info-position: left,
)

/*
* Lines that start with == are formatted into section headings
* You can use the specific formatting functions if needed
* The following formatting functions are listed below
* #edu(dates: "", degree: "", gpa: "", institution: "", location: "", consistent: false)
* #work(company: "", dates: "", location: "", title: "")
* #project(dates: "", name: "", role: "", url: "")
* certificates(name: "", issuer: "", url: "", date: "")
* #extracurriculars(activity: "", dates: "")
* There are also the following generic functions that don't apply any formatting
* #generic-two-by-two(top-left: "", top-right: "", bottom-left: "", bottom-right: "")
* #generic-one-by-two(left: "", right: "")
*/
== Education

#edu(
  institution: "Józef Tischner School Complex in Rabka-Zdrój",
  location: "Rabka-Zdrój, Poland",
  dates: dates-helper(start-date: "September 2021", end-date: "May 2026"),
  degree: "Software Development Technician",
  consistent: true
)
- Qualifications: INF.02 & INF.03 certified (Polish national IT qualifications)
- Relevant Coursework: Web Development, Backend Programming, Databases, Computer Networks, Mobile Applications, Linux Systems Administration

== Work Experience

#work(
  title: "Full Stack Developer",
  location: "Rabka-Zdrój, Poland",
  company: "OLR Giewont",
  dates: dates-helper(start-date: "2024", end-date: "Present"),
)
- Designed, developed and deployed full-stack web solutions for the largest international racing pigeon loft in Europe
- Sole developer responsible for end-to-end delivery of mwggiewont.pl and grandprixpoland.pl, from architecture to production hosting
- Manages ongoing maintenance, updates and infrastructure for both live production sites

#work(
  title: "Web Developer Apprentice",
  location: "Kraków, Poland (Remote)",
  company: "Accent School of Polish",
  dates: dates-helper(start-date: "2024", end-date: "2024"),
)
- Worked in a 5-person team to develop a language learning platform featuring Polish exercises, quizzes and interactive questions
- Built using PHP and MySQL

#work(
  title: "Frontend Developer Apprentice",
  location: "Kraków, Poland",
  company: "Andea Solutions",
  dates: dates-helper(start-date: "2022", end-date: "2022"),
)
- Apprenticeship focused on frontend development and automation solutions for manufacturing lines

== Projects

#project(
  name: "MWG Giewont Dashboard",
  role: "Sole Developer",
  dates: dates-helper(start-date: "2024", end-date: "Present"),
  url: "mwggiewont.pl",
)
- Built a full-stack pigeon loft management platform from scratch for the largest international racing pigeon loft in Europe, serving both admins and breeders
- Features CMS, dashboard, user profiles, customizable themes, i18n, SMS and email notifications, PDF generation, and PWA support
- Built with Next.js, Hono, MySQL, Kysely, better-auth, and shadcn/ui; deployed on Hetzner VPS via Coolify
- Authored a custom i18n library specifically for the project, published as a standalone open-source npm package

#project(
  name: "Grand Prix Poland",
  dates: dates-helper(start-date: "2025", end-date: "Present"),
  url: "grandprixpoland.pl",
)
- Designed and developed a website for an international racing pigeon competition, part of the OLR Giewont infrastructure
- Built and deployed as a second production site under the same client, extending the existing hosting setup on Hetzner VPS via Coolify

#project(
  name: "Sudoku in Terminal",
  dates: dates-helper(start-date: "2023", end-date: "Present"),
  url: "github.com/mrozio13pl/sudoku-in-terminal",
)
- Terminal-based Sudoku game with multiple difficulty levels, replays, themes and settings, built with TypeScript and Ink
- Installable globally via npm; 30+ GitHub stars

#project(
  name: "UNO Multiplayer Online",
  dates: dates-helper(start-date: "2023", end-date: "2023"),
  url: "github.com/mrozio13pl/uno",
)
- Real-time multiplayer UNO game with rooms, chat, and player management built only with Node.js and WebSockets

// == Certificates

// #certificates(
//   name: "Korzystanie z narzędzi AI w programowaniu",
//   issuer: "",
//   // url: "",
//   date: "Oct 2024",
// )
// eww

== Skills
- *Languages*: TypeScript, Java, SQL
- *Web*: React, Next.js, TanStack Router/Start, TailwindCSS, Node.js, Hono, Bun, Drizzle, PostgreSQL, MySQL, MongoDB
- *Infrastructure*: Linux, Hetzner VPS, Coolify, Git, Arch (btw)
- *Tools*: AI-assisted development (Codex, Pi, Claude Code), MS Office
