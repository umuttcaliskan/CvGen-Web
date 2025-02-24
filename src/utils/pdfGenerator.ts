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
      const base64Data = profileImageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
      const cleanBase64 = base64Data.replace(/[^A-Za-z0-9+/=]/g, '');
      safeProfileImageBase64 = `data:image/jpeg;base64,${cleanBase64}`;
      
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            try {
              safeProfileImageBase64 = canvas.toDataURL('image/jpeg', 0.8);
              resolve(true);
            } catch (e) {
              reject(new Error('Resim dönüştürme hatası'));
            }
          } else {
            reject(new Error('Canvas context oluşturulamadı'));
          }
        };
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
      format: 'a4',
      compress: true
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

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
        setTimeout(errorHandler, 10000);
      });
    }));

    // Canvas oluştur
    const canvas = await html2canvas(mainContainer as HTMLElement, {
      useCORS: true,
      allowTaint: true,
      background: '#ffffff',
      width: pageWidth * 3.779528,
      height: mainContainer.scrollHeight * 3.779528,
      logging: true
    });

    // Canvas'ı PDF'e ekle
    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    // Boyutları hesapla
    const scale = pageWidth / canvas.width;
    const scaledHeight = canvas.height * scale;
    const totalPages = Math.ceil(scaledHeight / pageHeight);

    console.log('PDF Boyutları:', {
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      scale,
      scaledHeight,
      pageHeight,
      totalPages
    });

    // Her sayfa için görüntüyü ekle
    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        imgData,
        'JPEG',
        0,                    // x
        -(page * pageHeight), // y
        pageWidth,           // width
        scaledHeight,        // height
        undefined,           // alias
        'FAST'              // compression
      );
    }

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