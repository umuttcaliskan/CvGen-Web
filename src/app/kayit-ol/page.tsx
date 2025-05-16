'use client';

import React, { useState } from 'react';
import { auth } from '@/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '@/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import Link from 'next/link';
import SiteHelmet from '@/components/Helmet';
import { useRouter } from 'next/navigation';

function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDate: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    try {
      // Firebase ile kullanıcı kaydı yapma işlemi
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Kullanıcı bilgilerini Firestore'a ekleme
      const userId = userCredential.user.uid;
      await setDoc(doc(db, 'users', userId), {
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        birthDate: formatDate(formData.birthDate),
      });

      setMessage({ type: 'success', text: 'Kayıt başarılı! Giriş yapılıyor...' });
      
      // Otomatik giriş yapma
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Ana sayfaya yönlendirme
      router.push('/');
      
    } catch (error: any) {
      let errorMessage = 'Kayıt sırasında bir hata oluştu.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Bu e-posta adresi zaten kullanımda.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Şifre çok zayıf. Lütfen daha güçlü bir şifre seçin.';
      }
      
      setMessage({ type: 'error', text: errorMessage });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SiteHelmet 
        title="Kayıt Ol"
        description="CvGen'e üye olun ve profesyonel özgeçmişinizi oluşturmaya hemen başlayın. Kolay ve hızlı kayıt süreci."
        keywords="cv oluşturucu kayıt, ücretsiz üyelik, özgeçmiş hazırlama kayıt"
        ogUrl="/kayit-ol"
      />
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
          
          {message.text && (
            <div className={`mt-4 p-3 rounded-lg text-center ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.text}
            </div>
          )}
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Zaten hesabınız var mı?{' '}
          <Link href="/giris-yap" className="text-primary hover:text-primary/80 font-medium">
            Giriş Yapın
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
