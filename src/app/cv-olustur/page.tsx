'use client';

import React, { useState, useEffect } from 'react';
import Banner from '@/components/Banner';
import BannerImage from '@/assets/images/cvtemplate.webp';
import { FaUser, FaFileAlt, FaGraduationCap, FaCertificate, FaBriefcase, FaStar, FaGlobe, FaUsers, FaCheck, FaChevronRight } from 'react-icons/fa';
import { db, auth } from '@/firebaseConfig';
import { collection, addDoc, updateDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AboutModal from '@/components/CreateComponents/AboutModal';
import CertificatesModal from '@/components/CreateComponents/CertificatesModal';
import EducationModal from '@/components/CreateComponents/EducationModal';
import ExperienceModal from '@/components/CreateComponents/ExperienceModal';
import LanguagesModal from '@/components/CreateComponents/LanguagesModal';
import PersonalInfoModal from '@/components/CreateComponents/PersonalInfoModal';
import ReferencesModal from '@/components/CreateComponents/ReferencesModal';
import SkillsModal from '@/components/CreateComponents/SkillsModal';

// CV bölümleri için tip tanımı
interface CVSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  completed: boolean;
}

// CV verisi için tip tanımı
interface CVData {
  title: string;
  personal: {
    fullName: string;
    email: string;
    phone: string;
    birthDate: string;
    address: string;
  } | null;
  about: string | null;
  education: Array<{
    id: string;
    schoolName: string;
    department: string;
    startDate: string;
    endDate: string;
  }> | null;
  certificates: Array<{
    id: string;
    name: string;
    institution: string;
    date: string;
  }> | null;
  experience: Array<{
    id: string;
    companyName: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }> | null;
  skills: Array<{
    id: string;
    name: string;
    level: string;
  }> | null;
  languages: Array<{
    id: string;
    name: string;
    level: string;
  }> | null;
  references: Array<{
    id: string;
    fullName: string;
    company: string;
    position: string;
    phone: string;
    email: string;
  }> | null;
}

