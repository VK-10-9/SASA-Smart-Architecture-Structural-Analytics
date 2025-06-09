import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const blogDirectory = join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  slug: string;
  author?: string;
  authorTitle?: string;
  content: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = readdirSync(blogDirectory);
    const allPostsData = await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = join(blogDirectory, fileName);
        const fileContents = readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        // Use remark to convert markdown into HTML string
        const processedContent = await remark()
          .use(html)
          .process(content);
        const contentHtml = processedContent.toString();

        return {
          id: slug,
          slug,
          content: contentHtml,
          ...data,
        } as BlogPost;
      })
    );

    // Sort posts by date
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = join(blogDirectory, `${slug}.md`);
    const fileContents = readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      id: slug,
      slug,
      content: contentHtml,
      ...data,
    } as BlogPost;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
} 