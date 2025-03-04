'use client';

import React, { useState } from 'react'
import Banner from '@/components/Banner'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/firebaseConfig'
import { deleteDoc, doc } from 'firebase/firestore'
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser } from 'firebase/auth'
import Modal from '@/components/Modal'
import { FaExclamationTriangle, FaLock, FaTrash } from 'react-icons/fa'

function AccountDelete() {
  const { user } = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  if (!user) {
    router.push('/giris-yap');
    return null;
  }

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!password) {
      setError('Lütfen şifrenizi girin.');
      return;
    }

    try {
      setLoading(true);
      
      // Kullanıcıyı yeniden doğrula
      const credential = EmailAuthProvider.credential(
        user.email!,
        password
      );
      
      await reauthenticateWithCredential(user, credential);
      
      // Onay modalını aç
      setIsConfirmModalOpen(true);
      
    } catch (error: any) {
      console.error('Kimlik doğrulama hatası:', error);
      if (error.code === 'auth/wrong-password') {
        setError('Girdiğiniz şifre yanlış.');
      } else {
        setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteAccount = async () => {
    try {
      setLoading(true);
      
      // Kullanıcının Firestore verilerini sil
      if (user) {
        await deleteDoc(doc(db, 'users', user.uid));
        
        // Kullanıcı hesabını sil
        await deleteUser(user);
        
        // Onay modalını kapat ve başarı modalını aç
        setIsConfirmModalOpen(false);
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      console.error('Hesap silme hatası:', error);
      setError('Hesabınızı silerken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      setIsConfirmModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    router.push('/');
  };

  return (
    <div>
      <Banner 
        title="Hesabımı Sil" 
        description="Hesabınızı kalıcı olarak silmek için aşağıdaki adımları izleyin." 
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="text-red-500 text-3xl" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Hesabınızı Silmek Üzeresiniz</h2>
          <p className="text-center text-gray-600 mb-8">
            Bu işlem geri alınamaz. Hesabınız ve tüm verileriniz kalıcı olarak silinecektir.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Hesabınızı sildiğinizde:
                </p>
                <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
                  <li>Tüm özgeçmişleriniz silinecektir</li>
                  <li>Hesap bilgilerinize bir daha erişemeyeceksiniz</li>
                  <li>Bu işlem geri alınamaz</li>
                </ul>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleDeleteAccount} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Şifrenizi Doğrulayın
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Mevcut şifreniz"
                  required
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <FaTrash className="mr-2" />
                )}
                Hesabımı Sil
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Onay Modalı */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Hesap Silme Onayı"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <FaExclamationTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Hesabınızı silmek istediğinizden emin misiniz?</h3>
          <p className="text-sm text-gray-500 mb-6">
            Bu işlem geri alınamaz. Hesabınız ve tüm verileriniz kalıcı olarak silinecektir.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={() => setIsConfirmModalOpen(false)}
            >
              İptal
            </button>
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={confirmDeleteAccount}
              disabled={loading}
            >
              {loading ? 'İşleniyor...' : 'Evet, Hesabımı Sil'}
            </button>
          </div>
        </div>
      </Modal>
      
      {/* Başarı Modalı */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        title="Hesap Silindi"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Hesabınız başarıyla silindi</h3>
          <p className="text-sm text-gray-500 mb-6">
            Hesabınız ve tüm verileriniz kalıcı olarak silinmiştir. Bizi tercih ettiğiniz için teşekkür ederiz.
          </p>
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={handleSuccessModalClose}
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default AccountDelete
