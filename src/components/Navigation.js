'use client';

import { useState, useRef, useEffect } from 'react';

export default function Navigation() {
    const [activeIndex, setActiveIndex] = useState(0);
    const navItemsRef = useRef([]);
    const [indicatorStyle, setIndicatorStyle] = useState({});

    const navItems = [
        { label: '.home(0)', id: 'home' },
        { label: '.projects(1)', id: 'projects' },
        { label: '.about(2)', id: 'about' },
    ];

    const handleNavClick = (e, index, id) => {
        e.preventDefault();
        setActiveIndex(index);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const updateIndicator = () => {
            const activeItem = navItemsRef.current[activeIndex];
            if (activeItem) {
                const { offsetLeft, offsetWidth } = activeItem;
                setIndicatorStyle({
                    transform: `translateX(${offsetLeft + offsetWidth / 2 - 6}px)`,
                });
            }
        };
        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [activeIndex]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            let currentIndex = 0;
            navItems.forEach((item, index) => {
                const section = document.getElementById(item.id);
                if (section) {
                    const { offsetTop, offsetHeight } = section;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        currentIndex = index;
                    }
                }
            });
            setActiveIndex(currentIndex);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="relative">
            <ul className="flex space-x-4 text-lg uppercase tracking-wide font-silk">
                {navItems.map((item, index) => (
                    <li
                        key={index}
                        ref={(el) => (navItemsRef.current[index] = el)}
                    >
                        <a
                            href="#"
                            className="hover:text-gray-400"
                            onClick={(e) => handleNavClick(e, index, item.id)}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
            <span
                className="absolute top-8 h-3 w-3 bg-white transition-transform duration-300 rounded-full"
                style={indicatorStyle}
            />
        </nav>
    );
}
