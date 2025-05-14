import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';

const LatestBlogs = () => {
    // This would typically come from your API or CMS
    const blogs = [
        {
            title: "Getting Started with Next.js 14",
            date: "March 2024",
            link: "/blog/nextjs-14"
        },
        {
            title: "Modern Web Development Practices",
            date: "March 2024",
            link: "/blog/web-dev-practices"
        },
        {
            title: "The Future of Frontend Development",
            date: "February 2024",
            link: "/blog/frontend-future"
        },
        {
            title: "The Future of Frontend Development",
            date: "February 2024",
            link: "/blog/frontend-future"
        },
        {
            title: "The Future of Frontend Development",
            date: "February 2024",
            link: "/blog/frontend-future"
        }

    ];

    return (
        <div className="absolute top-[20%] right-8 w-[300px] rounded-xl bg-black/30 backdrop-blur-md p-6  shadow-2xl" >
            <div className="relative">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[20px] font-silk tracking-wider text-white/90">LATEST BLOGS</h3>
                    <Link href="/blog" className="text-white/80 hover:text-blue-400 transition-colors">
                        <HiArrowTopRightOnSquare className="w-5 h-5" />
                    </Link>
                </div>
                <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="group"
                        >
                            <Link href={blog.link}>
                                <div className="cursor-pointer p-3 rounded-lg transition-all duration-200 hover:bg-white/5">
                                    <p className="text-sm text-gray-400 font-silk">{blog.date}</p>
                                    <h4 className="text-lg text-white/80 group-hover:text-blue-400 transition-colors">
                                        {blog.title}
                                    </h4>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestBlogs;