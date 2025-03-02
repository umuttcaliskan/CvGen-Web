import React from 'react';

export default function KullanimKosullari() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Kullanım Koşulları</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="mb-6">
          Son güncellenme: {new Date().toLocaleDateString('tr-TR')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Hizmet Kullanım Şartları</h2>
          <p>
            CVGen hizmetlerini kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız. 
            Bu koşulları kabul etmiyorsanız, lütfen hizmetlerimizi kullanmayınız.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Hesap Oluşturma ve Güvenlik</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Hesap oluştururken doğru ve güncel bilgiler vermekle yükümlüsünüz</li>
            <li>Hesap güvenliğinizden siz sorumlusunuz</li>
            <li>Hesabınızla yapılan tüm işlemlerden siz sorumlusunuz</li>
            <li>Şüpheli bir durum fark ettiğinizde bize haber vermelisiniz</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Ücretlendirme ve Ödemeler</h2>
          <p>
            CVGen hizmetleri ikinci bir duyuruya kadar tamamen ücretsiz olarak sunulmaktadır. 
            İleride ücretli premium özellikler eklendiğinde, bu değişiklik önceden duyurulacak 
            ve mevcut ücretsiz özellikler korunacaktır.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Kullanım Kısıtlamaları</h2>
          <p>Aşağıdaki eylemler kesinlikle yasaktır:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Sistemimize zarar verecek yazılımlar kullanmak</li>
            <li>Diğer kullanıcıların deneyimini olumsuz etkileyecek davranışlarda bulunmak</li>
            <li>Hizmetlerimizi yasa dışı amaçlarla kullanmak</li>
            <li>Telif hakkı ihlali yapmak</li>
            <li>Sistemimizi kötüye kullanmak</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. İçerik ve Telif Hakları</h2>
          <p>
            CVGen&apos;de yer alan tüm içerik ve yazılımlar telif hakkı ile korunmaktadır. 
            Kullanıcılar olarak oluşturduğunuz CV'lerin içeriğinden siz sorumlusunuz. 
            Başkalarının telif hakklarını ihlal etmemeye özen göstermelisiniz.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Hizmet Değişiklikleri</h2>
          <p>
            CVGen olarak hizmetlerimizde değişiklik yapma, yeni özellikler ekleme veya 
            bazı özellikleri kaldırma hakkını saklı tutarız. Bu değişiklikler hakkında 
            kullanıcılarımızı önceden bilgilendiririz.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Hesap İptali ve Fesih</h2>
          <p>
            Kullanıcılar hesaplarını istedikleri zaman iptal edebilirler. Ayrıca, 
            kullanım koşullarının ihlali durumunda CVGen hesabınızı askıya alma 
            veya tamamen kapatma hakkını saklı tutar.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Sorumluluk Reddi</h2>
          <p>
            CVGen, hizmetlerinin kesintisiz ve hatasız olacağını garanti etmez. 
            Hizmetlerimizi &quot;olduğu gibi&quot; sunuyoruz ve kullanımından doğacak 
            sonuçlardan sorumlu değiliz.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. İletişim</h2>
          <p>
            Kullanım koşullarıyla ilgili sorularınız için <a href="mailto:destek@cvgen.com.tr" className="text-primary hover:text-primary-dark">destek@cvgen.com.tr</a> adresinden 
            bizimle iletişime geçebilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
} 