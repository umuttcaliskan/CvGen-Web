'use client';

import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { generateUUID } from '@/utils/uuid';

interface SocialMedia {
  id: string;
  platform: string;
  username: string;
  url?: string;
}

interface SocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (socialMedia: SocialMedia[]) => void;
  initialData: SocialMedia[] | null;
}

export default function SocialMediaModal({ isOpen, onClose, onSave, initialData }: SocialMediaModalProps) {
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      setSocialMedia(initialData);
    } else {
      setSocialMedia([]);
    }
  }, [initialData]);

  const handleAddSocialMedia = () => {
    setSocialMedia([
      ...socialMedia,
      {
        id: generateUUID(),
        platform: '',
        username: '',
        url: ''
      }
    ]);
  };

  const handleRemoveSocialMedia = (id: string) => {
    setSocialMedia(socialMedia.filter(social => social.id !== id));
  };

  const handleSocialMediaChange = (id: string, field: keyof SocialMedia, value: string) => {
    setSocialMedia(
      socialMedia.map(social =>
        social.id === id ? { ...social, [field]: value } : social
      )
    );
  };

  const handleSubmit = () => {
    onSave(socialMedia);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sosyal Medya Hesaplarım">
      <div className="space-y-6">
        {socialMedia.map((social, index) => (
          <div key={social.id} className="p-4 border rounded-lg bg-gray-50 relative">
            <button
              type="button"
              onClick={() => handleRemoveSocialMedia(social.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform
              </label>
              <input
                type="text"
                value={social.platform}
                onChange={(e) => handleSocialMediaChange(social.id, 'platform', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Örn: LinkedIn, GitHub, Twitter"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                value={social.username}
                onChange={(e) => handleSocialMediaChange(social.id, 'username', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Örn: johndoe"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profil URL
              </label>
              <input
                type="text"
                value={social.url || ''}
                onChange={(e) => handleSocialMediaChange(social.id, 'url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Örn: https://linkedin.com/in/johndoe"
              />
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={handleAddSocialMedia}
          className="flex items-center justify-center w-full py-2 px-4 border border-dashed border-gray-300 rounded-lg text-primary hover:bg-gray-50"
        >
          <FaPlus className="mr-2" /> Sosyal Medya Hesabı Ekle
        </button>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            İptal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Kaydet
          </button>
        </div>
      </div>
    </Modal>
  );
} 