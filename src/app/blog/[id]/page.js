import BlurFade from "@/components/ui/blur-fade";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';

async function getPost(id) {
    try {
        const postsDirectory = path.join(process.cwd(), 'src/content/blog');
        const fullPath = path.join(postsDirectory, `${id}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        const matterResult = matter(fileContents);
        const contentHtml = marked(matterResult.content);
        
        return {
            id,
            contentHtml,
            ...matterResult.data
        };
    } catch (error) {
        return null;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return { month, day, year };
}

export default async function BlogPost({ params }) {
    const post = await getPost(params.id);

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-3xl font-teko">Post not found</h1>
                </div>
            </div>
        );
    }

    const { month, day, year } = formatDate(post.date);

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="container mx-auto px-4 py-16">
                <BlurFade delay={0.3} inView>
                    <Link href="/blog" className="inline-flex items-center mb-6 text-blue-400 hover:text-blue-300 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Blog
                    </Link>
                    <article className="bg-gray-800 rounded-lg p-8 text-white">
                        <header className="mb-8 border-b border-gray-700 pb-6">
                            <h1 className="text-5xl font-teko mb-4">{post.title}</h1>
                            <div className="flex items-center text-gray-400">
                                <span className="inline-flex items-center mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {`${month} ${day}, ${year}`}
                                </span>
                            </div>
                        </header>
                        <div 
                            className="text-lg leading-relaxed prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                        />
                    </article>
                </BlurFade>
            </div>
        </div>
    );
} 