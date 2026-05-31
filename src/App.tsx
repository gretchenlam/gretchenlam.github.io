"use client";

import { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
  IconMapPin,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";

const navigation = [
  { name: "about", href: "#about" },
  { name: "projects", href: "#projects" },
  { name: "experience", href: "#experience" },
  { name: "education", href: "#education" },
  { name: "contact", href: "#contact" },
];

const textOptions = [
  { text: "software engineer", emoji: "👩🏻‍💻" },
  { text: "coffee lover", emoji: "☕" },
  { text: "aspiring plant enthusiast", emoji: "🌱" },
  { text: "nintendo nerd", emoji: "👾" },
];

const projects = [
  {
    name: "facial frenzy",
    description: "a python-based facial recognition game",
    tags: ["opencv", "tensorflow", "postgresql", "firebase"],
    image: "/img/facialfrenzy.png",
    githubLink: "https://github.com/gretchenlam/Facial-Frenzy",
  },
  {
    name: "vr cooking simulation",
    description:
      "a unity vr cooking simulation game with interactive prompts, tutorials, and recipes",
    tags: ["unity", "c#", "meta quest"],
    image: "/img/cooking.png",
    githubLink: "https://github.com/gretchenlam/unity-vr-cooking",
  },
  {
    name: "closet tracker",
    description:
      "a mobile app that allows users to upload and track their clothing",
    tags: ["expo go", "react native", "firebase"],
    image: "/img/closettracker.png",
    githubLink: "https://github.com/ucsb-cs148-w25/pj12-closettracker",
  },
];

const skillGroups = [
  {
    label: "technical skills",
    items: [
      "full-stack development",
      "gui development",
      "ci / cd pipelines",
      "test automation",
      "agile collaboration",
    ],
  },
  {
    label: "soft skills",
    items: [
      "problem solving",
      "team collaboration",
      "effective communication",
      "continuous learning",
      "adaptability",
    ],
  },
  {
    label: "interests",
    items: [
      "ai + ml",
      "game development",
      "ui / ux design",
      "mentorship",
      "did i mention coffee yet?",
    ],
  },
];

const experiences = [
  ["april 2025 - present", "ai software engineer", "lockheed martin"],
  ["june 2024 - september 2024", "software engineer intern", "raytheon"],
  [
    "september 2023 - december 2023",
    "computer science peer mentor",
    "ucsb college of engineering",
  ],
  ["june 2023 - september 2023", "software engineer intern", "arthrex"],
  [
    "september 2022 - december 2022",
    "undergraduate teaching assistant",
    "ucsb college of engineering",
  ],
  ["june 2020 - september 2022", "machining intern", "m&d precision machining"],
];

const coursework = [
  "object oriented design",
  "data structures & algorithms",
  "computer architecture",
  "artificial intelligence",
  "machine learning",
  "computer vision",
  "application programming",
  "human-computer interaction",
];

export default function Home() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentEmoji, setCurrentEmoji] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingEmoji, setIsDeletingEmoji] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    if (typeof window.matchMedia !== "function") {
      return "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const stats = useMemo(
    () => [
      ["03", "featured projects"],
      ["06", "technical roles"],
      ["2025", "ucsb cs grad"],
    ],
    []
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % textOptions.length;
      const fullText = textOptions[current].text;

      if (!isDeleting && !isDeletingEmoji) {
        if (displayedText.length < fullText.length) {
          setDisplayedText(fullText.substring(0, displayedText.length + 1));
          setTypingSpeed(50);
        } else {
          setCurrentEmoji(textOptions[current].emoji);
          setTimeout(() => setIsDeletingEmoji(true), 1000);
        }
      } else if (isDeletingEmoji) {
        setCurrentEmoji("");
        setIsDeletingEmoji(false);
        setIsDeleting(true);
      } else if (isDeleting) {
        if (displayedText.length > 0) {
          setDisplayedText(
            displayedText.substring(0, displayedText.length - 1)
          );
          setTypingSpeed(25);
        } else {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, isDeletingEmoji, loopNum, typingSpeed]);

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grain" />

      <header className="site-header">
        <a href="#top" className="brand-mark" aria-label="gretchen lam home">
          <span>gl</span>
        </a>
        <nav aria-label="Global" className="nav-links">
          {navigation.map((item) => (
            <a key={item.name} href={item.href}>
              {item.name}
            </a>
          ))}
        </nav>
        <button
          className="theme-toggle"
          type="button"
          aria-label={`switch to ${theme === "dark" ? "light" : "dark"} mode`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
        </button>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">hello, world!</p>
          <h1>
            i'm <span>gretchen lam</span>
          </h1>
          <h2>
            {displayedText}
            {currentEmoji && <span className="emoji">{currentEmoji}</span>}
            <span className="animate-blink">|</span>
          </h2>
          <div className="hero-actions">
            <a href="#projects" className="button primary-button">
              see work
              <IconArrowUpRight size={18} />
            </a>
            <a href="#contact" className="button ghost-button">
              contact me
            </a>
          </div>
        </div>

        <div className="hero-art" aria-label="portrait and portfolio highlights">
          <div className="portrait-frame">
            <img src="/img/headshot.jpg" alt="gretchen lam" />
          </div>
          <div className="stat-strip">
            {stats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="content-section about-grid">
        <div>
          <p className="eyebrow">about me</p>
          <h2>engineering with a visual streak.</h2>
        </div>
        <div className="section-body">
          <p>
            hey there! i graduated from <b>uc santa barbara</b>, where i
            earned my <b>b.s. in computer science</b>. throughout my time in
            school, i developed a strong foundation in{" "}
            <b>software engineering principles and practices</b>. i also learned
            that i have a keen interest in{" "}
            <b>artificial intelligence and machine learning</b>, especially
            within the field of <b>computer vision</b>, but i love nothing more
            than to explore other areas.
          </p>
          <p>
            outside of programming, i'm an avid coffee lover and have been
            trying my hand at latte art. though i'm nowhere near perfect, i have
            so much fun attempting it each morning. i also love to gym, travel
            and explore new places, and want to get more into plants and
            gardening 🌱
          </p>
        </div>
      </section>

      <section className="skill-grid" aria-label="skills and interests">
        {skillGroups.map((group) => (
          <article className="glass-card skill-card" key={group.label}>
            <h3>{group.label}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section id="projects" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">projects</p>
          <h2>small worlds with useful mechanics.</h2>
          <p>some of my recent work and personal projects!</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.name}>
              <div className="project-image">
                <img src={project.image} alt="" />
                <span>0{index + 1}</span>
              </div>
              <div className="project-content">
                <div className="tag-list">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`view ${project.name} on github`}
                >
                  view on github
                  <IconArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="content-section split-section">
        <div className="section-heading sticky-heading">
          <p className="eyebrow">experience</p>
          <h2>building across aerospace, education, and creative tools.</h2>
          <p>
            my journey through the tech and educational world, working with
            amazing teams and building impactful products!
          </p>
        </div>
        <div className="timeline">
          {experiences.map(([date, role, company]) => (
            <article className="timeline-item" key={`${date}-${role}`}>
              <time>{date}</time>
              <h3>{role}</h3>
              <p>{company}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="education" className="content-section education-section">
        <div className="section-heading">
          <p className="eyebrow">education</p>
          <h2>uc santa barbara, computer science.</h2>
          <p>my academic background that helped shape my technical foundation!</p>
        </div>
        <article className="glass-card education-card">
          <div>
            <h3>bachelor of science in computer science</h3>
            <p>university of california, santa barbara</p>
            <time>september 2021 - march 2025</time>
          </div>
          <div className="coursework">
            {coursework.map((course) => (
              <span key={course}>{course}</span>
            ))}
          </div>
        </article>
      </section>

      <section id="contact" className="contact-section">
        <div>
          <p className="eyebrow">contact</p>
          <h2>let's connect!</h2>
        </div>
        <div className="contact-panel">
          <a href="mailto:gretchenlam03@gmail.com" aria-label="email">
            <IconMail size={24} />
          </a>
          <a
            href="https://github.com/gretchenlam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="github"
          >
            <IconBrandGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/gretchen-lam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="linkedin"
          >
            <IconBrandLinkedin size={24} />
          </a>
          <a
            href="https://instagram.com/gurchout"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="instagram"
          >
            <IconBrandInstagram size={24} />
          </a>
          <p>
            <IconMapPin size={20} />
            westminster, ca
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} gretchen lam 👩🏻‍💻</p>
      </footer>
    </main>
  );
}
