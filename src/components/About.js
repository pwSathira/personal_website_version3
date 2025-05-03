import {FaLinkedin, FaTwitter, FaFilePdf, FaEnvelope, FaGithub} from 'react-icons/fa';
import BlurFade from "@/components/ui/blur-fade";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about"
                 className="p-10 bg-gray-800 text-white flex flex-col items-center justify-center mt-40">
            <BlurFade delay={0.2} inView>
                <div className={"flex flex-col items-center"} ref={ref}>
                    <motion.h2 
                        className="text-4xl font-bold mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                    >
                        About Me
                    </motion.h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="flex flex-col items-center"
                    >
                        <motion.p className="text-lg max-w-2xl text-center mb-8" variants={itemVariants}>
                            {`Hello! I'm Sathira, a fullstack software engineer based in Vancouver, Canada. I hold a Bachelor of Engineering degree with Specialized Honours in Software Engineering from York University's Lassonde School of Engineering.`}
                        </motion.p>
                        <motion.p className="text-lg max-w-2xl text-center mb-8" variants={itemVariants}>
                            {`With a passion for building innovative software solutions, I constantly seek opportunities to explore new technologies and expand my expertise. I thrive on challenges that allow me to grow as a developer and create meaningful impact through code.`}
                        </motion.p>
                        <motion.p className="text-lg max-w-2xl text-center mb-8" variants={itemVariants}>
                            {`I'm always open to connecting with fellow developers and discussing new opportunities. Feel free to reach out to me via email:`}
                        </motion.p> 
                        <motion.div variants={itemVariants}>
                            <Dock className="bg-gray-900/50">
                                <DockIcon>
                                    <a
                                        href="https://www.linkedin.com/in/pwSathira/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-blue-500 transition-colors duration-200"
                                        aria-label="LinkedIn"
                                    >
                                        <FaLinkedin size={24}/>
                                    </a>
                                </DockIcon>
                                <DockIcon>
                                    <a
                                        href="https://github.com/pwSathira"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-green-300 transition-colors duration-200"
                                        aria-label="Github"
                                    >
                                        <FaGithub size={24}/>
                                    </a>
                                </DockIcon>
                                <DockIcon>
                                    <a
                                        href="https://drive.google.com/file/d/1AfqHo7Ysz6C7jYDawVSYnAzfehm02uEb/view"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-red-500 transition-colors duration-200"
                                        aria-label="Resume"
                                    >
                                        <FaFilePdf size={24}/>
                                    </a>
                                </DockIcon>
                                <DockIcon>
                                    <a
                                        href="https://twitter.com/@Sathira_"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-blue-400 transition-colors duration-200"
                                        aria-label="Twitter"
                                    >
                                        <FaTwitter size={24}/>
                                    </a>
                                </DockIcon>
                                <DockIcon>
                                    <a
                                        href="mailto:sathira.williams@gmail.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-red-500 transition-colors duration-200"
                                        aria-label="Email"
                                    >
                                        <FaEnvelope size={24}/>
                                    </a>
                                </DockIcon>
                            </Dock>
                        </motion.div>
                    </motion.div>
                </div>
            </BlurFade>
        </section>
    );
}
