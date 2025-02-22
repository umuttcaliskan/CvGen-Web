import React from 'react'
import Banner from '@/components/Banner'
import BannerImage from '@/assets/images/cvtemplate.webp'
import { FaPlus, FaDownload, FaEdit, FaTrash } from 'react-icons/fa'
import Link from 'next/link'

function MyResumes() {
  // Not: Gerçek uygulamada bu veriler Firebase'den gelecek
  const dummyResumes = [
    {
      id: 1,
      title: "Yazılım Mühendisi CV'si",
      lastModified: "2024-03-20",
      template: "Modern"
    },
    {
      id: 2,
      title: "Öğretmen CV'si",
      lastModified: "2024-03-19",
      template: "Klasik"
    }
  ];

  return (
    <div>
      <Banner 
        title="Özgeçmişlerim" 
        description="Oluşturduğunuz tüm CV'lerinizi buradan yönetebilirsiniz." 
        imageSrc={BannerImage}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">CV'lerim</h2>
          <Link 
            href="/cv-olustur"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-all"
          >
            <FaPlus />
            Yeni CV Oluştur
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyResumes.map((resume) => (
            <div 
              key={resume.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2">{resume.title}</h3>
              <div className="text-sm text-gray-500 mb-4">
                <p>Son Düzenleme: {resume.lastModified}</p>
                <p>Şablon: {resume.template}</p>
              </div>
              
              <div className="flex gap-2">
                <button className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded hover:bg-primary/20 transition-colors">
                  <FaDownload className="text-sm" />
                  İndir
                </button>
                <button className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 px-3 py-1.5 rounded hover:bg-yellow-500/20 transition-colors">
                  <FaEdit className="text-sm" />
                  Düzenle
                </button>
                <button className="flex items-center gap-1 bg-red-500/10 text-red-600 px-3 py-1.5 rounded hover:bg-red-500/20 transition-colors">
                  <FaTrash className="text-sm" />
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyResumes
