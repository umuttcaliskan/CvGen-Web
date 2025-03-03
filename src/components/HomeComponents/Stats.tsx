"use client";

import { motion } from 'framer-motion';

const stats = [
  { number: "20K+", label: "Oluşturulan CV" },
  { number: "30+", label: "CV Şablonu" },
  { number: "4.8/5", label: "Kullanıcı Puanı" }
];

export default function Stats() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-gray-200">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 