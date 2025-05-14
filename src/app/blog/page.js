"use client";
import { useState } from 'react';
import BlurFade from "@/components/ui/blur-fade";

export default function Blog() {
    const [posts] = useState([
        {
            id: 1,
            title: "Welcome to My Blog",
            date: "2024-03-21",
            content: "This is my first blog post. Stay tuned for more content about software engineering, web development, and my journey as a developer.",
        },
    ]);

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="container mx-auto px-4 py-16">
                <BlurFade delay={0.3} inView>
                    <h1 className="text-4xl font-teko text-white mb-8 tracking-wider">BLOG</h1>
                </BlurFade>
                
                <div className="grid gap-8">
                    {posts.map((post) => (
                        <BlurFade key={post.id} delay={0.5} inView>
                            <article className="bg-gray-800 rounded-lg p-6 text-white">
                                <h2 className="text-2xl font-teko mb-2">{post.title}</h2>
                                <p className="text-gray-400 text-sm mb-4">{post.date}</p>
                                <p className="font-silk">{post.content}</p>
                            </article>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </div>
    );
} 