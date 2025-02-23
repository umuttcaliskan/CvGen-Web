'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaTrash, FaPlus } from 'react-icons/fa';

interface Reference {
  id: string;
  fullName: string;
  company: string;
  position: string;
  phone: string;
  email: string;
}

interface ReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Reference[]) => void;
  initialData: Reference[] | null;
}

const ReferencesModal: React.FC<ReferencesModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [references, setReferences] = useState<Reference[]>(initialData || [{
    id: Date.now().toString(),
    fullName: '',
    company: '',
    position: '',
    phone: '',
    email: ''
  }]);

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      setReferences(initialData);
    }
  }, [initialData]);

  const handleAddReference = () => {
    setReferences([
      ...references,
      {
        id: Date.now().toString(),
        fullName: '',
        company: '',
        position: '',
        phone: '',
        email: ''
      }
    ]);
  };

  const handleRemoveReference = (id: string) => {
    if (references.length > 1) {
      setReferences(references.filter(ref => ref.id !== id));
    }
  };

  const updateReference = (index: number, field: keyof Reference, value: string) => {
    const updatedReferences = [...references];
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value
    };
    setReferences(updatedReferences);
  };

  const handleSave = () => {
    onSave(references);
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
          <h2 className="text-xl font-semibold">Referanslar</h2>
          <button 
            onClick={handleSave}
            className="text-primary font-semibold hover:text-primary/80"
          >
            Kaydet
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {references.map((reference, index) => (
            <div key={reference.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {index + 1}. Referans
                </h3>
                {references.length > 1 && (
                  <button 
                    onClick={() => handleRemoveReference(reference.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <FaTrash size={20} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    value={reference.fullName}
                    onChange={(e) => updateReference(index, 'fullName', e.target.value)}
                    placeholder="Referans kişinin adı soyadı"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şirket
                  </label>
                  <input
                    type="text"
                    value={reference.company}
                    onChange={(e) => updateReference(index, 'company', e.target.value)}
                    placeholder="Çalıştığı şirket"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pozisyon
                  </label>
                  <input
                    type="text"
                    value={reference.position}
                    onChange={(e) => updateReference(index, 'position', e.target.value)}
                    placeholder="Çalıştığı pozisyon"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={reference.phone}
                    onChange={(e) => updateReference(index, 'phone', e.target.value)}
                    placeholder="İletişim telefonu"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={reference.email}
                    onChange={(e) => updateReference(index, 'email', e.target.value)}
                    placeholder="E-posta adresi"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleAddReference}
            className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary p-4 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <FaPlus />
            Yeni Referans Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferencesModal; 