'use client';

import React, { useEffect, useState } from 'react'
import Banner from '@/components/Banner'
import BannerImage from '@/assets/images/cvtemplate.webp'
import { FaPlus, FaDownload, FaEdit, FaTrash, FaEye, FaFileAlt, FaUser, FaLanguage, FaAward, FaEnvelope, FaPhone, FaExternalLinkAlt, FaProjectDiagram, FaGraduationCap, FaBriefcase, FaTools, FaUserCheck, FaGlobe, FaBug } from 'react-icons/fa'
import Link from 'next/link'
import { db } from '@/firebaseConfig'
import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import TemplateSelectModal from '@/components/TemplateSelectModal'
import MobileApp from '@/components/HomeComponents/MobileApp'
import ViewCVModal from '@/components/ViewCVModal'
import ReportBugModal from '@/components/ReportBugModal'

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
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewCvData, setViewCvData] = useState<any>(null);
  const [isReportBugModalOpen, setIsReportBugModalOpen] = useState(false);

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
        certificates: Array.isArray(rawData.certificates) ? rawData.certificates : null,
        projects: Array.isArray(rawData.projects) ? rawData.projects : null,
        socialMedia: Array.isArray(rawData.socialMedia) ? rawData.socialMedia : null
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
    try {
      console.log('Seçilen şablon:', templateId);
      
      if (!selectedResumeId || !selectedCvData) {
        throw new Error('CV verileri bulunamadı');
      }
      
      // Burada seçilen şablona göre PDF veya DOCX oluşturma işlemi yapılabilir
      // Örnek basit bir mesaj gösterimi:
      alert(`${selectedCvData.title || 'CV'} başlıklı özgeçmişiniz ${templateId} şablonu ile hazırlanıyor...`);
      
      // İndirme işlemi burada gerçekleştirilecek
      // NOT: Gerçek uygulamada, bu işlem için bir API çağrısı yapılabilir
      // veya client-side PDF oluşturma kütüphanesi kullanılabilir
      
      setIsTemplateModalOpen(false);
      setSelectedCvData(null);
      setSelectedResumeId(null);
    } catch (error) {
      console.error('CV indirme hatası:', error);
      alert('CV indirme sırasında bir hata oluştu');
    }
  };

  // CV görüntüleme işlemi
  const handleViewResume = async (resumeId: string) => {
    try {
      const cvDoc = await getDoc(doc(db, 'cvs', resumeId));
      if (!cvDoc.exists()) {
        throw new Error('CV bulunamadı');
      }

      const rawData = cvDoc.data();
      setViewCvData(rawData);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error('CV verilerini alma hatası:', error);
      alert('CV verileri alınırken bir hata oluştu');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative">
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
                
                <div className="flex flex-col gap-3">
                  {/* Ana işlemler - Daha belirgin butonlar */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link 
                      href={`/cv-olustur?edit=${resume.id}`}
                      className="flex items-center justify-center gap-1.5 bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/90 transition-all font-medium text-sm"
                    >
                      <FaEdit className="text-sm" />
                      Düzenle
                    </Link>
                    <button 
                      className="flex items-center justify-center gap-1.5 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-all font-medium text-sm"
                      onClick={() => handleViewResume(resume.id)}
                    >
                      <FaEye className="text-sm" />
                      Görüntüle
                    </button>
                  </div>
                  
                  {/* İkincil işlemler - Daha az belirgin butonlar */}
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      className="flex items-center justify-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition-all text-sm"
                      onClick={() => handleDownload(resume.id)}
                    >
                      <FaDownload className="text-sm" />
                      İndir
                    </button>
                    <button 
                      onClick={() => handleDeleteResume(resume.id)}
                      className="flex items-center justify-center gap-1.5 bg-gray-100 text-red-600 px-3 py-2 rounded-md hover:bg-red-50 hover:border-red-200 transition-all text-sm"
                    >
                      <FaTrash className="text-sm" />
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Önce MobileApp bileşenini, sonra diğer modalları yerleştirelim */}
      <MobileApp />

      {/* Sabit konumlandırılmış Hata Bildir butonu */}
      <button
        onClick={() => setIsReportBugModalOpen(true)}
        className="fixed bottom-6 right-6 bg-white shadow-lg border border-gray-200 text-gray-700 py-3 px-5 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 z-10"
      >
        <FaBug className="text-red-500" />
        Hata Bildir
      </button>

      {/* CV Görüntüleme Modalı */}
      {isViewModalOpen && viewCvData && (
        <ViewCVModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          viewCvData={viewCvData}
        />
      )}

      <ReportBugModal
        isOpen={isReportBugModalOpen}
        onClose={() => setIsReportBugModalOpen(false)}
      />

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
