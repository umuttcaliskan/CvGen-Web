import React, { useState, useEffect } from 'react'
import { FaTimes, FaDownload, FaCheck, FaFilePdf, FaFileWord } from 'react-icons/fa'
import Image from 'next/image'
import { generatePDFFromHTML } from '@/services/pdf-service'
import isDunyasiImage from '@/assets/images/templates/corporate.png'
import dijitalGecisImage from '@/assets/images/templates/atsUyumlu.png'
import ozVeNetImage from '@/assets/images/templates/minimalist.png'
import novaImage from '@/assets/images/templates/whiteTwoColumn.png'
import geceMavisiImage from '@/assets/images/templates/darkmodern.png'
import baharEsintisiImage from '@/assets/images/templates/greenModern.png'
import toprakTonuImage from '@/assets/images/templates/elite.png'
import kariyerOdakliImage from '@/assets/images/templates/professional.png'
import maviUfuklarImage from '@/assets/images/templates/modern.png'
import inceDetayImage from '@/assets/images/templates/elegant.png'
import yalinZarafetImage from '@/assets/images/templates/feminine.png'
import kristalNetlikImage from '@/assets/images/templates/crystal.png'
import { templateMapping } from '@/templates'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '@/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import { useAuth } from '@/context/AuthContext'

interface TemplateSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
  cvData: any;
}

const templates = [
  { id: 'is-dunyasi', name: 'İş Dünyası', image: isDunyasiImage },
  { id: 'dijital-gecis', name: 'Dijital Geçiş', image: dijitalGecisImage },
  { id: 'oz-ve-net', name: 'Öz ve Net', image: ozVeNetImage },
  { id: 'nova', name: 'Nova', image: novaImage },
  { id: 'gece-mavisi', name: 'Gece Mavisi', image: geceMavisiImage },
  { id: 'bahar-esintisi', name: 'Bahar Esintisi', image: baharEsintisiImage },
  { id: 'toprak-tonu', name: 'Toprak Tonu', image: toprakTonuImage },
  { id: 'kariyer-odakli', name: 'Kariyer Odaklı', image: kariyerOdakliImage },
  { id: 'mavi-ufuklar', name: 'Mavi Ufuklar', image: maviUfuklarImage },
  { id: 'ince-detay', name: 'İnce Detay', image: inceDetayImage },
  { id: 'yalin-zarafet', name: 'Yalın Zarafet', image: yalinZarafetImage },
  { id: 'kristal-netlik', name: 'Kristal Netlik', image: kristalNetlikImage },
]

// İndirme formatları
const downloadFormats = [
  { id: 'pdf', name: 'PDF', icon: <FaFilePdf className="mr-2" /> },
  { id: 'docx', name: 'Word (DOCX)', icon: <FaFileWord className="mr-2" /> },
]

// Firebase Storage'dan profil resmini direkt olarak yükleyen fonksiyon
const fetchProfileImageFromFirebase = async (currentUser: any): Promise<string | null> => {
  try {
    if (!currentUser || !currentUser.uid) {
      console.log("Kullanıcı oturumu yok, profil resmi alınamıyor");
      return null;
    }

    // Firestore'dan kullanıcı profil bilgilerini al
    const userDocRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists() || !userDoc.data().profileImage) {
      console.log("Kullanıcı profil resmi yok");
      return null;
    }
    
    // Storage referansını al
    const storageRef = ref(storage, userDoc.data().profileImage);
    
    try {
      // URL'yi getir
      const url = await getDownloadURL(storageRef);
      console.log("Profil resmi URL başarıyla alındı:", url);
      
      // Mevcut API endpoint'ini kullanarak resmi indir
      try {
        const response = await fetch('/api/get-profile-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ imageUrl: url })
        });
        
        if (!response.ok) {
          throw new Error('API hatası: ' + response.status);
        }
        
        const data = await response.json();
        if (data.imageData) {
          console.log("Resim API üzerinden base64 olarak alındı");
          return data.imageData; // dataURL formatında image dönüyor
        } else {
          throw new Error('Resim verisi alınamadı');
        }
      } catch (apiError) {
        console.error("API üzerinden resim alınamadı:", apiError);
        // Direkt URL'yi döndür, şablon bunu işleyebilir
        return url;
      }
    } catch (storageError) {
      console.error("Storage'dan resim URL'si alınamadı:", storageError);
      return null;
    }
  } catch (error) {
    console.error("Profil resmi alınırken hata:", error);
    return null;
  }
};

