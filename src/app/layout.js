import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function Layout({ children }) {
    return (
        <html lang="en">
        <body className={`min-h-screen bg-black text-white ${inter.className}`}>
        <header className="flex justify-between p-4">
            <nav>
                <ul className="flex space-x-4 text-sm uppercase tracking-wide">
                    <li><a href="#projects" className="hover:text-gray-400">.projects(1)</a></li>
                    <li><a href="#experience" className="hover:text-gray-400">.experience(2)</a></li>
                    <li><a href="#about" className="hover:text-gray-400">.about(3)</a></li>
                </ul>
            </nav>
        </header>
        {children}
        </body>
        </html>
    );
}
