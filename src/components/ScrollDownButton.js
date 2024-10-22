'use client';

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function ScrollDownButton({ targetId }) {
    const handleClick = () => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex justify-center mt-10">
                <ChevronDown
                    className="w-20 h-2/5 animate-bounceDown delay-1s cursor-pointer border
                        border-input hover:bg-accent hover:text-accent-foreground hover:border-transparent rounded-md"
                    onClick={() => {
                        document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'});
                    }}
                />
        </div>
    );
}
