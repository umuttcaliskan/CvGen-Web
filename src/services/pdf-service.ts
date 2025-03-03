import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * HTML içeriğinden PDF oluşturan servis
 */
export const generatePDFFromHTML = async (htmlContent: string, fileName: string): Promise<void> => {
  try {
    // HTML içeriğini bir iframe'e yerleştir ve belgeyi oluştur
    const iframe = document.createElement('iframe');
    iframe.style.visibility = 'hidden';
    iframe.style.position = 'absolute';
    iframe.style.width = '1100px'; // Geniş bir genişlik (A4 boyutuna uygun)
    iframe.style.height = '100%';
    document.body.appendChild(iframe);
    
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    
    if (!iframeDoc) {
      throw new Error('iframe belgesi oluşturulamadı');
    }
    
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();
    
    // İçerik yüklenmesi için daha uzun bekle (2 saniye)
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          // Tüm resimlerin yüklenmesini bekle
          const imgElements = Array.from(iframeDoc.querySelectorAll('img'));
          
          // Profil resmi için ekstra özellikler ekle
          imgElements.forEach(img => {
            if (img.classList.contains('profile-image')) {
              // Profil resimlerine crossOrigin özelliği ekle
              img.crossOrigin = 'anonymous';
              
              console.log("İşleniyor: Profil resmi", img.src);
              
              // Yedek hata işleyicisi ekle
              img.onerror = function() {
                console.error("Profil resmi yüklenemedi, varsayılan avatar kullanılıyor. URL:", this.src);
                this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='35' r='25' fill='%23ccc'/%3E%3Crect x='25' y='65' width='50' height='30' rx='10' fill='%23ccc'/%3E%3C/svg%3E";
              };
            }
          });
          
          // Resimlerin yüklenmesini veya hata vermesini bekle
          for (const img of imgElements) {
            if (!img.complete) {
              await new Promise(resolve => {
                img.onload = resolve;
                img.onerror = () => {
                  console.error("Resim yüklenemedi:", img.src);
                  // Hata durumunda varsayılan bir resim koymak için
                  img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='35' r='25' fill='%23ccc'/%3E%3Crect x='25' y='65' width='50' height='30' rx='10' fill='%23ccc'/%3E%3C/svg%3E";
                  resolve(null);
                }
              });
            }
          }
          
          // Pdf oluşturma aşaması
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          
          // Canvas oluştururken daha yüksek kalite ve keskin görüntü için scale değerini arttır
          const canvas = await html2canvas(iframeDoc.body, { 
            scale: 2,  // Daha yüksek çözünürlük için
            useCORS: true,
            allowTaint: true,
            logging: false,
            // Sayfa içeriğinin tam yakalanması için
            windowWidth: iframe.clientWidth,
            windowHeight: iframe.contentWindow?.document.body.scrollHeight || 1000
          });
          
          const imgData = canvas.toDataURL('image/jpeg', 1.0);
          
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          
          // Genişlik tamamen dolduracak şekilde ayarla
          const ratio = pdfWidth / imgWidth;
          const scaledHeight = imgHeight * ratio;
          
          // İlk sayfayı ekle
          pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, scaledHeight);
          
          // Eğer içerik birden fazla sayfaya yayılıyorsa
          const totalPages = Math.ceil(scaledHeight / pdfHeight);
          
          // Daha temiz bir sayfa geçişi için
          for (let i = 1; i < totalPages; i++) {
            pdf.addPage();
            pdf.addImage(
              imgData,
              'JPEG',
              0,
              -(i * pdfHeight),
              pdfWidth,
              scaledHeight
            );
          }
          
          // PDF'i indir
          pdf.save(fileName);
          
          // iframe'i kaldır
          document.body.removeChild(iframe);
          resolve();
        } catch (error) {
          console.error('PDF oluşturma hatası:', error);
          document.body.removeChild(iframe);
          reject(error);
        }
      }, 2000); // 2 saniye bekle - tüm içeriğin yüklenmesi için daha fazla zaman
    });
  } catch (error) {
    console.error('PDF servisi hatası:', error);
    throw error;
  }
}; 