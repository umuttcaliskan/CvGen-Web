'use client';

import React, { useState, useEffect } from 'react';
import BannerGray from '@/components/BannerGray';
import { FaUser, FaFileAlt, FaGraduationCap, FaCertificate, FaBriefcase, FaStar, FaGlobe, FaUsers, FaCheck, FaChevronRight, FaBug } from 'react-icons/fa';
import { db } from '@/firebaseConfig';
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
import ProjectsModal from '@/components/CreateComponents/ProjectsModal';
import SocialMediaModal from '@/components/CreateComponents/SocialMediaModal';
import { FieldValue } from 'firebase/firestore';
import { CVData, CVSectionData } from '@/types/cv';
import { generateUUID } from '@/utils/uuid';
import ReportBugModal from '@/components/ReportBugModal';
import SiteHelmet from '@/components/Helmet';

interface CVSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  completed: boolean;
}

interface BaseSection {
  id: string;
  [key: string]: any;
}

interface PersonalInfo extends BaseSection {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
}

interface Education extends BaseSection {
  schoolName: string;
  department: string;
  startDate: string;
  endDate: string;
}

interface Certificate extends BaseSection {
  name: string;
  institution: string;
  date: string;
}

interface Experience extends BaseSection {
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill extends BaseSection {
  name: string;
  level: string;
}

interface Language extends BaseSection {
  name: string;
  level: string;
}

interface Reference extends BaseSection {
  fullName: string;
  company: string;
  position: string;
  phone: string;
  email: string;
}

interface Project extends BaseSection {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies?: string;
  projectUrl?: string;
}

interface SocialMedia extends BaseSection {
  platform: string;
  username: string;
  url?: string;
}

interface CVDataUpdate {
  userId: string;
  updatedAt: FieldValue;
  createdAt?: FieldValue;
  [key: string]: any;
}

// PersonalInfoModal props tipini güncelle
interface PersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PersonalInfo) => void;
  initialData: {
    fullName: string;
    [key: string]: unknown;
  } | undefined;
}

