'use client';

import React, { useEffect, useState } from 'react'
import Banner from '@/components/Banner'
import BannerImage from '@/assets/images/cvtemplate.webp'
import { FaPlus, FaDownload, FaEdit, FaTrash } from 'react-icons/fa'
import Link from 'next/link'
import { db } from '@/firebaseConfig'
import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import TemplateSelectModal from '@/components/TemplateSelectModal'
import MobileApp from '@/components/HomeComponents/MobileApp'

interface Resume {
  id: string;
  title: string;
  lastModified: string;
  template: string;
  userId: string;
}

function MyResumes() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [selectedCvData, setSelectedCvData] = useState<any>(null);

  // CV'leri Firestore'dan çek
  useEffect(() => {
    const fetchResumes = async () => {
      if (!user) {
        router.push('/giris-yap');
        return;
      }

      try {
        const resumesQuery = query(
          collection(db, 'cvs'),
          where('userId', '==', user.uid)
        );

        const querySnapshot = await getDocs(resumesQuery);
        const fetchedResumes: Resume[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedResumes.push({
            id: doc.id,
            title: data.title || 'İsimsiz CV',
            lastModified: data.updatedAt?.toDate().toLocaleDateString('tr-TR') || 'Bilinmiyor',
            template: data.template || 'Modern',
            userId: data.userId
          });
        });

        setResumes(fetchedResumes);
      } catch (error) {
        console.error('CV\'ler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [user, router]);

  // CV silme işlemi
  const handleDeleteResume = async (resumeId: string) => {
    if (!confirm('Bu CV\'yi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'cvs', resumeId));
      setResumes(resumes.filter(resume => resume.id !== resumeId));
    } catch (error) {
      console.error('CV silinirken hata:', error);
      alert('CV silinirken bir hata oluştu');
    }
  };

  // CV indirme işlemi
  const handleDownload = async (resumeId: string) => {
    try {
      // Önce CV verilerini alma
      const cvDoc = await getDoc(doc(db, 'cvs', resumeId));
      if (!cvDoc.exists()) {
        throw new Error('CV bulunamadı');
      }

      const rawData = cvDoc.data();
      const cvData = {
        title: rawData.title || '',
        personal: rawData.personal || null,
        about: rawData.about || null,
        education: Array.isArray(rawData.education) ? rawData.education : null,
        experience: Array.isArray(rawData.experience) ? rawData.experience : null,
        skills: Array.isArray(rawData.skills) ? rawData.skills : null,
        languages: Array.isArray(rawData.languages) ? rawData.languages : null,
        references: Array.isArray(rawData.references) ? rawData.references : null,
        certificates: Array.isArray(rawData.certificates) ? rawData.certificates : null
      };

      console.log('İşlenmiş CV verileri:', cvData);

      setSelectedCvData(cvData);
      setSelectedResumeId(resumeId);
      setIsTemplateModalOpen(true);
    } catch (error) {
      console.error('CV verilerini alma hatası:', error);
      alert('CV verileri alınırken bir hata oluştu');
    }
  };

  const handleTemplateSelect = async (templateId: string) => {
    console.log('Seçilen şablon:', templateId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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

        {resumes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Henüz bir CV oluşturmadınız.</p>
            <Link 
              href="/cv-olustur"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-all"
            >
              <FaPlus />
              İlk CV'nizi Oluşturun
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
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
                  <button 
                    className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded hover:bg-primary/20 transition-colors"
                    onClick={() => handleDownload(resume.id)}
                  >
                    <FaDownload className="text-sm" />
                    İndir
                  </button>
                  <Link 
                    href={`/cv-olustur?edit=${resume.id}`}
                    className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 px-3 py-1.5 rounded hover:bg-yellow-500/20 transition-colors"
                  >
                    <FaEdit className="text-sm" />
                    Düzenle
                  </Link>
                  <button 
                    onClick={() => handleDeleteResume(resume.id)}
                    className="flex items-center gap-1 bg-red-500/10 text-red-600 px-3 py-1.5 rounded hover:bg-red-500/20 transition-colors"
                  >
                    <FaTrash className="text-sm" />
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <MobileApp />

      <TemplateSelectModal
        isOpen={isTemplateModalOpen}
        onClose={() => {
          setIsTemplateModalOpen(false);
          setSelectedCvData(null);
          setSelectedResumeId(null);
        }}
        onSelectTemplate={handleTemplateSelect}
        cvData={selectedCvData}
      />
    </div>
  )
}

export default MyResumes
