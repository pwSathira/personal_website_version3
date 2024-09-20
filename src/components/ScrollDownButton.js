'use client';

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function ScrollDownButton({ targetId }) {
    const handleClick = () => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex justify-center mt-10">
            <Button size="lg" variant="ghost" onClick={handleClick}>
                <ChevronDown className="h-7 w-7 animate-bounceDown delay-1s" />
            </Button>
        </div>
    );
}
