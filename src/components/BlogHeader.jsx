import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/blog', label: 'All Posts' },
        { href: '/', label: 'Main Site' },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-black/50 backdrop-blur-lg' : 'bg-black/30 backdrop-blur-md'
            }`}
        >
            <div className="container mx-auto h-[80px]">
                <nav className="flex items-center justify-between h-full">
                    <Link 
                        href="/" 
                        className="hover:opacity-80 transition-opacity flex items-center gap-4"
                    >
                        <Image
                            src="/sw-logo-2024-trans.png"
                            alt="SW Logo"
                            width={50}
                            height={50}
                            priority
                            className="w-auto h-10"
                        />
                        <h2 className="text-3xl md:text-4xl tracking-wider font-teko mt-2">
                            SATHIRA WILLIAMS | BLOG
                        </h2>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-white/80 hover:text-white transition-colors duration-200 font-silk text-sm uppercase tracking-wider"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white/80 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/90 backdrop-blur-lg"
                    >
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-white/80 hover:text-white transition-colors duration-200 font-silk text-sm uppercase tracking-wider py-2"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header; 