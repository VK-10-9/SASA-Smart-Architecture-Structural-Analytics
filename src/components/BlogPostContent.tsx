'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

interface BlogPostContentProps {
  post: {
    title: string;
    date: string;
    category: string;
    readTime: string;
    image: string;
    author: string;
    authorTitle: string;
    content: string;
  };
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900 rounded-xl p-8 border border-zinc-800"
    >
      <Link
        href="/blog"
        className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Link>

      <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex items-center gap-6 mb-8">
        <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full">
          {post.category}
        </span>
        <div className="flex items-center text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <div className="flex items-center text-gray-400">
          <Clock className="w-4 h-4 mr-2" />
          {post.readTime}
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>

      {post.author && (
        <div className="mb-8">
          <p className="text-lg text-gray-400">
            By {post.author}
            {post.authorTitle && ` | ${post.authorTitle}`}
          </p>
        </div>
      )}

      <div 
        className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 prose-strong:text-white prose-code:text-blue-400 prose-pre:bg-zinc-800"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </motion.div>
  );
} 