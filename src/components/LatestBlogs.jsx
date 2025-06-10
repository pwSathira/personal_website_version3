import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { useState, useEffect } from 'react';

const LatestBlog = () => {
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchBlog() {
            try {
                const response = await fetch('/api/posts');
                if (!response.ok) throw new Error('Failed to fetch blog post');
                
                const data = await response.json();
                const sortedPosts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                const latestBlog = sortedPosts[0] ? {
                    title: sortedPosts[0].title,
                    date: new Date(sortedPosts[0].date).toLocaleDateString('default', { month: 'long', year: 'numeric' }),
                    link: `/blog/${sortedPosts[0].id}`
                } : null;
                
                setBlog(latestBlog);
            } catch (error) {
                console.error('Error loading blog post:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchBlog();
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-[20%] right-8 w-[320px] rounded-xl bg-black/30 backdrop-blur-lg p-4 shadow-2xl border border-white/10"
        >
            <div className="relative">
                <div className="flex items-center justify-between mb-4 group">
                    <Link href="/blog" className="text-[18px] font-silk tracking-wider text-white/90 group-hover:text-blue-400 transition-colors duration-300">
                        LATEST BLOG
                    </Link>
                    <Link href="/blog" className="text-white/80 group-hover:text-blue-400 transition-colors duration-300">
                        <HiArrowTopRightOnSquare className="w-4 h-4" />
                    </Link>
                </div>
                <div className="space-y-3">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-4">
                            <div className="animate-pulse text-white/70">Loading blog...</div>
                        </div>
                    ) : !blog ? (
                        <div className="text-center py-4 text-white/70">
                            No blog posts found
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="group"
                        >
                            <Link href={blog.link}>
                                <div className="cursor-pointer p-3 rounded-lg transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-white/10">
                                    <p className="text-xs text-blue-400/80 font-silk mb-1">{blog.date}</p>
                                    <h4 className="text-base text-white/90 group-hover:text-blue-400 transition-colors duration-300 leading-snug">
                                        {blog.title}
                                    </h4>
                                    <div className="mt-2 flex items-center text-xs text-white/60 group-hover:text-blue-400/80 transition-colors duration-300">
                                        Read more
                                        <HiArrowTopRightOnSquare className="w-3 h-3 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default LatestBlog;