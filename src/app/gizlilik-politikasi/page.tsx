import React from 'react';

export default function GizlilikPolitikasi() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Gizlilik Politikası</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="mb-6">
          Son güncellenme: {new Date().toLocaleDateString('tr-TR')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Genel Bakış</h2>
          <p>
            CVGen olarak kişisel verilerinizin güvenliği konusunda büyük hassasiyet gösteriyoruz. 
            Bu gizlilik politikası, hizmetlerimizi kullanırken toplanan, işlenen ve saklanan kişisel verilerinizle 
            ilgili uygulamalarımızı açıklamaktadır.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Toplanan Veriler</h2>
          <p>Aşağıdaki kişisel verileri toplayabiliriz:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Ad, soyad ve iletişim bilgileri</li>
            <li>CV'nizde yer alan profesyonel ve eğitim bilgileri</li>
            <li>Hesap oluşturma ve giriş bilgileri</li>
            <li>Kullanım istatistikleri ve tercihler</li>
            <li>Ödeme bilgileri (premium üyelikler için)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Verilerin Kullanımı</h2>
          <p>Topladığımız verileri şu amaçlarla kullanıyoruz:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>CV oluşturma hizmetinin sağlanması</li>
            <li>Hesabınızın yönetimi ve güvenliği</li>
            <li>Hizmet kalitemizin iyileştirilmesi</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            <li>Size özel tekliflerin sunulması</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Veri Güvenliği</h2>
          <p>
            Verilerinizi korumak için endüstri standardı güvenlik önlemleri kullanıyoruz. 
            Bu önlemler arasında şifreleme, güvenli sunucu altyapısı ve düzenli güvenlik 
            denetimleri yer almaktadır.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Çerezler ve İzleme</h2>
          <p>
            Hizmetlerimizi iyileştirmek için çerezler ve benzer teknolojiler kullanıyoruz. 
            Bu teknolojiler, site kullanımınızı analiz etmemize ve size daha iyi bir deneyim 
            sunmamıza yardımcı olur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Haklarınız</h2>
          <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Verilerinize erişim hakkı</li>
            <li>Verilerinizin düzeltilmesini talep etme hakkı</li>
            <li>Verilerinizin silinmesini talep etme hakkı</li>
            <li>Veri işlemeye itiraz etme hakkı</li>
            <li>Veri taşınabilirliği hakkı</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. İletişim</h2>
          <p>
            Gizlilik politikamızla ilgili sorularınız için <a href="mailto:destek@cvgen.com.tr" className="text-primary hover:text-primary-dark">destek@cvgen.com.tr</a> adresinden 
            bizimle iletişime geçebilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
} 