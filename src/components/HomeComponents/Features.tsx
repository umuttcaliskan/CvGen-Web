"use client";

import { motion } from 'framer-motion';
import { FiFileText, FiDownload, FiUsers } from 'react-icons/fi';

const features = [
  {
    icon: <FiFileText className="w-6 h-6" />,
    title: "Profesyonel Şablonlar",
    description: "ATS uyumlu, modern ve profesyonel CV şablonları"
  },
  {
    icon: <FiDownload className="w-6 h-6" />,
    title: "Kolay İndirme",
    description: "CV'nizi PDF formatında anında indirin"
  },
  {
    icon: <FiUsers className="w-6 h-6" />,
    title: "Ücretsiz Kullanım",
    description: "Tamamen ücretsiz CV oluşturma deneyimi"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Neden CvGen?</h2>
          <p className="text-gray-600">İş arama sürecinizi kolaylaştıran özellikler</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="text-primary mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 