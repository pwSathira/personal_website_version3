import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md h-[80px]">
            <div className="container mx-auto h-full px-4 py-3">
                <nav className="flex items-center h-full gap-6">
                    <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-6">
                        <Image
                            src="/sw-logo-2024-trans.png"
                            alt="SW Logo"
                            width={50}
                            height={50}
                            priority
                            className="w-auto h-10"
                        />
                        <h2 className="text-4xl tracking-wider font-teko">
                            SATHIRA WILLIAMS | BLOG
                        </h2>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header; 