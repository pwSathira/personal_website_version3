"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BlurFade from "@/components/ui/blur-fade";

function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return { month, day, year };
}

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                // Fetch posts from an API route we'll create
                const response = await fetch('/api/posts');
                if (!response.ok) throw new Error('Failed to fetch posts');
                const data = await response.json();
                setPosts(data);
                setFilteredPosts(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading posts:', error);
                setIsLoading(false);
            }
        }

        fetchPosts();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        
        if (!query.trim()) {
            setFilteredPosts(posts);
            return;
        }
        
        const filtered = posts.filter(
            post => 
                post.title.toLowerCase().includes(query) || 
                post.description.toLowerCase().includes(query)
        );
        setFilteredPosts(filtered);
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="container mx-auto px-4 py-16">
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                
                {isLoading ? (
                    <div className="text-center text-white py-10">
                        <p className="text-xl">Loading posts...</p>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center text-white py-10">
                        <p className="text-xl">No posts found matching your search.</p>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {filteredPosts.map((post) => {
                            const { month, day, year } = formatDate(post.date);
                            return (
                                <BlurFade key={post.id} delay={0.5} inView>
                                    <Link href={`/blog/${post.id}`} className="block">
                                        <article className={`bg-gray-800 rounded-lg p-6 text-white flex gap-6 transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg ${post.pinned ? 'border-l-4 border-blue-500' : ''}`}>
                                            <div className="flex-shrink-0 w-16 bg-gray-700 rounded-lg flex flex-col items-center justify-center text-center py-2">
                                                <div className="text-sm text-gray-400">{month}</div>
                                                <div className="text-xl font-bold">{day}</div>
                                                <div className="text-xs text-gray-400 mt-1">{year}</div>
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center mb-2">
                                                    <h2 className="text-2xl font-silk">{post.title}</h2>
                                                    {post.pinned && (
                                                        <div className="ml-2 bg-blue-500 text-xs text-white px-2 py-1 rounded-full flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                                            </svg>
                                                            Pinned
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-gray-400">{post.description}</p>
                                            </div>
                                        </article>
                                    </Link>
                                </BlurFade>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
} 