'use server';

import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import BlogPostContent from '@/components/BlogPostContent';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogPostContent post={post} />
      </div>
    </div>
  );
} 