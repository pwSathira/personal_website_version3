
import {FaLinkedin, FaTwitter, FaFilePdf, FaEnvelope} from 'react-icons/fa';
import CopyButton from "@/components/ui/CopyButton";

export default function About() {
    return (
        <section id="about"
                 className="min-h-screen p-10 bg-gray-800 text-white flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg max-w-2xl text-center mb-8">
                Hey, I'm Sathira! I am a fullstack software engineer based in Toronto, Canada. I am currently studying
                at York University as a Software Engineering student.
            </p>
            <p className="text-lg max-w-2xl text-center mb-8"> I am passionate about building software solutions and
                learning new technologies. I am always looking for new opportunities to learn and grow as a developer.
                Feel free to reach out to me on my email:
            </p>
            <div className="flex items-center space-x-2 mb-8 bg-gray-900 rounded-md">
                <p className="text-xl m-2">sathira.williams@gmail.com</p>
                <CopyButton text="sathira.williams@gmail.com"/>
            </div>
            {/*<p className="text-lg max-w-2xl text-center mb-8">*/}
            {/*    My twitter contains a daily log of my progress learning new technologies and building projects. I am always looking for new projects to work on and new people to connect with. Feel free to reach out to me on any of my social media platforms!*/}
            {/*</p>*/}
            {/* Social Media Links */}
            <div className="flex space-x-8">
                <a
                    href="https://www.linkedin.com/in/pwSathira/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-500 transition-colors duration-200"
                    aria-label="LinkedIn"
                >
                    <FaLinkedin size={36}/>
                </a>
                <a
                    href="https://drive.google.com/file/d/1AfqHo7Ysz6C7jYDawVSYnAzfehm02uEb/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-500 transition-colors duration-200"
                    aria-label="Resume"
                >
                    <FaFilePdf size={36}/>
                </a>
                {/*email*/}
                <a
                    href="mailto:sathira.williams@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-500 transition-colors duration-200"
                    aria-label="Email"
                >
                    <FaEnvelope size={36}/>
                </a>
                <a
                    href="https://twitter.com/@Sathira_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400 transition-colors duration-200"
                    aria-label="Twitter"
                >
                    <FaTwitter size={36}/>
                </a>
            </div>
        </section>
    );
}
