'use client'; // İstemci bileşeni olarak işaretliyoruz

import React, { useState } from 'react';
import { auth } from '@/firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { db } from '@/firebaseConfig'; // Firestore'u içe aktar
import { setDoc, doc } from 'firebase/firestore'; // Firestore'da belge ayarlamak için gerekli fonksiyonlar

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Firebase ile kullanıcı kaydı yapma işlemi
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('Kullanıcı kaydedildi:', userCredential.user);

      // Kullanıcı bilgilerini Firestore'a ekleme
      const userId = userCredential.user.uid; // Kullanıcı ID'sini al
      await setDoc(doc(db, 'users', userId), {
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        birthDate: formatDate(formData.birthDate), // Tarihi formatla
      });

      console.log('Kullanıcı bilgileri Firestore\'a eklendi.');
    } catch (error) {
      console.error('Kayıt hatası:', error);
    }
  };

  // Tarih formatlama fonksiyonu
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0'dan başlar
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // DD-MM-YYYY formatı
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Kayıt Ol</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium">Ad</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:border-transparent"
              placeholder="Adınızı girin"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium">Soyad</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Soyadınızı girin"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">E-posta</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="E-posta adresinizi girin"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Şifre</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Şifrenizi girin"
            />
          </div>
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium">Doğum Tarihi</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
