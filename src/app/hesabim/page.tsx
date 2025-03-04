'use client';

import React, { useEffect, useState, useRef } from 'react'
import Banner from '@/components/Banner'
import { useAuth } from '@/context/AuthContext'
import { FaUser, FaEnvelope, FaCalendar, FaSignOutAlt, FaCamera } from 'react-icons/fa'
import { db, auth, storage } from '@/firebaseConfig'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Modal from '@/components/Modal'

interface UserProfile {
  fullName: string;
  email: string;
  birthDate: string;
  [key: string]: any;  // Firestore için index signature ekleyin
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function Account() {
  const { user } = useAuth();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    birthDate: "",
    createdAt: "",
    emailNotifications: false,
    pushNotifications: false
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [name, setName] = useState('');
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserDetails({
            ...userData,
            email: user.email || ""
          } as any);
          
          // Profil resmini kontrol etme
          if (userData.profileImage) {
            try {
              const imageUrl = await getDownloadURL(ref(storage, userData.profileImage));
              setProfileImage(imageUrl);
            } catch (error) {
              console.error('Profil resmi yükleme hatası:', error);
              setProfileImage(null);
            }
          }
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Çıkış yapma hatası:', error);
    }
  };

  const handleUpdateProfile = async (data: UserProfile) => {
    try {
      if (!user) return;
      const updateData = { ...data } as { [key: string]: any };
      await updateDoc(doc(db, 'users', user.uid), updateData);
      setUserDetails(prev => ({ ...prev, ...data }));
    } catch (error) {
      console.error('Profil güncelleme hatası:', error);
    }
  };

  const handleNotificationSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        console.error('Kullanıcı mevcut değil.');
        return; // Kullanıcı yoksa işlemi durdur
    }
    
    try {
        // Bildirim ayarlarını Firestore'da güncelle
        await updateDoc(doc(db, 'users', user.uid), {
            emailNotifications: userDetails.emailNotifications,
            pushNotifications: userDetails.pushNotifications
        });
        setNotificationMessage('Bildirim ayarları başarıyla güncellendi.');
    } catch (error) {
        console.error('Bildirim ayarlarını güncelleme hatası:', error);
        setNotificationMessage('Bildirim ayarlarını güncellerken bir hata oluştu.');
    }
  };

  const handleChangePassword = async (data: PasswordData) => {
    // fonksiyonu kullanın veya kaldırın
  };

  const handleDeleteAccount = async () => {
    if (!user) {
      console.error('Kullanıcı mevcut değil.');
      return;
    }
    
    try {
      // Kullanıcıyı Firestore'dan sil
      await deleteDoc(doc(db, 'users', user.uid));
      // Kullanıcıyı Auth'dan sil
      await auth.currentUser?.delete();
      // Çıkış yap ve anasayfaya yönlendir
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Hesabı silme hatası:', error);
      openModal('Hesabınızı silerken bir hata oluştu.');
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setIsUploading(true);
      
      // Storage'a resmi yükle
      const storageRef = ref(storage, `profile_images/${user.uid}`);
      await uploadBytes(storageRef, file);
      
      // Yüklenen resmin URL'ini al
      const downloadURL = await getDownloadURL(storageRef);
      
      // Firestore'da kullanıcı dokümanını güncelle
      await updateDoc(doc(db, 'users', user.uid), {
        profileImage: `profile_images/${user.uid}`
      });
      
      setProfileImage(downloadURL);
    } catch (error) {
      console.error('Resim yükleme hatası:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Baş harfi göstermek için
  const getInitial = () => {
    return userDetails.fullName ? userDetails.fullName.charAt(0).toUpperCase() : '?';
  };

  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditProfileOpen(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangePasswordOpen(false);
  };

  return (
    <div>
      <Banner 
        title="Hesabım" 
        description="Hesap bilgilerinizi görüntüleyin ve düzenleyin." 
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center mb-8">
            {/* Profil Resmi */}
            <div className="relative cursor-pointer group" onClick={handleImageClick}>
              {profileImage ? (
                <div className="w-32 h-32 rounded-full overflow-hidden relative">
                  <Image
                    src={profileImage}
                    alt="Profil Resmi"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-semibold">
                  {getInitial()}
                </div>
              )}
              
              {/* Kamera ikonu */}
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {isUploading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaCamera className="text-white text-2xl" />
                )}
              </div>
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            
            <p className="mt-2 text-sm text-gray-500">
              Profil resmini değiştirmek için tıkla
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Profil Bilgileri */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Profil Bilgileri</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaUser className="text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Ad Soyad</p>
                    <p className="font-medium">{userDetails.fullName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">E-posta</p>
                    <p className="font-medium">{userDetails.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaCalendar className="text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Doğum Tarihi</p>
                    <p className="font-medium">{userDetails.birthDate}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsEditProfileOpen(true)}
                className="mt-6 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
              >
                Profili Düzenle
              </button>
            </div>

            {/* Hesap Ayarları */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Hesap Ayarları</h2>
              <div className="space-y-4">
                <button 
                  onClick={() => setIsEditProfileOpen(true)}
                  className="w-full text-left px-4 py-3 border rounded hover:bg-gray-50 transition-colors"
                >
                  Profili Düzenle
                </button>
                
                <button 
                  onClick={() => setIsChangePasswordOpen(true)}
                  className="w-full text-left px-4 py-3 border rounded hover:bg-gray-50 transition-colors"
                >
                  Şifre Değiştir
                </button>
                
                <button 
                  onClick={() => setIsNotificationSettingsOpen(true)}
                  className="w-full text-left px-4 py-3 border rounded hover:bg-gray-50 transition-colors"
                >
                  Bildirim Ayarları
                </button>

                <button 
                  onClick={() => router.push('/hesap-sil')}
                  className="w-full text-left px-4 py-3 border rounded hover:bg-gray-50 text-red-600 transition-colors"
                >
                  Hesabı Sil
                </button>

                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 justify-center px-4 py-3 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                >
                  <FaSignOutAlt />
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Modal Başlığı">
        <h2 className="text-xl font-bold">{modalContent}</h2>
        <button onClick={closeModal} className="btn">
          Kapat
        </button>
      </Modal>

      <Modal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} title="Profili Düzenle">
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Ad Soyad
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              E-posta
            </label>
            <input
              type="email"
              value={userDetails.email}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="text-sm text-gray-500 mt-1">E-posta adresi değiştirilemez.</p>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Kaydet
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)} title="Şifre Değiştir">
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Mevcut Şifre
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Yeni Şifre
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Yeni Şifre (Tekrar)
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setIsChangePasswordOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Şifreyi Güncelle
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isNotificationSettingsOpen} onClose={() => setIsNotificationSettingsOpen(false)} title="Bildirim Ayarları">
        <form onSubmit={handleNotificationSettings} className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={userDetails.emailNotifications}
              onChange={(e) => setUserDetails({ ...userDetails, emailNotifications: e.target.checked })}
              className="mr-2"
            />
            <label className="text-sm text-gray-700 dark:text-gray-200">E-posta Bildirimleri</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={userDetails.pushNotifications}
              onChange={(e) => setUserDetails({ ...userDetails, pushNotifications: e.target.checked })}
              className="mr-2"
            />
            <label className="text-sm text-gray-700 dark:text-gray-200">Mobil Uygulama Bildirimleri</label>
          </div>
          {notificationMessage && (
            <div className="mt-4 text-green-600">{notificationMessage}</div>
          )}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setIsNotificationSettingsOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Kaydet
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Account
