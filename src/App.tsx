"use client";

import { useState, useEffect } from "react";
import {
  IconBrandInstagram,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMapPin,
  IconMail,
} from "@tabler/icons-react";

const navigation = [
  { name: "about", href: "#about" },
  { name: "projects", href: "#projects" },
  { name: "experience", href: "#experience" },
  { name: "education", href: "#education" },
  { name: "contact", href: "#contact" },
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

export default function Home() {
  const textOptions = [
    { text: "software engineer", emoji: "👩🏻‍💻" },
    { text: "coffee lover", emoji: "☕" },
    { text: "aspiring plant enthusiast", emoji: "🌱" },
    { text: "nintendo nerd", emoji: "👾" },
  ];

  const [displayedText, setDisplayedText] = useState("");
  const [currentEmoji, setCurrentEmoji] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingEmoji, setIsDeletingEmoji] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);

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
  }, [displayedText, isDeleting, isDeletingEmoji, loopNum, textOptions]);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">gretchen lam</span>
              <span className="text-xl font-bold">gretchen lam</span>
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="/img/gradientgif.gif"
            alt=""
            className="h-full w-full object-cover opacity-35"
          />
        </div>

        <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/3 flex justify-center">
              <div className="h-64 w-64 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg">
                <img
                  src="/img/headshot.jpg"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="w-full lg:w-2/3 text-center lg:text-left">
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                hello, world! 👋🏻
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
                i'm <span className="text-indigo-600">gretchen lam</span>
              </h1>
              <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-gray-700 h-12">
                {displayedText}
                {currentEmoji && <span className="ml-1">{currentEmoji}</span>}
                <span className="animate-blink">|</span>
              </h2>
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                <a
                  href="#contact"
                  className="rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  contact me
                </a>
                <a
                  href="#about"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              about me
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              hey there! i'm a new graduate from <b>uc santa barbara</b>, where
              i earned my <b>b.s. in computer science</b>! throughout my time in
              school, i have developed a strong foundation in{" "}
              <b>software engineering principles and practices</b>. i also
              learned that i have a keen interest in{" "}
              <b>artifical intelligence and machine learning</b>, especially
              within the field of <b>computer vision</b>, but i love nothing
              more than to explore other areas!
              <br /> outside of programming, i'm an avid coffee lover and have
              been trying my hand at latte art. though i'm nowhere near perfect,
              i have so much fun attempting it each morning! i also love to
              travel and explore new places with friends and family and want to
              get more into plants and gardening 🌱
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 justify-items-center">
              <div className="flex flex-col rounded-2xl bg-gray-50 p-8 w-full max-w-xs">
                <h3 className="text-base font-semibold text-gray-900 text-center">
                  technical skills
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li className="text-center">full-stack development</li>
                  <li className="text-center">gui development</li>
                  <li className="text-center">ci / cd pipelines</li>
                  <li className="text-center">test automation</li>
                  <li className="text-center">agile collaboration</li>
                </ul>
              </div>
              <div className="flex flex-col rounded-2xl bg-gray-50 p-8 w-full max-w-xs">
                <h3 className="text-base font-semibold text-gray-900 text-center">
                  soft skills
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li className="text-center">problem solving</li>
                  <li className="text-center">team collaboration</li>
                  <li className="text-center">effective communication</li>
                  <li className="text-center">continuous learning</li>
                  <li className="text-center">adaptability</li>
                </ul>
              </div>
              <div className="flex flex-col rounded-2xl bg-gray-50 p-8 w-full max-w-xs">
                <h3 className="text-base font-semibold text-gray-900 text-center">
                  interests
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li className="text-center">ai + ml</li>
                  <li className="text-center">game development</li>
                  <li className="text-center">ui / ux design</li>
                  <li className="text-center">mentorship</li>
                  <li className="text-center">did i mention coffee yet?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              projects
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              some of my recent work and personal projects!
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.name}
                className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="relative w-full">
                  <img
                    src={project.image}
                    alt=""
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover"
                  />
                </div>
                <div className="w-full mt-6">
                  <div className="flex flex-wrap justify-center gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-6 flex justify-center space-x-4 border-t border-gray-900/5 pt-6">
                    <a
                      target="_blank"
                      href={project.githubLink}
                      className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                      view on github
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              professional experience
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              my journey through the tech and educational world, working with
              amazing teams and building impactful products!
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>

              {/* Timeline items */}
              <div className="space-y-8">
                <div className="relative pl-16">
                  <div className="absolute left-4 top-1 -ml-1 h-3 w-3 rounded-full bg-indigo-600"></div>
                  <time className="text-sm leading-7 text-gray-500">
                    april 2025 - present
                  </time>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">
                    ai software engineer
                  </h3>
                  <p className="mt-1 text-base leading-7 text-gray-600">
                    lockheed martin
                  </p>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-4 top-1 -ml-1 h-3 w-3 rounded-full bg-indigo-600"></div>
                  <time className="text-sm leading-7 text-gray-500">
                    june 2024 - september 2024
                  </time>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">
                    software engineer intern
                  </h3>
                  <p className="mt-1 text-base leading-7 text-gray-600">
                    raytheon
                  </p>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-4 top-1 -ml-1 h-3 w-3 rounded-full bg-indigo-600"></div>
                  <time className="text-sm leading-7 text-gray-500">
                    september 2023 - december 2023
                  </time>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">
                    computer science peer mentor
                  </h3>
                  <p className="mt-1 text-base leading-7 text-gray-600">
                    ucsb college of engineering
                  </p>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-4 top-1 -ml-1 h-3 w-3 rounded-full bg-indigo-600"></div>
                  <time className="text-sm leading-7 text-gray-500">
                    june 2023 - september 2023
                  </time>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">
                    software engineer intern
                  </h3>
                  <p className="mt-1 text-base leading-7 text-gray-600">
                    arthrex
                  </p>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-4 top-1 -ml-1 h-3 w-3 rounded-full bg-indigo-600"></div>
                  <time className="text-sm leading-7 text-gray-500">
                    september 2022 - december 2022
                  </time>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">
                    undergraduate teaching assistant
                  </h3>
                  <p className="mt-1 text-base leading-7 text-gray-600">
                    ucsb college of engineering
                  </p>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-4 top-1 -ml-1 h-3 w-3 rounded-full bg-indigo-600"></div>
                  <time className="text-sm leading-7 text-gray-500">
                    june 2020 - september 2022
                  </time>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">
                    machining intern
                  </h3>
                  <p className="mt-1 text-base leading-7 text-gray-600">
                    m&d precision machining
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              education
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              my academic background that helped shape my technical foundation!
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl">
            <div className="rounded-2xl bg-white p-8 shadow-sm text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                bachelor of science in computer science
              </h3>
              <p className="mt-2 text-base text-gray-600">
                university of california, santa barbara
              </p>
              <p className="mt-1 text-sm text-gray-500">
                september 2021 - march 2025
              </p>
              <div className="mt-4 text-sm text-gray-600 mx-auto max-w-lg">
                <p className="font-semibold">relevant coursework:</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-left">
                  <p>• object oriented design</p>
                  <p>• data structures & algorithms</p>
                  <p>• computer architecture</p>
                  <p>• artificial intelligence</p>
                  <p>• machine learning</p>
                  <p>• computer vision</p>
                  <p>• application programming</p>
                  <p>• human-computer interaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              get in touch
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              feel free to reach out through email or connect on social media!
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center gap-8">
            <div className="flex gap-6">
              {/* email */}
              <a
                href="mailto:gretchenlam03@gmail.com"
                className="p-4 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
                aria-label="email"
              >
                <IconMail className="h-8 w-8 text-indigo-600" />
              </a>

              {/* github */}
              <a
                href="https://github.com/gretchenlam"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="github"
              >
                <IconBrandGithub className="h-8 w-8 text-gray-700" />
              </a>

              {/* linkedin */}
              <a
                href="https://linkedin.com/in/gretchen-lam"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                aria-label="linkedin"
              >
                <IconBrandLinkedin className="h-8 w-8 text-blue-600" />
              </a>

              {/* instagram */}
              <a
                href="https://instagram.com/gurchout"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors"
                aria-label="instagram"
              >
                <IconBrandInstagram className="h-8 w-8 text-pink-600" />
              </a>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <IconMapPin className="h-6 w-6 text-indigo-600" />
              <span>westminster, ca</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="border-t border-gray-700 pt-8">
            <p className="text-sm leading-6 text-gray-400 text-center">
              &copy; {new Date().getFullYear()} gretchen lam 👩🏻‍💻
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