function TemplateSelectModal({ isOpen, onClose, onSelectTemplate, cvData }: TemplateSelectModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useAuth();
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  
  useEffect(() => {
    const prepareTemplate = async () => {
      if (selectedTemplate && templateMapping[selectedTemplate] && isOpen) {
        try {
          const template = templateMapping[selectedTemplate];
          console.log(`'${selectedTemplate}' şablonu yükleniyor`);
          
          // Profil resmini kontrol et
          let profileImage = null;
          
          try {
            // 1. Önce CVData'daki resmi kontrol et
            if (cvData?.personal?.profileImageUrl) {
              profileImage = cvData.personal.profileImageUrl;
            } else {
              // 2. Firebase'den kullanıcının profil resmini al
              profileImage = await fetchProfileImageFromFirebase(user);
            }
          } catch (imgError) {
            console.error('Profil resmi alınamadı:', imgError);
          }
          
          // Şablonun HTML içeriğini oluştur
          const generatedHtml = template.generateHTML(cvData, profileImage);
          setHtmlContent(generatedHtml);
          console.log(`'${selectedTemplate}' şablonu için HTML içeriği hazırlandı`);
        } catch (error) {
          console.error('Şablon hazırlama hatası:', error);
        }
      }
    };
    
    prepareTemplate();
  }, [selectedTemplate, cvData, isOpen, user]);
  
  if (!isOpen) return null;
  
  const handleDownload = async () => {
    if (!selectedTemplate) {
      alert('Lütfen bir şablon seçin');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Seçilen template ID kaydediliyor
      console.log('Seçilen şablon:', selectedTemplate);
      
      // Seçilen şablona göre HTML içeriğini kesin olarak oluşturuyoruz
      const template = templateMapping[selectedTemplate];
      
      if (!template) {
        throw new Error(`${selectedTemplate} ID'li şablon bulunamadı`);
      }
      
      // Profil resmini tekrar kontrol
      let profileImage = null;
      try {
        // Profil resmini al
        profileImage = await fetchProfileImageFromFirebase(user);
      } catch (imgError) {
        console.error('Profil resmi alınamadı:', imgError);
      }
      
      // HTML içeriğini oluştur
      const finalHtmlContent = template.generateHTML(cvData, profileImage);
      
      if (selectedFormat === 'pdf') {
        // PDF oluşturma servisi kullanılıyor
        await generatePDFFromHTML(finalHtmlContent, `${cvData.title || 'cv'}.pdf`);
        
        // Başarılı sonuç
        onSelectTemplate(selectedTemplate);
        onClose();
      } else if (selectedFormat === 'docx') {
        alert('DOCX dönüştürme şu anda geliştirilme aşamasındadır. Lütfen PDF formatını kullanın.');
      }
      
      setIsGenerating(false);
    } catch (error) {
      console.error('İndirme hatası:', error);
      alert('CV indirme sırasında bir hata oluştu');
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
          <h2 className="text-xl font-semibold">CV Şablonu Seçin</h2>
          <div></div>
        </div>
        
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-medium text-lg mb-2 sm:mb-0">Dosya Formatı Seçin:</h3>
            <div className="flex space-x-3">
              {downloadFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`py-2 px-4 rounded-md flex items-center ${
                    selectedFormat === format.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {format.icon}
                  <span>{format.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <p className="mb-4 text-gray-600">
            CV'nizi indirmek için bir şablon seçin. Her şablon farklı bir tasarım ve düzene sahiptir.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`border rounded-lg p-2 cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? 'border-primary-500 ring-2 ring-primary-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="relative aspect-[3/4] w-full bg-gray-100 rounded mb-2 overflow-hidden">
                  <Image 
                    src={template.image}
                    alt={`${template.name} şablon önizlemesi`}
                    fill
                    className="object-cover"
                  />
                  
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 z-10">
                      <FaCheck size={12} />
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-center">{template.name}</h3>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              onClick={handleDownload}
              disabled={!selectedTemplate || isGenerating}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                !selectedTemplate || isGenerating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>İşleniyor...</span>
                </>
              ) : (
                <>
                  <FaDownload />
                  <span>İndir</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateSelectModal
