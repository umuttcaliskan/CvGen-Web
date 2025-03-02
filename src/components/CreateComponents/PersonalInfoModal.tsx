'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { PersonalInfo } from '@/types/cv';

interface PersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PersonalInfo) => void;
  initialData: PersonalInfo | null;
}

const PersonalInfoModal: React.FC<PersonalInfoModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<PersonalInfo>({
    id: initialData?.id || crypto.randomUUID(),
    fullName: initialData?.fullName || '',
    email: initialData?.email || user?.email || '',
    phone: initialData?.phone || '',
    birthDate: initialData?.birthDate || '',
    address: initialData?.address || ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        fullName: initialData.fullName || '',
        email: initialData.email || user?.email || '',
        phone: initialData.phone || '',
        birthDate: initialData.birthDate || '',
        address: initialData.address || ''
      });
    }
  }, [initialData, user?.email]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-3xl mx-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
          <h2 className="text-xl font-semibold">Kişisel Bilgiler</h2>
          <button 
            onClick={handleSave}
            className="text-primary font-semibold hover:text-primary/80"
          >
            Kaydet
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Soyad
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Ad Soyad"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                E-posta adresi değiştirilemez
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doğum Tarihi
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Telefon"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adres
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Adres"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoModal; 