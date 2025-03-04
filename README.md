# CvGen - Profesyonel Özgeçmiş Oluşturma Platformu

CvGen, iş arayanların kolayca profesyonel özgeçmişler oluşturmasını sağlayan modern bir web uygulamasıdır. Kullanıcı dostu arayüzü ve çeşitli şablonlarıyla, özgeçmiş oluşturma sürecini basitleştirir ve hızlandırır.

## 🚀 Özellikler

- **Çeşitli Şablonlar**: Modern, profesyonel, elegant ve daha birçok farklı stilde şablon seçeneği
- **Kullanıcı Hesapları**: Özgeçmişlerinizi kaydetme ve düzenleme imkanı
- **PDF Dışa Aktarma**: Oluşturduğunuz özgeçmişleri PDF formatında indirme
- **Mobil Uyumlu**: Her cihazda sorunsuz kullanım
- **ATS Uyumlu Şablonlar**: İş başvurularında Applicant Tracking System (ATS) tarafından kolayca taranabilen şablonlar

## 🛠️ Teknolojiler

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Tip güvenliği
- [Firebase](https://firebase.google.com/) - Kimlik doğrulama ve veritabanı
- [Tailwind CSS](https://tailwindcss.com/) - Stil ve tasarım
- [Framer Motion](https://www.framer.com/motion/) - Animasyonlar
- [jsPDF](https://github.com/parallax/jsPDF) - PDF oluşturma

## 📋 Kurulum

1. Repoyu klonlayın:
   ```bash
   git clone https://github.com/kullanici-adi/cvgen-web.git
   cd cvgen-web
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. `.env.example` dosyasını `.env` olarak kopyalayın ve Firebase bilgilerinizi ekleyin:
   ```bash
   cp .env.example .env
   ```

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

## 🔧 Yapılandırma

Firebase projenizi oluşturun ve `.env` dosyasındaki değişkenleri kendi Firebase projenizin bilgileriyle güncelleyin:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 📱 Kullanım

1. Ana sayfadan "CV Oluştur" butonuna tıklayın
2. Kişisel bilgilerinizi, eğitim ve iş deneyimlerinizi girin
3. Şablonlar arasından size uygun olanı seçin
4. Önizlemeyi kontrol edin ve gerekirse düzenlemeler yapın
5. "PDF İndir" butonuyla özgeçmişinizi indirin veya hesabınıza kaydedin

## 🌐 Canlı Demo

[https://cvgen.com.tr](https://cvgen.com.tr)

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.


## 📞 İletişim

Sorularınız veya önerileriniz için [destek@cvgen.com.tr](mailto:destek@cvgen.com.tr) adresine e-posta gönderebilirsiniz.