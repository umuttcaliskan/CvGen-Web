import React from 'react'
import { db } from '@/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeft, FaUser, FaClock } from 'react-icons/fa'
import BannerImage from '@/assets/images/cvtemplate.webp'
import ShareButtons from '@/components/ShareButtons'

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

// Sayfa parametrelerinin tipi
interface PageProps {
  params: {
    id: string;
  }
}

async function BlogPost({ params }: PageProps) {
  // Firestore'dan blog verisini çek
  const blogDoc = await getDoc(doc(db, 'blogs', params.id));
  
  if (!blogDoc.exists()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog yazısı bulunamadı</h1>
          <Link 
            href="/blog"
            className="text-primary hover:underline inline-flex items-center gap-2"
          >
            <FaArrowLeft /> Blog sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  const post = {
    id: blogDoc.id,
    ...blogDoc.data()
  } as BlogPost;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Bölümü */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={post.imageUrl || BannerImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-4 text-white">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <FaArrowLeft /> Blog'a Dön
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/80">
              <span className="inline-flex items-center gap-2">
                <FaUser /> {post.authorName}
              </span>
              <span className="inline-flex items-center gap-2">
                <FaClock />
                {new Date(post.createdAt).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              <span className="px-3 py-1 bg-primary/20 text-white rounded-full text-sm">
                {post.topic}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* İçerik Bölümü */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <article className="bg-white rounded-2xl shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            {/* İçeriği paragraflara böl */}
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Paylaşım Butonları */}
          <ShareButtons title={post.title} />
        </article>
      </div>
    </main>
  )
}

export default BlogPost 