export default function CreateCV() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isReportBugModalOpen, setIsReportBugModalOpen] = useState(false);
  
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
    },
    {
      id: 'projects',
      title: 'Projelerim',
      icon: <FaFileAlt className="text-xl" />,
      description: 'Geliştirdiğiniz projeler ve detayları',
      completed: false
    },
    {
      id: 'socialMedia',
      title: 'Sosyal Medya Hesaplarım',
      icon: <FaGlobe className="text-xl" />,
      description: 'Sosyal medya hesaplarınız ve bağlantıları',
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
    references: null,
    projects: null,
    socialMedia: null
  });

  // CV verilerini yükleme
  useEffect(() => {
    const loadCV = async () => {
      if (!editId || !user) return;

      try {
        const cvDoc = await getDoc(doc(db, 'cvs', editId));
        if (cvDoc.exists()) {
          const data = cvDoc.data();
          console.log('Firestore\'dan gelen ham veri:', data);
          console.log("Projeler ham veri:", JSON.stringify(data.projects));
          console.log("Sosyal medya ham veri:", JSON.stringify(data.socialMedia));
          
          const processedData: CVData = {
            title: data.title || 'İsimsiz CV',
            personal: data.personal ? {
              fullName: data.personal.fullName || '',
              email: data.personal.email || '',
              phone: data.personal.phone || '',
              birthDate: data.personal.birthDate || '',
              address: data.personal.address || '',
              ...data.personal
            } : null,
            
            about: typeof data.about === 'string' ? data.about : null,
            
            education: Array.isArray(data.education) ? data.education.map(edu => ({
              id: edu.id || generateUUID(),
              schoolName: edu.schoolName || '',
              department: edu.department || '',
              startDate: edu.startDate || '',
              endDate: edu.endDate || ''
            })) : null,
            
            certificates: Array.isArray(data.certificates) ? data.certificates.map(cert => ({
              id: cert.id || generateUUID(),
              name: cert.name || '',
              institution: cert.institution || '',
              date: cert.date || ''
            })) : null,
            
            experience: Array.isArray(data.experience) ? data.experience.map(exp => ({
              id: exp.id || generateUUID(),
              companyName: exp.companyName || '',
              position: exp.position || '',
              startDate: exp.startDate || '',
              endDate: exp.endDate || '',
              description: exp.description || ''
            })) : null,
            
            skills: Array.isArray(data.skills) ? data.skills.map(skill => ({
              id: skill.id || generateUUID(),
              name: skill.name || '',
              level: skill.level || ''
            })) : null,
            
            languages: Array.isArray(data.languages) ? data.languages.map(lang => ({
              id: lang.id || generateUUID(),
              name: lang.name || '',
              level: lang.level || ''
            })) : null,
            
            references: Array.isArray(data.references) ? data.references.map(ref => ({
              id: ref.id || generateUUID(),
              fullName: ref.fullName || '',
              company: ref.company || '',
              position: ref.position || '',
              phone: ref.phone || '',
              email: ref.email || ''
            })) : null,
            
            projects: Array.isArray(data.projects) ? data.projects.map(project => {
              console.log("İşlenen proje:", JSON.stringify(project));
              return {
                id: project.id || generateUUID(),
                name: project.name || '',
                startDate: project.startDate || '',
                endDate: project.endDate || '',
                description: project.description || '',
                technologies: project.technologies || '',
                projectUrl: project.projectUrl || ''
              };
            }) : null,
            
            socialMedia: Array.isArray(data.socialMedia) ? data.socialMedia.map(social => {
              console.log("İşlenen sosyal medya:", JSON.stringify(social));
              return {
                id: social.id || generateUUID(),
                platform: social.platform || '',
                username: social.username || '',
                url: social.url || ''
              };
            }) : null
          };

          console.log('İşlenmiş veri:', processedData);
          setCvData(processedData);

          // Tamamlanmış bölümleri işaretleme
          const completedSections = Object.entries(processedData).reduce((acc: string[], [key, value]) => {
            if (value !== null && 
                (typeof value === 'string' || 
                 (Array.isArray(value) && value.length > 0) || 
                 (typeof value === 'object' && Object.keys(value).length > 0))) {
              acc.push(key);
            }
            return acc;
          }, []);

          console.log('Tamamlanmış bölümler:', completedSections);

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

  const handleSaveSection = (sectionId: string, data: CVSectionData) => {
    setCvData(prev => ({
      ...prev,
      [sectionId]: data
    }));

    // Bölümü tamamlandı olarak işaretle
    setCvSections(prev =>
      prev.map(section =>
        section.id === sectionId ? { ...section, completed: true } : section
      )
    );

    setActiveModal(null);
  };

  const handleCreateCV = async () => {
    if (!user) {
      alert('Lütfen önce giriş yapın');
      router.push('/giris-yap');
      return;
    }

    try {
      const updatedCvData: CVDataUpdate = {
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
    if (!user) {
      // Kullanıcı giriş yapmamışsa giriş modalını göster
      router.push('/giris-yap?redirect=/cv-olustur');
      return;
    }
    setActiveModal(sectionId);
  };

  // Anahtar kelime etiketleri (page.tsx ile birebir aynı)
  const allTags = [
    "cv oluştur",
    "ücretsiz cv oluştur",
    "cv oluştur pdf",
    "online cv oluştur",
    "ats uyumlu cv oluştur",
    "canva cv oluştur",
    "cv oluşturma şablonu",
    "cv oluşturma yapay zeka",
    "cv oluştur word",
    "profesyonel cv oluştur",
    "europass cv oluştur",
    "kariyer net cv oluştur",
    "ingilizce cv oluştur",
    "ucretsiz cv oluştur",
    "cv oluştur ücretsiz word",
    "cv oluşturucu ücretsiz",
    "hazır cv oluştur",
    "basit cv oluştur",
    "işkur cv oluştur",
    "cv oluştur ücretsiz",
    "cv oluşturmak",
    "cv oluştur free",
    "cv oluşturma nasıl yapılır",
    "cv oluşturma programları",
    "cv oluştur europass",
    "cv oluşturma örnek",
    "almanca cv oluştur",
    "cv oluştur apk",
    "gemi adamı cv oluştur",
    "cv oluştur online",
    "akademik cv oluşturma",
    "cv oluştur giriş",
    "cv oluşturur",
    "cv oluştur bedava",
    "cv oluştur basit",
    "cv benim oluştur",
    "cv oluştur iş başvurusu",
    "boş cv oluştur",
    "basit cv oluştur ücretsiz",
    "bim cv oluştur",
    "cv oluşturma boş",
    "cv oluşturma programi",
    "cv oluştur profesyonel",
    "bedava cv oluştur",
    "boş cv oluştur ingilizce cv örnekleri",
    "cv benim cv oluştur",
    "b cv",
    "bedava cv oluşturucu",
    "cv oluştur chatgpt",
    "cv oluştur.com",
    "cv oluşturma kolay",
    "cv maker cv oluştur",
    "kariyer com cv oluştur",
    "cv oluşturma programı ücretsiz",
    "çcv",
    "cç cv",
    "cv oluşturma örneği",
    "cv oluştur diş hekimliği",
    "cv oluştur e devlet",
    "cv oluştururken dikkat edilmesi gerekenler",
    "e devlet cv oluştur",
    "d oluşturma",
    "cv oluşturma formu",
    "cv oluşturma ingilizce",
    "cv oluşturma siteleri",
    "cv oluştur excel",
    "cv oluştur ücretsiz ekşi",
    "engelli cv oluştur",
    "cv oluştur ekşi",
    "cv oluşturma eğitimhane",
    "cv oluşturma excel",
    "eleman net cv oluştur",
    "eleman online cv oluştur",
    "e devlet cv oluşturma",
    "e cv hazırlama",
    "e cv",
    "cv oluştur fotoğraflı",
    "cv fotoğrafı oluşturma",
    "fotoğraflı cv oluştur ücretsiz",
    "cv oluşturma formatı",
    "cv oluşturma formu indir",
    "free cv oluştur",
    "fotoğraflı cv oluştur",
    "free cv oluşturma",
    "google cv oluştur",
    "cv oluşturma programı",
    "g cv",
    "güvenlik cv oluşturma",
    "güvenlik cv oluştur",
    "g cv n",
    "cv oluştur hızlı",
    "cv hazırlama oluştur",
    "hazır cv oluştur ücretsiz",
    "hızlı cv oluştur ücretsiz",
    "cv oluştururken hobiler",
    "cv h",
    "hazır cv oluşturma",
    "iş cv oluştur",
    "iş cv oluşturma",
    "indeed cv oluştur",
    "ing cv oluştur",
    "infografik cv oluştur",
    "cv oluştur indir ücretsiz",
    "cv oluşturmak istiyorum",
    "cv oluştur ücretsiz indir",
    "cv oluştur pdf olarak indir",
    "cv oluştur jobseeker",
    "jobseeker cv oluştur",
    "cv oluştur kariyer",
    "cv oluştur kolay",
    "kolay cv oluştur ücretsiz",
    "klasik cv oluştur",
    "cv oluştur kariyer.net",
    "kolay cv oluştur",
    "kendi cv ni oluştur",
    "k cv",
    "kısa cv oluştur",
    "cv oluşturmak ücretsiz",
    "cv oluştur linkedin",
    "cv oluşturma şablonları",
    "cv oluşturma şablon",
    "cv oluşturun",
    "linkedin cv oluştur",
    "cv l",
    "cv oluşma",
    "cv maker oluştur",
    "cv oluşturma microsoft word",
    "mycv",
    "cv. m",
    "microsoft cv maker",
    "cv'ni oluştur",
    "cv nasıl oluştur",
    "cv oluştur kariyer net",
    "cv oluştururken nelere dikkat edilmeli",
    "nasıl cv oluşturabilirim",
    "nasıl cv oluşturulur",
    "n cv",
    "otomatik cv oluştur",
    "online cv oluştur ücretsiz",
    "o cv",
    "cv oluştur örnek",
    "cv oluştur özgeçmiş",
    "cv oluştur öğrenci",
    "cv örneği oluştur",
    "öğretmen cv oluştur ücretsiz",
    "öğretmenlik cv oluştur",
    "cv oluştur öğretmen",
    "özgeçmiş cv oluştur",
    "öğrenci cv oluştur",
    "özgeçmiş oluştur ücretsiz",
    "cv oluştur ücretsiz pdf canva",
    "cv oluştur pdf indir",
    "cv oluştur pdf ücretsiz",
    "pdf cv oluştur",
    "pdf cv oluştur ücretsiz",
    "pdf cv oluşturma",
    "resimli cv oluştur ücretsiz",
    "resimli cv oluştur",
    "r ölçüsü",
    "r vektör oluşturma",
    "cv oluşturmaa",
    "cv.r",
    "sade cv oluştur ücretsiz",
    "staj cv oluştur",
    "s cv",
    "sivi oluşturma formu",
    "sivi oluşturma",
    "cv şablon oluşturma",
    "cv oluştur ücretsiz şablon",
    "cv oluştur türkçe",
    "ücretsiz cv oluştur türkçe",
    "europass cv oluştur türkçe",
    "cv oluştur telefondan",
    "cv oluşturma taslağı",
    "türkçe cv oluştur",
    "t cv",
    "t.c oluştur",
    "cv oluşturma uygulamaları",
    "cv oluşturma uygulaması",
    "cv oluştur ücretsiz pdf",
    "cv oluştur ücretsiz canva",
    "cv oluştur ücretsiz ingilizce",
    "cv oluştur ücretsiz türkçe",
    "europass cv oluştur ücretsiz",
    "ücretsiz cv oluştur",
    "ücretsiz cv oluştur pdf",
    "ücretsiz online cv oluştur",
    "ücretsiz cv oluştur canva",
    "ücretsiz ingilizce cv oluştur",
    "ücretsiz cv oluştur ve indir",
    "vakıfbank cv oluştur",
    "cv oluşturma ve indirme",
    "cv oluşturma videosu",
    "c v oluştur",
    "v cv",
    "vcv oluştur",
    "cv oluştur yapay zeka",
    "yeni cv oluştur",
    "cv oluşturma youtube",
    "0cv",
    "1 cv",
    "2 sayfa cv olur mu",
    "2 sayfalık cv örnekleri",
    "2.sınıf cümle oluşturma wordwall",
    "cv 2",
    "3 cv",
    "3d cv",
    "3d oluşturucu",
    "4 cv",
    "a4 cv örnekleri",
    "4.sınıf cümle oluşturma testi",
    "a4 cv hazırlama",
    "5 cv",
    "cv oluşturma örnekleri",
    "6 cv",
    "cv oluştur7",
    "cv 7 layout",
    "cv-7",
    "8 cv",
    "9 cv",
    "9.sınıf cv örnekleri"
  ];
  const tagsPerRow = 6;
  const visibleRows = 4;
  const previewCount = tagsPerRow * visibleRows;
  const previewTags = allTags.slice(0, previewCount);
  const restTags = allTags.slice(previewCount);
  const [showTags, setShowTags] = React.useState(false);

  return (
    <div className="min-h-screen">
      <SiteHelmet 
        title="Tamamen Ücretsiz CV Oluştur | Profesyonel CV Hazırlama Aracı"
        description="Tamamen ücretsiz CV oluşturma aracımızla profesyonel bir CV hazırlayın. Hiçbir gizli ücret olmadan, kolay kullanımlı arayüz, hazır şablonlar ve anında indirme seçeneği."
        keywords="cv oluştur, cv hazırla, cv maker, cv generator, özgeçmiş oluşturma, profesyonel cv, cv şablonları, online cv, ücretsiz cv, bedava cv, canva cv"
        ogUrl="/cv-olustur"
      />
      <h1 className="sr-only">Profesyonel CV Oluşturma Aracı - Ücretsiz ve Kolay Kullanımlı CV Hazırlama Platformu</h1>
      <BannerGray 
        title={isEditMode ? "CV Düzenle" : "CV Oluştur"} 
        description={isEditMode ? "CV'nizi düzenleyin" : "Profesyonel CV'nizi adım adım oluşturun"} 
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

      {/* Sabit konumlandırılmış Hata Bildir butonu */}
      <button
        onClick={() => setIsReportBugModalOpen(true)}
        className="fixed bottom-6 right-6 bg-white shadow-lg border border-gray-200 text-gray-700 py-3 px-5 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 z-10"
      >
        <FaBug className="text-red-500" />
        Hata Bildir
      </button>

      {/* Modal bileşenleri */}
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
      {activeModal === 'projects' && (
        <ProjectsModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSave={(data) => handleSaveSection('projects', data)}
          initialData={cvData.projects}
        />
      )}
      {activeModal === 'socialMedia' && (
        <SocialMediaModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onSave={(data) => handleSaveSection('socialMedia', data)}
          initialData={cvData.socialMedia}
        />
      )}

      
      
      <ReportBugModal 
        isOpen={isReportBugModalOpen} 
        onClose={() => setIsReportBugModalOpen(false)} 
      />

      {/* Sayfa sonu anahtar kelime etiketleri alanı */}
      <div className="flex flex-col items-center mb-8 relative">
        <div className="flex flex-wrap gap-2 justify-center w-full relative">
          {previewTags.map((tag) => (
            <span key={tag} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mr-2 mb-2 border border-primary/20">{tag}</span>
          ))}
          {showTags && restTags.map((tag) => (
            <span key={tag} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mr-2 mb-2 border border-primary/20">{tag}</span>
          ))}
          {!showTags && restTags.length > 0 && (
            <div
              className="absolute left-0 top-0 w-full h-full flex items-end justify-center cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              onClick={() => setShowTags(true)}
            >
              <div className="w-full h-24 bg-gradient-to-t from-white/90 to-white/0 backdrop-blur-sm flex items-center justify-center absolute bottom-0 left-0 z-10">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded font-bold border border-primary/20 hover:bg-primary/20 transition cursor-pointer z-20">
                  Devamını Göster (+{restTags.length})
                </span>
              </div>
            </div>
          )}
        </div>
        {showTags && restTags.length > 0 && (
          <button
            className="px-4 py-2 bg-primary/10 text-primary rounded font-bold border border-primary/20 hover:bg-primary/20 transition mt-2"
            onClick={() => setShowTags(false)}
            aria-expanded={showTags}
          >
            Anahtar Kelimeleri Gizle
          </button>
        )}
      </div>
    </div>
  );
}
