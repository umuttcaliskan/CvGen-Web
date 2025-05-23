import React, { Fragment } from 'react'
import BannerGray from '@/components/BannerGray'
import BannerImage from '@/assets/images/cvtemplate.webp'
import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/firebaseConfig'
import { collection, getDocs, orderBy, query, DocumentData } from 'firebase/firestore'
import Script from 'next/script'

interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  topic: string;
  createdAt: any;
  authorName: string;
}

// Tarih formatlama fonksiyonu
function formatDate(date: any) {
  const d = new Date(date);
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  
  return {
    day: d.getDate(),
    month: months[d.getMonth()],
    year: d.getFullYear()
  };
}

export const metadata = {
  title: 'CV Blogu | Ücretsiz CV Hazırlama ve Kariyer İpuçları',
  description: 'Ücretsiz ve hızlı CV hazırlama, iş başvurusu ve kariyer gelişimi hakkında güncel blog yazıları. Dakikalar içinde profesyonel CV oluşturmanın püf noktaları burada!',
  keywords: 'cv blog, ücretsiz cv, hızlı cv hazırlama, kariyer blog, iş başvurusu, cv ipuçları, cv oluşturucu, cv maker, cv generator, cv hazırlama rehberi, kariyer tavsiyeleri',
  openGraph: {
    title: 'CV Blogu | Ücretsiz CV Hazırlama ve Kariyer İpuçları',
    description: 'Ücretsiz ve hızlı CV hazırlama, iş başvurusu ve kariyer gelişimi hakkında güncel blog yazıları. Dakikalar içinde profesyonel CV oluşturmanın püf noktaları burada!',
    url: 'https://cvgen.com.tr/blog',
    type: 'website',
  },
}

async function Blog() {
  const blogsQuery = query(
    collection(db, 'blogs'),
    orderBy('createdAt', 'desc')
  );
  
  const blogsSnapshot = await getDocs(blogsQuery);
  const blogPosts: BlogPost[] = blogsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<BlogPost, 'id'>)
  }));

  // Schema.org BlogPosting JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "CV Blogu | Ücretsiz CV Hazırlama ve Kariyer İpuçları",
    "description": "Ücretsiz ve hızlı CV hazırlama, iş başvurusu ve kariyer gelişimi hakkında güncel blog yazıları. Dakikalar içinde profesyonel CV oluşturmanın püf noktaları burada!",
    "url": "https://cvgen.com.tr/blog"
  };

  return (
    <Fragment>
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="min-h-screen">
        <main className="min-h-screen bg-gray-50">
          <BannerGray 
            title="Blog" 
            description="CV hazırlama ve kariyer gelişimi hakkında faydalı içerikler" 
            imageSrc={BannerImage}
          />
          <h1 className="sr-only">CV Hazırlama ve Kariyer Gelişimi Blogu - Ücretsiz CV İpuçları ve Rehberler</h1>

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
                        {(() => {
                          const date = formatDate(blogPosts[0].createdAt);
                          return `${date.day} ${date.month} ${date.year}`;
                        })()}
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
                          {(() => {
                            const date = formatDate(post.createdAt);
                            return `${date.day} ${date.month}`;
                          })()}
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
      </div>
    </Fragment>
  )
}

export default Blog
