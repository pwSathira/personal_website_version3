import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { useState, useEffect } from 'react';

const LatestBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await fetch('/api/posts');
                if (!response.ok) throw new Error('Failed to fetch blog posts');
                
                const data = await response.json();
                // Limit to 5 most recent posts
                const recentBlogs = data.slice(0, 5).map(post => ({
                    title: post.title,
                    date: new Date(post.date).toLocaleDateString('default', { month: 'long', year: 'numeric' }),
                    link: `/blog/${post.id}`
                }));
                
                setBlogs(recentBlogs);
            } catch (error) {
                console.error('Error loading blog posts:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    return (
        <div className="absolute top-[20%] right-8 w-[300px] rounded-xl bg-black/30 backdrop-blur-md p-6 shadow-2xl" >
            <div className="relative">
                <div className="flex items-center justify-between mb-6 group">
                    <Link href="/blog" className="text-[20px] font-silk tracking-wider text-white/90 group-hover:text-blue-400 transition-colors">
                        LATEST BLOGS
                    </Link>
                    <Link href="/blog" className="text-white/80 group-hover:text-blue-400 transition-colors">
                        <HiArrowTopRightOnSquare className="w-5 h-5" />
                    </Link>
                </div>
                <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {isLoading ? (
                        <p className="text-white/70 text-center">Loading blogs...</p>
                    ) : blogs.length === 0 ? (
                        <p className="text-white/70 text-center">No blog posts found</p>
                    ) : (
                        blogs.map((blog, index) => (
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
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default LatestBlogs;