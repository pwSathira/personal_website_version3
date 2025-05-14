"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Header from "./BlogHeader";

export default function NavigationWrapper() {
    const pathname = usePathname();
    const isBlogPage = pathname?.startsWith('/blog');

    return (
        <>
            {isBlogPage ? (
                <Header />
            ) : (
                <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-5 bg-black/30 backdrop-blur-md">
                    <Navigation />
                </div>
            )}
        </>
    );
} 