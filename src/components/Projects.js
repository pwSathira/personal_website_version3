// components/Projects.js

import { useState, useEffect } from 'react';
import ScrollDownButton from './ScrollDownButton';
import {ChevronUp} from "lucide-react";
import {ChevronDown} from "lucide-react";
export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const repoNames = ['blue-link', 'arduino-fan-control'];

        Promise.all(
            repoNames.map((repo) =>
                fetch(`https://api.github.com/repos/pwSathira/${repo}`)
                    .then((response) => response.json())
            )
        ).then((data) => {
            setProjects(data);
        });
    }, []);

    return (
        <section id="projects" className="min-h-screen p-10 bg-gray-900 text-white">
            <div className="flex justify-center">
                <ChevronUp
                    className="w-20 h-8 cursor-pointer border
                        border-input hover:bg-accent hover:text-accent-foreground hover:border-transparent rounded-md"
                    onClick={() => {
                        document.getElementById('home')?.scrollIntoView({behavior: 'smooth'});
                    }}
                />
            </div>
            <h2 className="text-4xl font-bold mb-8 text-center mt-20">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <div key={index} className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-2xl font-semibold mb-2">{project.name}</h3>
                        <p className="mb-4">{project.description}</p>
                        <a
                            href={project.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            View on GitHub
                        </a>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-20">
                <ChevronDown
                    className="w-20 h-8 cursor-pointer border
                    border-input hover:bg-accent hover:text-accent-foreground hover:border-transparent rounded-md"
                    onClick={() => {
                        document.getElementById('about')?.scrollIntoView({behavior: 'smooth'});
                    }}
                />
            </div>
        </section>
    );
}
