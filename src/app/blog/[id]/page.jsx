import { db } from '@/firebaseConfig'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeft, FaUser, FaClock } from 'react-icons/fa'
import BannerImage from '@/assets/images/cvtemplate.webp'
import ShareButtons from '@/components/ShareButtons'
import { Fragment } from 'react'
import { Metadata } from 'next'

// Statik sayfa yenileme süresini ayarlıyoruz
export const revalidate = 3600; // Her saat başı yenileme

export async function generateStaticParams() {
  const blogsRef = collection(db, 'blogs');
  const snapshot = await getDocs(blogsRef);
  
  return snapshot.docs.map((doc) => ({
    id: doc.id
  }));
}

export async function generateMetadata({ params }) {
  const blogDoc = await getDoc(doc(db, 'blogs', params.id));
  const post = blogDoc.exists() ? blogDoc.data() : null;
  return {
    title: post?.title ? `${post.title} | CV Blogu | Ücretsiz ve Hızlı CV Oluştur` : 'Blog Yazısı',
    description: post?.content?.substring(0, 160) + ' - Ücretsiz ve dakikalar içinde CV oluşturmanın püf noktaları, kariyer ve iş başvurusu blog yazıları.' || 'Blog içeriği',
    keywords: `cv blog, ücretsiz cv, hızlı cv hazırlama, kariyer blog, iş başvurusu, cv ipuçları, cv oluşturucu, ${post?.topic}`,
    openGraph: {
      title: post?.title ? `${post.title} | CV Blogu` : 'Blog Yazısı',
      description: post?.content?.substring(0, 160) + ' - Ücretsiz ve hızlı CV hazırlama, kariyer ve iş başvurusu blog yazıları.' || 'Blog içeriği',
      type: 'article',
      url: `https://cvgen.com.tr/blog/${params.id}`,
    },
  }
}

const BlogPage = async ({ params }) => {
  const { id } = params;
  
  const blogDoc = await getDoc(doc(db, 'blogs', id));
  
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
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.content?.substring(0, 160) || '',
    "author": {
      "@type": "Person",
      "name": post.authorName
    },
    "datePublished": post.createdAt,
    "image": post.imageUrl || '',
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://cvgen.com.tr/blog/${post.id}`
    }
  };

  return (
    <Fragment>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
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
    </Fragment>
  );
}

export default BlogPage; 