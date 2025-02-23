import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { templates, TemplateId } from '@/templates';

export async function generatePDF(cv: any, templateId: TemplateId, profileImageBase64: string | null) {
  console.log('PDF oluşturmak için gelen veriler:', { cv, templateId, profileImageBase64: profileImageBase64 ? 'Mevcut' : 'Yok' });

  const template = templates[templateId];
  if (!template) throw new Error('Template not found');

  // Base64 formatını kontrol et ve düzelt
  let safeProfileImageBase64: string | null = null;
  if (profileImageBase64) {
    try {
      // Eğer base64 verisi data:image prefix'i içermiyorsa ekle
      if (!profileImageBase64.startsWith('data:image')) {
        safeProfileImageBase64 = `data:image/jpeg;base64,${profileImageBase64}`;
      } else {
        safeProfileImageBase64 = profileImageBase64;
      }
      
      // Base64 verisinin geçerliliğini kontrol et
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => reject(new Error('Geçersiz resim verisi'));
        img.src = safeProfileImageBase64 as string;
      });
    } catch (error) {
      console.warn('Profil resmi doğrulama hatası:', error);
      safeProfileImageBase64 = null;
    }
  }

  // HTML şablonunu oluştur
  const htmlContent = template.generateHTML(cv, safeProfileImageBase64);
  
  // HTML'i DOM'a ekle
  const container = document.createElement('div');
  container.innerHTML = htmlContent;
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  document.body.appendChild(container);

  try {
    // PDF oluştur (A4 boyutunda)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = 210;
    const pageHeight = 297;

    // Container'ı seç
    const mainContainer = container.querySelector('.container');
    if (!mainContainer) throw new Error('Container element not found');

    // Resimleri optimize et
    const images = mainContainer.getElementsByTagName('img');
    await Promise.all(Array.from(images).map(async (img: HTMLImageElement) => {
      return new Promise<void>((resolve) => {
        if (img.complete && img.naturalWidth !== 0) {
          resolve();
          return;
        }

        const loadHandler = () => {
          img.removeEventListener('load', loadHandler);
          img.removeEventListener('error', errorHandler);
          resolve();
        };

        const errorHandler = () => {
          const parent = img.parentElement;
          if (parent) {
            const initial = document.createElement('div');
            initial.className = 'profile-initial';
            initial.textContent = cv?.personal?.fullName?.charAt(0)?.toUpperCase() || 'U';
            parent.replaceChild(initial, img);
          }
          img.removeEventListener('load', loadHandler);
          img.removeEventListener('error', errorHandler);
          resolve();
        };

        img.addEventListener('load', loadHandler);
        img.addEventListener('error', errorHandler);

        // 3 saniye sonra timeout
        setTimeout(errorHandler, 3000);
      });
    }));

    // Canvas oluştur
    const canvas = await html2canvas(mainContainer as HTMLElement, {
      useCORS: true,
      allowTaint: true,
      background: '#ffffff',
      width: pageWidth * 3.78,
      height: pageHeight * 3.78,
      logging: false
    });

    // Canvas'ı PDF'e ekle
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);

    // Temizlik
    document.body.removeChild(container);

    // PDF'i kaydet
    const fileName = cv?.personal?.fullName ? 
      `${cv.personal.fullName}_CV.pdf` : 
      'CV.pdf';

    pdf.save(fileName);

  } catch (error) {
    console.error('PDF oluşturma hatası:', error);
    document.body.removeChild(container);
    throw error;
  }
} 