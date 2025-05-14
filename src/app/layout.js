"use client";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navigation from "../components/Navigation";
import Header from "../components/BlogHeader";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
    const pathname = usePathname();
    const isBlogPage = pathname?.startsWith('/blog');

    return (
        <html lang="en">
        <body className={`min-h-screen bg-black text-white ${inter.className} overscroll-none`}>
        {isBlogPage ? (
            <Header />
        ) : (
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-5 bg-black/30 backdrop-blur-md">
                <Navigation/>
            </div>
        )}
        <main className={`${isBlogPage ? 'pt-20' : 'pt-20'}`}>
            {children}
        </main>
        </body>
        </html>
    );
}
