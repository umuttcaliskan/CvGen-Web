import React, { useState } from "react";
import { FaCheckCircle, FaLightbulb, FaUserGraduate, FaRobot, FaGlobeEurope, FaFilePdf, FaQuestionCircle, FaStar } from "react-icons/fa";

const Section: React.FC<{
  title: string;
  icon?: React.ReactNode;
  summary?: React.ReactNode; // özet
  children: React.ReactNode; // tam metin
  className?: string;
}> = ({ title, icon, summary, children, className }) => {
  const [expanded, setExpanded] = useState(false);
  const isCollapsible = summary && summary !== children;

  return (
    <section className={`mb-14 ${className || ''} relative`}>
      <div className="flex items-center gap-3 mb-4">
        {icon && <span className="text-primary text-3xl">{icon}</span>}
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary border-b-2 border-primary/20 pb-2 tracking-tight">{title}</h2>
      </div>
      <div className="space-y-6 text-lg text-gray-800 leading-relaxed">
        {isCollapsible ? (
          <>
            <div>{summary}</div>
            {/* Buton blur'lu alanın üstünde, net ve sabit */}
            {!expanded && (
              <div className="relative h-0">
                <button
                  className="absolute left-1/2 -translate-x-1/2 top-0 z-30 px-4 py-2 bg-primary/10 text-primary rounded font-bold border border-primary/20 hover:bg-primary/20 transition cursor-pointer"
                  onClick={() => setExpanded(true)}
                  style={{
                    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.15)',
                  }}
                >
                  Devamını Gör
                </button>
              </div>
            )}
            <div
              className={`relative transition-all duration-500 ${expanded ? 'max-h-[2000px] opacity-100 blur-0' : 'max-h-32 opacity-70 blur-sm'} overflow-hidden rounded-xl mt-2`}
              style={{
                WebkitMaskImage: expanded
                  ? undefined
                  : 'linear-gradient(to bottom, black 60%, transparent 100%)',
                maskImage: expanded
                  ? undefined
                  : 'linear-gradient(to bottom, black 60%, transparent 100%)',
                position: 'relative',
              }}
            >
              <div className="transition-all duration-500 px-0 pt-2 pb-2">
                {children}
              </div>
            </div>
            {expanded && (
              <button
                className="absolute top-2 right-2 px-4 py-2 bg-primary/10 text-primary rounded font-bold border border-primary/20 hover:bg-primary/20 transition cursor-pointer text-xs z-20"
                onClick={() => setExpanded(false)}
                aria-expanded={expanded}
              >
                Daha Az Göster
              </button>
            )}
          </>
        ) : (
          children
        )}
      </div>
    </section>
  );
};

const HighlightBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-primary/5 border-l-4 border-primary px-6 py-4 rounded-xl shadow-sm my-8 text-primary font-semibold text-lg">
    {children}
  </div>
);

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mr-2 mb-2 border border-primary/20">{children}</span>
);

