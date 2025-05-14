"use client";
import Image from "next/image";
import 'animate.css';
import { ChevronDown } from "lucide-react";
import Projects from "@/components/Projects";
import About from "@/components/About";
import BlurFade from "@/components/ui/blur-fade";
import LatestBlogs from "@/components/LatestBlogs";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <div>
             <BlurFade delay={0.6} inView>
                <LatestBlogs />
             </BlurFade>

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
                    <BlurFade delay={0.6} inView>
                    <h2 className="text-6xl tracking-wider mb-2 font-teko">
                        SATHIRA WILLIAMS
                    </h2>
                    </BlurFade>
                    <BlurFade delay={0.8} inView>
                    <h3 className="text-2xl font-light font-silk mb-2">
                        Software Engineer & Fullstack Developer
                    </h3>
                    </BlurFade>
                    <BlurFade delay={0.9} inView>
                        <h3 className="text-s font-light font-silk flex items-center justify-center">
                            <Image src="/location.svg" alt="Location" width={20} height={20} className="mr-3" />
                            Based in Vancouver, Canada
                        </h3>
                    </BlurFade>
                </div>
                <BlurFade delay={1}>
                    <div className="mt-10">
                        <ChevronDown
                            className="w-20 h-8 animate-bounceDown delay-1s cursor-pointer border
                        border-input hover:bg-accent hover:text-accent-foreground hover:border-transparent rounded-md"
                        onClick={() => {
                            document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'});
                        }}
                    />
                </div>
                </BlurFade>

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
