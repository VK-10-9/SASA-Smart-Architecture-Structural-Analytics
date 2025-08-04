'use server';

import { getBlogPosts } from '@/lib/blog';
import BlogPostCard from '@/components/BlogPostCard';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">SASSA Blog</h1>
          <p className="text-xl text-gray-400">
            Insights, updates, and innovations in structural engineering
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
} 