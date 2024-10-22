"use client";
import Image from "next/image";
import 'animate.css';
import { ChevronDown } from "lucide-react";
import Projects from "@/components/Projects";
import About from "@/components/About";

export default function Home() {
    return (
        <div>
            <section id="home" className="flex flex-col items-center justify-center h-screen">
                <Image
                    className="animate__animated animate__backInDown"
                    src="/sw-logo-2024-trans.png"
                    alt="LOGO"
                    width={150}
                    height={150}
                    loading="eager"
                />
                <div className="text-center mt-10">
                    <h2 className="text-6xl tracking-wider mb-2 font-teko">
                        SATHIRA WILLIAMS
                    </h2>
                    <h3 className="text-2xl font-light font-silk">
                        Software Engineer & Fullstack Developer
                    </h3>
                </div>
                <div className="mt-10">
                    <ChevronDown
                        className="w-20 h-8 animate-bounceDown delay-1s cursor-pointer border
                        border-input hover:bg-accent hover:text-accent-foreground hover:border-transparent rounded-md"
                        onClick={() => {
                            document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'});
                        }}
                    />
                </div>

            </section>
            {/* Projects Section */}
            <section id="projects" className="min-h-screen p-20 bg-gray-900 text-white">
                <Projects/>
            </section>
            {/* About Section */}
            <section id="about" className="min-h-screen p-20 bg-gray-800 text-white">
                <About/>
            </section>

        </div>
    );
}
