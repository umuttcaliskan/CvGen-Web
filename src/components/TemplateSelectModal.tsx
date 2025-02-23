import React, { useState, useEffect } from 'react';
import { FaTimes, FaDownload } from 'react-icons/fa';
import Image, { StaticImageData } from 'next/image';
import CvImage from '@/assets/images/templates/cv3.png';
import { generatePDF } from '@/utils/pdfGenerator';
import { useAuth } from '@/context/AuthContext';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';
import { TemplateId } from '@/templates';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

interface Template {
  id: string;
  name: string;
  image: StaticImageData;
  thumbnail: StaticImageData;
}

interface TemplateSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
  cvData: any; // CV verisi
}

const templates: Template[] = [
  { 
    id: 'modern', 
    name: 'Modern', 
    image: CvImage,
    thumbnail: CvImage
  },
  { 
    id: 'professional', 
    name: 'Profesyonel', 
    image: CvImage,
    thumbnail: CvImage
  },
  { 
    id: 'elegant', 
    name: 'Zarif', 
    image: CvImage,
    thumbnail: CvImage
  },
  { 
    id: 'creative', 
    name: 'Yaratıcı', 
    image: CvImage,
    thumbnail: CvImage
  },
  { 
    id: 'minimal', 
    name: 'Minimal', 
    image: CvImage,
    thumbnail: CvImage
  }
];

const TemplateSelectModal: React.FC<TemplateSelectModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate,
  cvData 
}) => {
  const [selectedId, setSelectedId] = useState<string>('modern');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { user } = useAuth();
  const storage = getStorage();

  // Kullanıcının profil resmini yükle
  useEffect(() => {
    const loadProfileImage = async () => {
      if (!user?.uid) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
          console.log('Kullanıcı belgesi bulunamadı');
          setProfileImage(null);
          return;
        }

        const userData = userDoc.data();
        if (!userData.profileImage) {
          console.log('Profil resmi yolu bulunamadı');
          setProfileImage(null);
          return;
        }

        // Storage'dan profil resmini al
        const imageRef = ref(storage, userData.profileImage);
        const url = await getDownloadURL(imageRef);
        
        // Fetch API ile resmi indir
        const response = await fetch(url, {
          mode: 'no-cors',
          cache: 'no-cache',
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        });
        
        if (!response.ok && response.type !== 'opaque') {
          throw new Error('Resim indirilemedi');
        }

        // Base64'e dönüştür
        const blob = await response.blob();
        const reader = new FileReader();
        const base64Image = await new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

        console.log('Profil resmi başarıyla yüklendi');
        setProfileImage(base64Image);

      } catch (error) {
        console.error('Profil resmi yüklenirken hata:', error);
        setProfileImage(null);
      }
    };

    loadProfileImage();
  }, [user, storage]);

  const handleGeneratePDF = async () => {
    try {
      console.log('PDF oluşturma başladı. Profil resmi:', profileImage ? 'Mevcut' : 'Yok');
      
      const defaultCV = {
        title: 'CV',
        personal: {
          fullName: 'İsimsiz',
          email: '',
          phone: '',
          birthDate: '',
          address: ''
        },
        about: null,
        education: [],
        experience: [],
        skills: [],
        languages: [],
        references: [],
        certificates: []
      };

      const safeCV = {
        ...defaultCV,
        ...(cvData || {}),
        personal: {
          ...defaultCV.personal,
          ...((cvData?.personal || {}))
        }
      };

      // Profil resminin yüklenmesini bekleyelim
      if (profileImage) {
        console.log('Profil resmi PDF\'e ekleniyor');
      }

      await generatePDF(safeCV, selectedId as TemplateId, profileImage);
      console.log('PDF oluşturma tamamlandı');
      onClose();
    } catch (error) {
      console.error('PDF oluşturma hatası:', error);
      alert('PDF oluşturulurken bir hata oluştu: ' + (error as Error).message);
    }
  };

  if (!isOpen) return null;

  const selectedTemplate = templates.find(t => t.id === selectedId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold">CV Şablonu Seçin</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex overflow-x-auto space-x-6 pb-4 mb-4">
            {templates.map((template) => (
              <div 
                key={template.id}
                className="flex flex-col items-center min-w-[100px]"
                onClick={() => setSelectedId(template.id)}
              >
                <div className={`w-20 h-20 rounded-full relative cursor-pointer border-2 ${
                  selectedId === template.id ? 'border-primary' : 'border-gray-200'
                }`}>
                  <Image
                    src={template.thumbnail}
                    alt={template.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <span className={`mt-2 text-sm ${
                  selectedId === template.id ? 'text-primary font-medium' : 'text-gray-600'
                }`}>
                  {template.name}
                </span>
              </div>
            ))}
          </div>

          {selectedTemplate && (
            <div className="aspect-[1/1.414] relative bg-gray-50 rounded-lg shadow-sm">
              <Image
                src={selectedTemplate.image}
                alt={selectedTemplate.name}
                fill
                className="object-contain"
              />
            </div>
          )}

          <button
            onClick={handleGeneratePDF}
            className="mt-4 w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <FaDownload />
            <span className="font-semibold">PDF Olarak İndir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectModal; 