'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPostCardProps {
  post: {
    id: string;
    title: string;
    date: string;
    category: string;
    readTime: string;
    image: string;
    slug: string;
  };
  index: number;
}

export default function BlogPostCard({ post, index }: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-zinc-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-zinc-800"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
              {post.category}
            </span>
            <span className="text-gray-400 text-sm">{post.readTime}</span>
          </div>
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-400 text-sm">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </Link>
    </motion.div>
  );
} 