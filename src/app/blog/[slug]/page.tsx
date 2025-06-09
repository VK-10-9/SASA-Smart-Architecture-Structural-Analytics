import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import BlogPostContent from '@/components/BlogPostContent';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

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

  // Serialize the post data to ensure it's safe to pass to client components
  const serializedPost = {
    title: post.title,
    date: post.date,
    category: post.category,
    readTime: post.readTime,
    image: post.image,
    author: post.author,
    authorTitle: post.authorTitle,
    content: post.content,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogPostContent post={serializedPost} />
      </div>
    </div>
  );
} 