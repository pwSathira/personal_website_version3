// components/Projects.js

import { useState } from "react";
import BlurFade from "@/components/ui/blur-fade";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe, FaGithub } from "react-icons/fa";

const projects = [
  {
    image: "/star-sync.png", 
    name: "Star-Sync",
    dateRange: "Sept 2024 - April 2025",
    description: (
      <>
        Engineered and optimized a full-stack satellite scheduling algorithm to automate satellite-ground station scheduling, balancing workload and reducing communication delays.
      </>
    ),
    techStack: [
      "Next.js",
      "Typescript",
      "PostgreSQL",
      "Docker",
      "TailwindCSS",
      "FastAPI",
      "Celestrak",
    ],
    website: "https://ss-web.fly.dev/dashboard",
    github: "https://github.com/Star-Sync"
  },
  {
    image: "/dnipro.png",
    name: "DniPro Electric",
    dateRange: "June 2023 - August 2023",
    description: (
      <>
        Developed a responsive and user-friendly website using NextJS, Javascript, Netlify, Formspree, and various other libraries.
     </>
    ),
    techStack: [
      "NextJS",
      "Netlify",
      "Formspree",
      "TailwindCSS"
    ],
    website: "https://dniproelectric.netlify.app/",
    github: "https://github.com/pwSathira/de_electric"
  },
  {
    image: "/blue-link.png",
    name: "Blue-Link Police MDT",
    dateRange: "June 2023 - January 2024",
    description: (
      <>
        A web application for the police to manage their mobile data terminals (MDT) and track their activities. 
      </>
    ),
    techStack: [
      "Spring Boot",
      "Microsoft Azure",
      "MySQL",
      "Java",
      "Gradle",
    ],
    website: "https://github.com/pwSathira/blue-link",
    github: "https://github.com/pwSathira/blue-link"
  },
  {
    image: "/personal-website.png",
    name: "Personal Website v3",
    dateRange: "August 2024 - Present",
    description: (
      <>
        A personal website to showcase my projects and skills, the website you are currently on.
      </>
    ),
    techStack: [
      "NextJS",
      "JavaScript",
      "TailwindCSS",
      "Netlify",
      "Motion",
      "Shadcn UI",
    ],
    website: "https://pwsathira.polywertz.com",
    github: "https://github.com/pwSathira/personal_website_version3"
  },
];

export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedProject = projects[selectedIndex];

  return (
    <section id="projects" className="min-h-screen p-10 bg-gray-900 text-white">
      <BlurFade delay={0.2} inView>
        <h2 className="text-4xl font-bold mb-8 text-center mt-20">Projects</h2>
        <div className="flex bg-gray-800 rounded-xl shadow-lg overflow-hidden min-h-[500px] max-w-5xl mx-auto">
          {/* Sidebar List */}
          <div className="w-64 bg-gray-900 border-r border-gray-700 overflow-y-auto overflow-x-hidden" style={{ maxHeight: '600px' }}>
            <ul className="divide-y divide-gray-700">
              {projects.map((project, idx) => (
                <motion.li
                  key={idx}
                  className={`cursor-pointer px-6 py-5 transition ${selectedIndex === idx ? 'bg-gray-800 font-bold text-pink-400' : 'text-gray-200'}`}
                  onClick={() => setSelectedIndex(idx)}
                  whileHover={{ scale: 1.03, backgroundColor: '#23272f' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ outline: 'none' }}
                >
                  <div className="truncate text-lg">{project.name}</div>
                  <div className="text-xs text-gray-500">{project.dateRange}</div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Maximized Project View */}
          <div className="flex-1 p-8 flex flex-col">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="flex flex-col h-full"
              >
                <div className="h-56 bg-gradient-to-tr from-red-400 to-pink-400 flex items-center justify-center rounded-lg mb-6">
                  {selectedProject.image && (
                    <img src={selectedProject.image} alt={selectedProject.name} className="object-contain h-48 w-full" />
                  )}
                </div>
                <h3 className="text-3xl font-semibold mb-1">{selectedProject.name}</h3>
                <div className="text-gray-400 mb-2 text-base">{selectedProject.dateRange}</div>
                <div className="mb-4 text-gray-200 text-lg">{selectedProject.description}</div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.techStack.map((tech, i) => (
                    <span key={i} className="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-auto">
                  <a
                    href={selectedProject.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition border border-transparent"
                  >
                    <FaGlobe /> Website
                  </a>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition border border-transparent"
                  >
                    <FaGithub /> GitHub
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
