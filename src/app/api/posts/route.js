import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'src/content/blog');
    const fileNames = fs.readdirSync(postsDirectory);
    
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        
        return {
          id,
          pinned: matterResult.data.pinned || false,
          ...matterResult.data
        };
      });

    // Sort posts by pinned status first, then by date
    const sortedPosts = allPostsData.sort((a, b) => {
      // First sort by pinned status (pinned posts come first)
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      
      // Then sort by date (newest first)
      return a.date < b.date ? 1 : -1;
    });
    
    return NextResponse.json(sortedPosts);
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to load blog posts' },
      { status: 500 }
    );
  }
} 