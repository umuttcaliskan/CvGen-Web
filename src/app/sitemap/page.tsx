import Link from 'next/link';

export default function Sitemap() {
  const siteLinks = [
    {
      title: 'Ana Sayfa',
      links: [
        { name: 'Ana Sayfa', url: '/' }
      ]
    },
    {
      title: 'CV İşlemleri',
      links: [
        { name: 'CV Oluştur', url: '/cv-olustur' },
        { name: 'Özgeçmişlerim', url: '/ozgecmislerim' },
        { name: 'Şablonlar', url: '/sablonlar' }
      ]
    },
    {
      title: 'CV Örnekleri',
      links: [
        { name: 'Tüm CV Örnekleri', url: '/cv-ornekleri' },
        { name: 'Yazılım Geliştirici CV Örneği', url: '/cv-ornek1' },
        { name: 'Öğretmen CV Örneği', url: '/cv-ornek2' },
        { name: 'Grafik Tasarımcı CV Örneği', url: '/cv-ornek3' }
      ]
    },
    {
      title: 'Blog',
      links: [
        { name: 'Blog Ana Sayfa', url: '/blog' },
        { name: 'Yeni Mezunlar İçin CV Hazırlama Rehberi', url: '/blog/yeni-mezunlar-icin-cv-hazirlama-rehberi' },
        { name: 'ATS Uyumlu CV Nasıl Hazırlanır?', url: '/blog/ats-uyumlu-cv-nasil-hazirlanir' },
        { name: 'İş Görüşmesinde Başarılı Olmanın 10 Yolu', url: '/blog/is-gorusmesinde-basarili-olmanin-10-yolu' }
      ]
    },
    {
      title: 'Hesap İşlemleri',
      links: [
        { name: 'Giriş Yap', url: '/giris-yap' },
        { name: 'Kayıt Ol', url: '/kayit-ol' },
        { name: 'Hesabım', url: '/hesabim' }
      ]
    },
    {
      title: 'İletişim',
      links: [
        { name: 'İletişim', url: '/iletisim' },
        { name: 'Destek', url: '/destek' }
      ]
    },
    {
      title: 'Yasal',
      links: [
        { name: 'Gizlilik Politikası', url: '/gizlilik-politikasi' },
        { name: 'Kullanım Koşulları', url: '/kullanim-kosullari' },
        { name: 'Site Haritası', url: '/sitemap' }
      ]
    },
    {
      title: 'Mobil Uygulama',
      links: [
        { name: 'Android Uygulaması', url: 'https://play.google.com/store' },
        { name: 'iOS Uygulaması', url: 'https://apps.apple.com' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Site Haritası</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {siteLinks.map((section) => (
            <div key={section.title} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                {section.title}
                <span className="text-sm text-gray-500">({section.links.length})</span>
              </h2>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.url}>
                    <Link 
                      href={link.url}
                      className="text-primary hover:text-primary-dark transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-primary/30 rounded-full"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sayfa İstatistikleri</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">{siteLinks.length}</div>
              <div className="text-sm text-gray-600">Kategori</div>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {siteLinks.reduce((acc, section) => acc + section.links.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Toplam Sayfa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 