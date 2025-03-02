"use client";

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: "Ahmet Yılmaz",
    role: "Frontend Geliştirici, Teknova",
    comment: "3 ay boyunca iş aradıktan sonra CvGen'i keşfettim. ATS uyumlu CV şablonları sayesinde başvurularım daha fazla geri dönüş almaya başladı. Özellikle teknik becerileri ön plana çıkaran tasarımı çok işime yaradı. Şu an hayalini kurduğum şirkette çalışıyorum!"
  },
  {
    name: "Ayşe Kaya",
    role: "UI/UX Tasarımcısı, Freelancer",
    comment: "Portfolyomu ve CV'mi tek bir platformda yönetebilmek muhteşem. PDF çıktıların kalitesi gerçekten etkileyici. En sevdiğim özellik ise her müşteri için CV'mi özelleştirebilmem. Son 6 ayda 4 büyük projeyi bu sayede kazandım."
  },
  {
    name: "Mehmet Sarı",
    role: "Kıdemli Proje Yöneticisi, Global Yazılım",
    comment: "20 yıllık iş deneyimimi düzenli bir şekilde aktarmak her zaman sorundu. CvGen'in kronolojik düzeni ve başarı odaklı yaklaşımı tam da ihtiyacım olandı. Yönetici pozisyonuna geçiş sürecimde CV'min büyük etkisi oldu."
  },
  {
    name: "Zeynep Bakır",
    role: "Dijital Pazarlama Uzmanı, MediaTech",
    comment: "LinkedIn profilimi CV'me aktarma özelliği inanılmaz zaman kazandırdı. Metrik odaklı başarılarımı vurgulayabildiğim bölümler sayesinde, görüşmeye çağrılma oranım %60 arttı. Ayrıca mobil uygulaması da çok kullanışlı."
  },
  {
    name: "Can Demir",
    role: "Bilgisayar Mühendisliği Öğrencisi, İTÜ",
    comment: "Staj başvuruları için profesyonel görünümlü bir CV'ye ihtiyacım vardı ama bütçem kısıtlıydı. CvGen'in öğrenci planı tam bana göre! Üstelik GitHub entegrasyonu sayesinde projelerimi otomatik olarak CV'me ekleyebiliyorum."
  },
  {
    name: "Elif Tekin",
    role: "İK Direktörü, Tech Solutions",
    comment: "İK profesyoneli olarak her gün onlarca CV inceliyorum. CvGen ile hazırlanan CV'ler her zaman dikkatimi çekiyor. ATS uyumluluğu, düzenli yapısı ve profesyonel tasarımı ile hem işe alım yapan hem de iş arayan taraf için mükemmel bir çözüm."
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Kullanıcılarımız Ne Diyor?</h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            }
          }}
          className="testimonials-swiper !pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="h-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 p-6 rounded-xl flex flex-col h-full"
              >
                <p className="text-gray-600 mb-4 flex-grow">{testimonial.comment}</p>
                <div className="mt-auto">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
} 