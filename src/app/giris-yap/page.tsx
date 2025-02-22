'use client';

import React, { useState, useEffect } from 'react';
import { auth } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const SignInPage: React.FC = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Giriş başarılı:', user);
      login(user);
      router.push('/');
    } catch (error) {
      console.error('Giriş hatası:', error);
    }
  };

  // Kullanıcı giriş kontrolü
  useEffect(() => {
    if (user) {
      // Kullanıcı zaten giriş yapmışsa yönlendirme yapabilirsiniz
      router.push('/'); // Kullanıcıyı anasayfaya yönlendir
    }
  }, [user, router]); // user ve router değiştiğinde çalışır

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">E-posta:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:border-transparent"
              placeholder="E-posta adresinizi girin"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Şifre:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:border-transparent"
              placeholder="Şifrenizi girin"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;