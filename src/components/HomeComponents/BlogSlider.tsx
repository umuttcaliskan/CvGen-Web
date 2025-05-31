"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/firebaseConfig';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import BannerImage from '@/assets/images/cvtemplate.webp';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  topic: string;
  createdAt: any;
  authorName: string;
}

const BlogSlider = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsQuery = query(
        collection(db, 'blogs'),
        orderBy('createdAt', 'desc'),
        limit(8)
      );
      
      const blogsSnapshot = await getDocs(blogsQuery);
      const posts = blogsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<BlogPost, 'id'>)
      }));
      
      setBlogPosts(posts);
    };

    fetchBlogs();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 4 >= blogPosts.length ? 0 : prevIndex + 4
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 4 < 0 ? Math.max(0, blogPosts.length - 4) : prevIndex - 4
    );
  };

  if (blogPosts.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Blog Yazılarımız</h2>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.slice(currentIndex, currentIndex + 4).map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="group">
                <article className="h-full bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="relative h-48">
                    <Image
                      src={post.imageUrl || BannerImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
                      {post.topic}
                    </span>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 line-clamp-3">{post.content}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {blogPosts.length > 4 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Önceki"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Sonraki"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSlider; 