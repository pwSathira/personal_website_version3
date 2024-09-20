import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation"; // Adjust the path if necessary

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Sathira Williams",
    description: "Made by Sathira Williams",
};

export default function Layout({ children }) {
    return (
        <html lang="en">
        <body className={`min-h-screen bg-black text-white ${inter.className}`}>
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-5 bg-black bg-opacity-50">
            <Navigation/>
        </header>
        <main className="pt-20">
            {children}
        </main>
        </body>
        </html>
    );
}
