// components/Projects.js

import { useState, useEffect } from 'react';
import BlurFade from "@/components/ui/blur-fade";

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
            <BlurFade delay={0.2} inView>
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
            </BlurFade>
        </section>
    );
}
