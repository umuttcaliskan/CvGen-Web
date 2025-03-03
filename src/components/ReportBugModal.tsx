import React, { useState } from 'react';
import { FaTimes, FaBug } from 'react-icons/fa';
import { db } from '@/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

interface ReportBugModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportBugModal: React.FC<ReportBugModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [device, setDevice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      setError('Lütfen başlık ve açıklama alanlarını doldurunuz.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'reports'), {
        title,
        description,
        device,
        status: 'pending',
        userId: user?.uid || 'anonim',
        userEmail: user?.email || 'belirtilmemiş',
        userName: user?.displayName || 'İsimsiz Kullanıcı',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setSubmitSuccess(true);
      setTitle('');
      setDescription('');
      setDevice('');
      
      // 2 saniye sonra modalı kapat
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Hata gönderilirken bir sorun oluştu:', error);
      setError('Hata bildiriminiz gönderilemedi. Lütfen tekrar deneyiniz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="bg-white rounded-xl w-full max-w-md mx-auto shadow-xl animate-fadeIn">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <FaBug className="text-red-500" />
            <h2 className="text-xl font-semibold">Hata Bildir</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          {submitSuccess ? (
            <div className="text-center py-6">
              <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                <p className="font-medium">Hata bildiriminiz başarıyla gönderildi!</p>
                <p className="text-sm mt-1">Teşekkür ederiz, en kısa sürede incelenecek.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
                  {error}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Hata Başlığı *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  placeholder="Örn: Şablon önizleme sorunu"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Hata Açıklaması *
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent h-32"
                  placeholder="Hatayı detaylı bir şekilde açıklayınız..."
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="device" className="block text-sm font-medium text-gray-700 mb-1">
                  Cihaz/Tarayıcı Bilgisi
                </label>
                <input
                  type="text"
                  id="device"
                  value={device}
                  onChange={(e) => setDevice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  placeholder="Örn: iPhone 12, Chrome"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Gönderiliyor...
                    </>
                  ) : (
                    'Gönder'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportBugModal; 