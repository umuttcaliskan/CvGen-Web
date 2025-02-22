import React from 'react'
import Banner from '@/components/Banner'
import BannerImage from '@/assets/images/cvtemplate.webp'
import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/firebaseConfig'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

// Typescript için blog tipi tanımı
interface BlogPost {
  id: string;
  title: string;
  content: string;
  topic: string;
  imageUrl: string;
  authorName: string;
  createdAt: string;
}

// Next.js 13+ için async component
async function Blog() {
  // Firestore'dan blog verilerini çek
  const blogsQuery = query(
    collection(db, 'blogs'),
    orderBy('createdAt', 'desc')
  );
  
  const blogsSnapshot = await getDocs(blogsQuery);
  const blogPosts: BlogPost[] = blogsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as Omit<BlogPost, 'id'>
  }));

  return (
    <main className="min-h-screen bg-gray-50">
      <Banner 
        title="Blog" 
        description="CV hazırlama ve kariyer gelişimi hakkında faydalı içerikler" 
        imageSrc={BannerImage}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Öne Çıkan Blog Yazısı */}
        {blogPosts[0] && (
          <Link href={`/blog/${blogPosts[0].id}`} className="group block mb-16">
            <article className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-[400px] md:h-full">
                <Image
                  src={blogPosts[0].imageUrl || BannerImage}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {blogPosts[0].topic}
                  </span>
                  <time className="text-gray-500 text-sm">
                    {new Date(blogPosts[0].createdAt).toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </time>
                </div>
                <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {blogPosts[0].content}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-medium group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                    Devamını Oku 
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-500">
                    {blogPosts[0].authorName}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* Diğer Blog Yazıları */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group">
              <article className="h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-56">
                  <Image
                    src={post.imageUrl || BannerImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {post.topic}
                    </span>
                    <time className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long'
                      })}
                    </time>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-primary font-medium group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                      Devamını Oku 
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-500">
                      {post.authorName}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Blog
