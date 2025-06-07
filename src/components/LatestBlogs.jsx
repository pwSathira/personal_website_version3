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
                // Sort posts by date in descending order and get the most recent one
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
        <div className="absolute top-[20%] right-8 w-[300px] rounded-xl bg-black/30 backdrop-blur-md p-6 shadow-2xl" >
            <div className="relative">
                <div className="flex items-center justify-between mb-6 group">
                    <Link href="/blog" className="text-[20px] font-silk tracking-wider text-white/90 group-hover:text-blue-400 transition-colors">
                        LATEST BLOG
                    </Link>
                    <Link href="/blog" className="text-white/80 group-hover:text-blue-400 transition-colors">
                        <HiArrowTopRightOnSquare className="w-5 h-5" />
                    </Link>
                </div>
                <div className="space-y-6">
                    {isLoading ? (
                        <p className="text-white/70 text-center">Loading blog...</p>
                    ) : !blog ? (
                        <p className="text-white/70 text-center">No blog posts found</p>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default LatestBlog;