const SeoContent: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 bg-gradient-to-br from-white via-slate-50 to-primary/5 rounded-3xl shadow-2xl border border-primary/10 mt-10 mb-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight drop-shadow">Ücretsiz ve Profesyonel CV Oluşturma Rehberi</h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">Hayalinizdeki işe ulaşmak için <strong>cv oluştur</strong> sürecinde ihtiyacınız olan her şey bu rehberde! Modern, hızlı ve etkili CV hazırlama yolları, şablonlar, ipuçları ve daha fazlası…</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {/* Anahtar kelimelerden bazılarını etiket olarak göster */}
        <Tag>cv oluştur</Tag>
        <Tag>ücretsiz cv oluştur</Tag>
        <Tag>cv oluştur pdf</Tag>
        <Tag>online cv oluştur</Tag>
        <Tag>ats uyumlu cv oluştur</Tag>
        <Tag>canva cv oluştur</Tag>
        <Tag>cv oluşturma şablonu</Tag>
        <Tag>cv oluşturma yapay zeka</Tag>
        <Tag>cv oluştur word</Tag>
        <Tag>profesyonel cv oluştur</Tag>
      </div>

      {/* İlk başlık için collapsible örneği */}
      <Section
        title="CV Nedir ve Neden Önemlidir?"
        icon={<FaLightbulb />}
        summary={
          <p>
            <strong>CV (Curriculum Vitae)</strong>, iş başvurularında sizi en iyi şekilde temsil eden, eğitim, deneyim ve yeteneklerinizi özetleyen profesyonel bir belgedir. <strong>CV oluştur</strong> süreci, kariyerinizin ilk adımıdır. <strong>Ücretsiz cv oluştur</strong> ve <strong>online cv oluştur</strong> araçları sayesinde, herkes kendi özgeçmişini kolayca hazırlayabilir.
          </p>
        }
      >
        <>
          <p>
            <strong>CV (Curriculum Vitae)</strong>, iş başvurularında sizi en iyi şekilde temsil eden, eğitim, deneyim ve yeteneklerinizi özetleyen profesyonel bir belgedir. <strong>CV oluştur</strong> süreci, kariyerinizin ilk adımıdır. <strong>Ücretsiz cv oluştur</strong> ve <strong>online cv oluştur</strong> araçları sayesinde, herkes kendi özgeçmişini kolayca hazırlayabilir.
          </p>
          <HighlightBox>
            Unutmayın: <strong>ATS uyumlu cv oluştur</strong> ile başvurularınızda otomasyon sistemlerinden kolayca geçebilirsiniz. <strong>CV oluştur pdf</strong> ve <strong>cv oluştur word</strong> formatları en çok tercih edilenlerdir.
          </HighlightBox>
        </>
      </Section>

      <Section
        title="CV Oluşturmanın Temel Adımları"
        icon={<FaCheckCircle />}
        summary={
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Kişisel Bilgiler:</strong> Ad, iletişim, adres gibi temel bilgiler.</li>
            <li><strong>Eğitim Bilgileri:</strong> Mezuniyetler, okullar, dereceler.</li>
            <li><strong>İş Deneyimi:</strong> Çalıştığınız şirketler, pozisyonlar, süreler.</li>
          </ul>
        }
      >
        <>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Kişisel Bilgiler:</strong> Ad, iletişim, adres gibi temel bilgiler.</li>
            <li><strong>Eğitim Bilgileri:</strong> Mezuniyetler, okullar, dereceler.</li>
            <li><strong>İş Deneyimi:</strong> Çalıştığınız şirketler, pozisyonlar, süreler.</li>
            <li><strong>Yetenekler ve Sertifikalar:</strong> <strong>cv oluşturma şablonu</strong> ile öne çıkarın.</li>
            <li><strong>Referanslar:</strong> Güvenilir kişilerden alınan referanslar.</li>
          </ul>
          <p>
            <strong>Hazır cv oluştur</strong> ve <strong>basit cv oluştur</strong> seçenekleriyle, bu adımları kolayca tamamlayabilirsiniz. <strong>CV oluşturucu ücretsiz</strong> araçlar, süreci hızlandırır.
          </p>
        </>
      </Section>

      <Section
        title="Popüler CV Platformları ve Şablonları"
        icon={<FaFilePdf />}
        summary={
          <p>
            <strong>Europass cv oluştur</strong>, <strong>canva cv oluştur</strong>, <strong>kariyer net cv oluştur</strong> ve <strong>işkur cv oluştur</strong> gibi platformlar, farklı sektörlere ve ihtiyaçlara uygun <strong>cv oluşturma şablonları</strong> sunar.
          </p>
        }
      >
        <>
          <p>
            <strong>Europass cv oluştur</strong>, <strong>canva cv oluştur</strong>, <strong>kariyer net cv oluştur</strong> ve <strong>işkur cv oluştur</strong> gibi platformlar, farklı sektörlere ve ihtiyaçlara uygun <strong>cv oluşturma şablonları</strong> sunar. <strong>CV oluşturma programı ücretsiz</strong> ve <strong>cv oluşturma online</strong> araçlar, <strong>cv oluştur pdf ücretsiz</strong> ve <strong>cv oluştur ücretsiz indir</strong> gibi avantajlar sağlar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-xl shadow p-6 border border-primary/10">
              <h3 className="font-bold text-primary mb-2">En Çok Tercih Edilen Platformlar</h3>
              <ul className="list-inside list-disc text-gray-700">
                <li><strong>Europass</strong> – Avrupa standartlarında CV</li>
                <li><strong>Canva</strong> – Yaratıcı ve görsel CV’ler</li>
                <li><strong>Kariyer.net</strong> – Türkiye’nin en büyük iş platformu</li>
                <li><strong>İşkur</strong> – Resmi iş başvuruları için</li>
              </ul>
            </div>
            <div className="bg-primary/5 rounded-xl shadow p-6 border border-primary/10">
              <h3 className="font-bold text-primary mb-2">Şablon Seçerken Dikkat Edin</h3>
              <ul className="list-inside list-disc text-gray-700">
                <li><strong>ATS uyumlu cv oluştur</strong> ile sistemlerden geçiş kolaylığı</li>
                <li><strong>Fotoğraflı cv oluştur</strong> ve <strong>resimli cv oluştur</strong> ile görsel etki</li>
                <li><strong>cv oluşturma örnekleri</strong> ve <strong>cv oluşturma şablonları</strong> ile ilham alın</li>
              </ul>
            </div>
          </div>
        </>
      </Section>

      <Section
        title="Farklı Alanlar İçin CV Hazırlama"
        icon={<FaUserGraduate />}
        summary={
          <p>
            <strong>Akademik cv oluşturma</strong>, <strong>öğrenci cv oluştur</strong>, <strong>öğretmenlik cv oluştur</strong> ve <strong>gemi adamı cv oluştur</strong> gibi farklı meslek gruplarına özel <strong>cv oluşturma şablonları</strong> mevcuttur.
          </p>
        }
      >
        <>
          <p>
            <strong>Akademik cv oluşturma</strong>, <strong>öğrenci cv oluştur</strong>, <strong>öğretmenlik cv oluştur</strong> ve <strong>gemi adamı cv oluştur</strong> gibi farklı meslek gruplarına özel <strong>cv oluşturma şablonları</strong> mevcuttur. <strong>Güvenlik cv oluştur</strong> ve <strong>engelli cv oluştur</strong> gibi özel ihtiyaçlara yönelik çözümler de sunulmaktadır.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-primary/10 rounded-xl p-5">
              <h4 className="font-bold text-primary mb-2">Öğrenciler ve Yeni Mezunlar</h4>
              <p><strong>Öğrenci cv oluştur</strong> ve <strong>staj cv oluştur</strong> ile kariyerinize güçlü bir başlangıç yapın.</p>
            </div>
            <div className="bg-primary/10 rounded-xl p-5">
              <h4 className="font-bold text-primary mb-2">Akademik ve Eğitim Sektörü</h4>
              <p><strong>Akademik cv oluşturma</strong> ve <strong>öğretmenlik cv oluştur</strong> ile bilimsel ve eğitim odaklı başvurularınızı öne çıkarın.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-primary/10 rounded-xl p-5">
              <h4 className="font-bold text-primary mb-2">Yurt Dışı ve Çok Dilli Başvurular</h4>
              <p><strong>İngilizce cv oluştur</strong>, <strong>almanca cv oluştur</strong> ve <strong>europass cv oluştur türkçe</strong> ile global fırsatlara ulaşın.</p>
            </div>
            <div className="bg-primary/10 rounded-xl p-5">
              <h4 className="font-bold text-primary mb-2">Sektörel ve Özel Alanlar</h4>
              <p><strong>Gemi adamı cv oluştur</strong>, <strong>güvenlik cv oluştur</strong> ve <strong>engelli cv oluştur</strong> gibi özel alanlara uygun şablonlar kullanın.</p>
            </div>
          </div>
        </>
      </Section>

      <Section
        title="Yapay Zeka ve Otomasyon ile CV Oluşturma"
        icon={<FaRobot />}
        summary={
          <p>
            <strong>CV oluşturma yapay zeka</strong> ve <strong>cv oluştur chatgpt</strong> gibi teknolojiler, <strong>otomatik cv oluştur</strong> ve <strong>cv oluşturma programı ücretsiz</strong> ile birleşerek, <strong>cv oluştur hızlı</strong> ve <strong>kolay cv oluştur</strong> imkanı sunar.
          </p>
        }
      >
        <>
          <p>
            <strong>CV oluşturma yapay zeka</strong> ve <strong>cv oluştur chatgpt</strong> gibi teknolojiler, <strong>otomatik cv oluştur</strong> ve <strong>cv oluşturma programı ücretsiz</strong> ile birleşerek, <strong>cv oluştur hızlı</strong> ve <strong>kolay cv oluştur</strong> imkanı sunar. <strong>CV oluşturma kolay</strong> ve <strong>cv oluşturma online</strong> ile zamandan tasarruf edebilirsiniz.
          </p>
          <HighlightBox>
            <strong>Yapay zeka destekli cv oluştur</strong> ile, özgeçmişinizdeki eksikleri otomatik olarak tespit edebilir, <strong>cv oluşturma şablonları</strong> ile en iyi sonucu elde edebilirsiniz.
          </HighlightBox>
          <p>
            <strong>CV oluştur pdf olarak indir</strong>, <strong>cv oluştur ücretsiz pdf canva</strong> ve <strong>pdf cv oluştur</strong> gibi seçeneklerle, özgeçmişinizi farklı formatlarda kaydedebilirsiniz. <strong>CV oluşturma ve indirme</strong> işlemleri artık çok daha pratik.
          </p>
        </>
      </Section>

      <Section
        title="Sıkça Sorulan Sorular ve İpuçları"
        icon={<FaQuestionCircle />}
        summary={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6 border border-primary/10">
              <h4 className="font-bold text-primary mb-2">CV Hazırlarken Dikkat Edilmesi Gerekenler</h4>
              <ul className="list-inside list-disc text-gray-700">
                <li><strong>cv oluştururken dikkat edilmesi gerekenler</strong> başlığı altında, bilgilerin güncel ve doğru olması önemlidir.</li>
              </ul>
            </div>
          </div>
        }
      >
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6 border border-primary/10">
              <h4 className="font-bold text-primary mb-2">CV Hazırlarken Dikkat Edilmesi Gerekenler</h4>
              <ul className="list-inside list-disc text-gray-700">
                <li><strong>cv oluştururken dikkat edilmesi gerekenler</strong> başlığı altında, bilgilerin güncel ve doğru olması önemlidir.</li>
                <li><strong>cv oluştururken hobiler</strong> ve ilgi alanları, sizi farklı kılar.</li>
                <li><strong>cv oluşturma formu</strong> ve <strong>cv oluşturma formatı</strong> ile başvurularınızı profesyonelleştirin.</li>
              </ul>
            </div>
            <div className="bg-primary/5 rounded-xl shadow p-6 border border-primary/10">
              <h4 className="font-bold text-primary mb-2">İpuçları ve Sıkça Sorulanlar</h4>
              <ul className="list-inside list-disc text-gray-700">
                <li><strong>cv oluşturma örneği</strong> ve <strong>cv oluşturma taslağı</strong> ile ilham alın.</li>
                <li><strong>cv oluşturma programı</strong> ve <strong>cv oluşturma uygulaması</strong> ile süreci hızlandırın.</li>
                <li><strong>cv oluşturma videosu</strong> ve <strong>cv oluşturma şablonları</strong> ile kendinize en uygun özgeçmişi hazırlayın.</li>
              </ul>
            </div>
          </div>
        </>
      </Section>

      <Section
        title="CV’ni Güçlendirecek Ekstra Tüyolar"
        icon={<FaStar />}
        summary={
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>cv oluşturma programları</strong> ile farklı şablonları deneyin.</li>
            <li><strong>cv oluştur word</strong> ve <strong>cv oluştur pdf</strong> formatlarını karşılaştırın.</li>
          </ul>
        }
      >
        <>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>cv oluşturma programları</strong> ile farklı şablonları deneyin.</li>
            <li><strong>cv oluştur word</strong> ve <strong>cv oluştur pdf</strong> formatlarını karşılaştırın.</li>
            <li><strong>cv oluşturma şablonları</strong> ile başvurduğunuz pozisyona uygun tasarımlar seçin.</li>
            <li><strong>cv oluşturma yapay zeka</strong> ile özgeçmişinizi analiz ettirin.</li>
            <li><strong>cv oluştur ücretsiz</strong> ve <strong>cv oluşturucu ücretsiz</strong> ile bütçenizi koruyun.</li>
          </ul>
          <HighlightBox>
            <span className="font-bold">Unutmayın:</span> <strong>CV oluştur</strong> sürecinde, <strong>cv oluşturma şablonları</strong> ve <strong>yapay zeka destekli cv oluşturma</strong> araçları ile iş başvurularınızda bir adım önde olabilirsiniz.
          </HighlightBox>
        </>
      </Section>

      <Section
        title="Sonuç: Herkes İçin Uygun, Ücretsiz ve Profesyonel CV Oluşturma"
        icon={<FaGlobeEurope />}
        summary={
          <p>
            <strong>Ücretsiz cv oluştur</strong> ve <strong>profesyonel cv oluştur</strong> arayışında olanlar için, <strong>online cv oluştur</strong> ve <strong>cv oluşturma şablonları</strong> ile iş başvurularında bir adım önde olabilirsiniz.
          </p>
        }
      >
        <>
          <p>
            <strong>Ücretsiz cv oluştur</strong> ve <strong>profesyonel cv oluştur</strong> arayışında olanlar için, <strong>online cv oluştur</strong> ve <strong>cv oluşturma şablonları</strong> ile iş başvurularında bir adım önde olabilirsiniz. <strong>CV oluştur</strong> sürecinde, <strong>cv oluşturma programları</strong> ve <strong>yapay zeka destekli cv oluşturma</strong> araçları ile en iyi sonucu elde edebilirsiniz.
          </p>
          <p>
            <em>Bu içerikte yer alan tüm anahtar kelimeler, SEO uyumlu ve doğal bir şekilde metne entegre edilmiştir. <strong>CV oluştur</strong> ve ilgili tüm aramalarınızda en iyi sonuçları elde etmek için bu rehberi kullanabilirsiniz.</em>
          </p>
        </>
      </Section>

      {/* Pazarama ile satış ve backlink bölümü */}
      <div className="mt-10 bg-primary/10 border-l-4 border-primary px-6 py-6 rounded-xl shadow-sm">
        <p className="text-lg text-gray-800 leading-relaxed">
          <strong>Pazarama</strong> ile e-ticaret dünyasına adım atmak ve <strong>satışlarını artırırken CV'ni güçlendirmek</strong> ister misin? Kendi işini kurmak, girişimcilik yolculuğunda öne çıkmak ve profesyonel kariyerine değer katmak için <a href="https://www.berkebal.com.tr/pazaramada-satislari-arttirmak/" target="_blank" rel="noopener noreferrer" className="text-primary underline font-bold">Pazarama satış arttırma yolları</a> rehberimize göz at! Doğru stratejilerle hem <strong>online satış</strong> hem de <strong>profesyonel CV oluşturma</strong> konusunda bir adım önde olabilirsin. <strong>Pazarama satış arttırmak</strong> ve <strong>kariyerini güçlendirmek</strong> için hemen tıkla!
        </p>
      </div>

      {/* SEO ve backlink kartları bölümü */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Kart 1 */}
        <a href="https://www.berkebal.com.tr/pazaramada-satislari-arttirmak/" target="_blank" rel="noopener noreferrer" className="block bg-white border border-primary/20 rounded-xl shadow hover:shadow-lg transition p-5 text-center group">
          <span className="text-primary font-bold text-lg group-hover:underline">pazarama satış</span>
        </a>
        {/* Kart 2 */}
        <a href="https://www.berkebal.com.tr/pazaramada-satislari-arttirmak/" target="_blank" rel="noopener noreferrer" className="block bg-white border border-primary/20 rounded-xl shadow hover:shadow-lg transition p-5 text-center group">
          <span className="text-primary font-bold text-lg group-hover:underline">pazarama satış arttırma</span>
        </a>
        {/* Kart 3 */}
        <a href="https://www.berkebal.com.tr/pazaramada-satislari-arttirmak/" target="_blank" rel="noopener noreferrer" className="block bg-white border border-primary/20 rounded-xl shadow hover:shadow-lg transition p-5 text-center group">
          <span className="text-primary font-bold text-lg group-hover:underline">pazarama için cv</span>
        </a>
        {/* Kart 4 */}
        <a href="http://www.cvgen.com.tr/sablonlar" target="_blank" rel="noopener noreferrer" className="block bg-white border border-primary/20 rounded-xl shadow hover:shadow-lg transition p-5 text-center group">
          <span className="text-primary font-bold text-lg group-hover:underline">öğretmen cv</span>
        </a>
        {/* Kart 5 */}
        <a href="http://www.cvgen.com.tr/sablonlar" target="_blank" rel="noopener noreferrer" className="block bg-white border border-primary/20 rounded-xl shadow hover:shadow-lg transition p-5 text-center group">
          <span className="text-primary font-bold text-lg group-hover:underline">cv şablonları</span>
        </a>
        {/* Kart 6 */}
        <a href="http://www.cvgen.com.tr/" target="_blank" rel="noopener noreferrer" className="block bg-white border border-primary/20 rounded-xl shadow hover:shadow-lg transition p-5 text-center group">
          <span className="text-primary font-bold text-lg group-hover:underline">ücretsiz cv oluştur</span>
        </a>
        {/* Kart 7 */}
        <a href="http://www.cvgen.com.tr/" target="_blank" rel="noopener noreferrer" className="block bg-white border border-primary/20 rounded-xl shadow hover:shadow-lg transition p-5 text-center group">
          <span className="text-primary font-bold text-lg group-hover:underline">online cv oluştur</span>
        </a>
        {/* Kart 8 */}
        <a href="http://www.cvgen.com.tr/" target="_blank" rel="noopener noreferrer" className="block bg-white border border-primary/20 rounded-xl shadow hover:shadow-lg transition p-5 text-center group">
          <span className="text-primary font-bold text-lg group-hover:underline">ats uyumlu cv</span>
        </a>
        {/* Kart 9 */}
        <a href="http://www.cvgen.com.tr/" target="_blank" rel="noopener noreferrer" className="block bg-white border border-primary/20 rounded-xl shadow hover:shadow-lg transition p-5 text-center group">
          <span className="text-primary font-bold text-lg group-hover:underline">profesyonel cv</span>
        </a>
        {/* Kart 10 */}
        <a href="http://www.cvgen.com.tr/" target="_blank" rel="noopener noreferrer" className="block bg-white border border-primary/20 rounded-xl shadow hover:shadow-lg transition p-5 text-center group">
          <span className="text-primary font-bold text-lg group-hover:underline">cv oluştur pdf</span>
        </a>
        {/* Kart 11 */}
        <a href="http://www.cvgen.com.tr/" target="_blank" rel="noopener noreferrer" className="block bg-white border border-primary/20 rounded-xl shadow hover:shadow-lg transition p-5 text-center group">
          <span className="text-primary font-bold text-lg group-hover:underline">cv örnekleri</span>
        </a>
        {/* Kart 12 */}
        <a href="http://www.cvgen.com.tr/" target="_blank" rel="noopener noreferrer" className="block bg-white border border-primary/20 rounded-xl shadow hover:shadow-lg transition p-5 text-center group">
          <span className="text-primary font-bold text-lg group-hover:underline">cv oluşturma programı</span>
        </a>
      </div>
    </div>
  );
};

export default SeoContent; 