export default function CreateCV() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const [isEditMode, setIsEditMode] = useState(false);
  
  // CV bölümlerinin tanımlanması
  const [cvSections, setCvSections] = useState<CVSection[]>([
    {
      id: 'personal',
      title: 'Kişisel Bilgiler',
      icon: <FaUser className="text-xl" />,
      description: 'Ad, soyad, iletişim bilgileri ve diğer kişisel detaylar',
      completed: false
    },
    {
      id: 'about',
      title: 'Hakkımda',
      icon: <FaFileAlt className="text-xl" />,
      description: 'Kendinizi tanıtan kısa bir özet',
      completed: false
    },
    {
      id: 'education',
      title: 'Eğitim Bilgilerim',
      icon: <FaGraduationCap className="text-xl" />,
      description: 'Eğitim geçmişiniz ve akademik başarılarınız',
      completed: false
    },
    {
      id: 'certificates',
      title: 'Sertifikalarım',
      icon: <FaCertificate className="text-xl" />,
      description: 'Aldığınız sertifikalar ve başarı belgeleri',
      completed: false
    },
    {
      id: 'experience',
      title: 'İş Deneyimlerim',
      icon: <FaBriefcase className="text-xl" />,
      description: 'Geçmiş iş deneyimleriniz ve başarılarınız',
      completed: false
    },
    {
      id: 'skills',
      title: 'Beceriler',
      icon: <FaStar className="text-xl" />,
      description: 'Teknik ve kişisel becerileriniz',
      completed: false
    },
    {
      id: 'languages',
      title: 'Diller',
      icon: <FaGlobe className="text-xl" />,
      description: 'Bildiğiniz yabancı diller ve seviyeleri',
      completed: false
    },
    {
      id: 'references',
      title: 'Referanslar',
      icon: <FaUsers className="text-xl" />,
      description: 'Referans olarak gösterebileceğiniz kişiler',
      completed: false
    }
  ]);

  const [cvData, setCvData] = useState<CVData>({
    title: '',
    personal: null,
    about: null,
    education: null,
    certificates: null,
    experience: null,
    skills: null,
    languages: null,
    references: null
  });

  // CV verilerini yükle
  useEffect(() => {
    const loadCV = async () => {
      if (!editId || !user) return;

      try {
        const cvDoc = await getDoc(doc(db, 'cvs', editId));
        if (cvDoc.exists()) {
          const data = cvDoc.data();
          console.log('Firestore\'dan gelen ham veri:', data); // Debug için

          // Her bir alanı ayrı ayrı işleyip dönüştürelim
          const processedData: CVData = {
            title: data.title || 'İsimsiz CV',
            personal: data.personal ? {
              fullName: data.personal.fullName || '',
              email: data.personal.email || '',
              phone: data.personal.phone || '',
              birthDate: data.personal.birthDate || '',
              address: data.personal.address || ''
            } : null,
            
            about: typeof data.about === 'string' ? data.about : null,
            
            education: Array.isArray(data.education) ? data.education.map(edu => ({
              id: edu.id || crypto.randomUUID(),
              schoolName: edu.schoolName || '',
              department: edu.department || '',
              startDate: edu.startDate || '',
              endDate: edu.endDate || ''
            })) : null,
            
            certificates: Array.isArray(data.certificates) ? data.certificates.map(cert => ({
              id: cert.id || crypto.randomUUID(),
              name: cert.name || '',
              institution: cert.institution || '',
              date: cert.date || ''
            })) : null,
            
            experience: Array.isArray(data.experience) ? data.experience.map(exp => ({
              id: exp.id || crypto.randomUUID(),
              companyName: exp.companyName || '',
              position: exp.position || '',
              startDate: exp.startDate || '',
              endDate: exp.endDate || '',
              description: exp.description || ''
            })) : null,
            
            skills: Array.isArray(data.skills) ? data.skills.map(skill => ({
              id: skill.id || crypto.randomUUID(),
              name: skill.name || '',
              level: skill.level || ''
            })) : null,
            
            languages: Array.isArray(data.languages) ? data.languages.map(lang => ({
              id: lang.id || crypto.randomUUID(),
              name: lang.name || '',
              level: lang.level || ''
            })) : null,
            
            references: Array.isArray(data.references) ? data.references.map(ref => ({
              id: ref.id || crypto.randomUUID(),
              fullName: ref.fullName || '',
              company: ref.company || '',
              position: ref.position || '',
              phone: ref.phone || '',
              email: ref.email || ''
            })) : null
          };

          console.log('İşlenmiş veri:', processedData); // Debug için
          setCvData(processedData);

          // Tamamlanmış bölümleri işaretle
          const completedSections = Object.entries(processedData).reduce((acc: string[], [key, value]) => {
            if (value !== null && 
                (typeof value === 'string' || 
                 (Array.isArray(value) && value.length > 0) || 
                 (typeof value === 'object' && Object.keys(value).length > 0))) {
              acc.push(key);
            }
            return acc;
          }, []);

          console.log('Tamamlanmış bölümler:', completedSections); // Debug için

          setCvSections(prev => prev.map(section => ({
            ...section,
            completed: completedSections.includes(section.id)
          })));

          setIsEditMode(true);
        }
      } catch (error) {
        console.error('CV yüklenirken hata:', error);
        alert('CV yüklenirken bir hata oluştu');
      }
    };

    loadCV();
  }, [editId, user]);

  const handleSaveSection = (sectionId: string, data: any) => {
    setCvData(prev => ({
      ...prev,
      [sectionId]: data
    }));

    setCvSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, completed: true } : section
    ));
  };

  const handleCreateCV = async () => {
    if (!user) {
      alert('Lütfen önce giriş yapın');
      router.push('/giris-yap');
      return;
    }

    try {
      const updatedCvData: Partial<CVData> & { userId: string; updatedAt: any; createdAt?: any } = {
        userId: user.uid,
        ...cvData,
        updatedAt: serverTimestamp(),
      };

      if (isEditMode && editId) {
        await updateDoc(doc(db, 'cvs', editId), updatedCvData);
        alert('CV başarıyla güncellendi!');
      } else {
        updatedCvData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'cvs'), updatedCvData);
        alert('CV başarıyla oluşturuldu!');
      }
      
      router.push('/ozgecmislerim');
    } catch (error) {
      console.error('CV işlemi hatası:', error);
      alert('CV işlemi sırasında bir hata oluştu');
    }
  };

  const handleModalOpen = (sectionId: string) => {
    setActiveModal(sectionId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner 
        title={isEditMode ? "CV Düzenle" : "CV Oluştur"} 
        description={isEditMode ? "CV'nizi düzenleyin" : "Profesyonel CV'nizi adım adım oluşturun"} 
        imageSrc={BannerImage}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* CV başlığı input alanı */}
        <div className="mb-8">
          <label htmlFor="cvTitle" className="block text-sm font-medium text-gray-700 mb-2">
            CV Başlığı
          </label>
          <input
            type="text"
            id="cvTitle"
            value={cvData.title}
            onChange={(e) => setCvData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Örn: Yazılım Mühendisi CV'si"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
          />
          <p className="mt-1 text-sm text-gray-500">
            Bu başlık özgeçmişlerim sayfasında CV'nizi tanımlamak için kullanılacaktır.
          </p>
        </div>

        <div className="grid gap-4">
          {cvSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleModalOpen(section.id)}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-between w-full"
            >
              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-lg">
                  {section.icon}
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {section.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {section.completed && (
                  <FaCheck className="text-green-500" />
                )}
                <FaChevronRight className="text-gray-400" />
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleCreateCV}
          className="mt-8 w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <FaFileAlt />
          {isEditMode ? 'CV Güncelle' : 'CV Oluştur'}
        </button>
      </div>

      {/* Modal bileşenlerini ekleyelim */}
      {activeModal === 'personal' && (
        <PersonalInfoModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSave={(data) => handleSaveSection('personal', data)}
          initialData={cvData.personal}
        />
      )}
      {activeModal === 'about' && (
        <AboutModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSave={(data) => handleSaveSection('about', data)}
          initialData={cvData.about}
        />
      )}
      {activeModal === 'education' && (
        <EducationModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSave={(data) => handleSaveSection('education', data)}
          initialData={cvData.education}
        />
      )}
      {activeModal === 'certificates' && (
        <CertificatesModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSave={(data) => handleSaveSection('certificates', data)}
          initialData={cvData.certificates}
        />
      )}
      {activeModal === 'experience' && (
        <ExperienceModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSave={(data) => handleSaveSection('experience', data)}
          initialData={cvData.experience}
        />
      )}
      {activeModal === 'languages' && (
        <LanguagesModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSave={(data) => handleSaveSection('languages', data)}
          initialData={cvData.languages}
        />
      )}
      {activeModal === 'references' && (
        <ReferencesModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSave={(data) => handleSaveSection('references', data)}
          initialData={cvData.references}
        />
      )}
      {activeModal === 'skills' && (
        <SkillsModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSave={(data) => handleSaveSection('skills', data)}
          initialData={cvData.skills}
        />
      )}
    </div>
  );
}
