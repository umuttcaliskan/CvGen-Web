'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaTrash, FaPlus } from 'react-icons/fa';

interface Language {
  id: string;
  name: string;
  level: string;
}

interface LanguagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Language[]) => void;
  initialData: Language[] | null;
}

const LanguagesModal: React.FC<LanguagesModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [languages, setLanguages] = useState<Language[]>(initialData || [{
    id: Date.now().toString(),
    name: '',
    level: 'A1'
  }]);

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      setLanguages(initialData);
    }
  }, [initialData]);

  const levels = [
    { label: 'A1 - Başlangıç', value: 'A1' },
    { label: 'A2 - Temel', value: 'A2' },
    { label: 'B1 - Orta', value: 'B1' },
    { label: 'B2 - İyi', value: 'B2' },
    { label: 'C1 - İleri', value: 'C1' },
    { label: 'C2 - Uzman', value: 'C2' },
    { label: 'Anadil', value: 'Anadil' }
  ];

  const handleAddLanguage = () => {
    setLanguages([
      ...languages,
      {
        id: Date.now().toString(),
        name: '',
        level: 'A1'
      }
    ]);
  };

  const handleRemoveLanguage = (id: string) => {
    if (languages.length > 1) {
      setLanguages(languages.filter(lang => lang.id !== id));
    }
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value
    };
    setLanguages(updatedLanguages);
  };

  const handleSave = () => {
    onSave(languages);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
          <h2 className="text-xl font-semibold">Yabancı Diller</h2>
          <button 
            onClick={handleSave}
            className="text-primary font-semibold hover:text-primary/80"
          >
            Kaydet
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {languages.map((language, index) => (
            <div key={language.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {index + 1}. Dil
                </h3>
                {languages.length > 1 && (
                  <button 
                    onClick={() => handleRemoveLanguage(language.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <FaTrash size={20} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dil
                  </label>
                  <input
                    type="text"
                    value={language.name}
                    onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                    placeholder="Dil adını girin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seviye
                  </label>
                  <select
                    value={language.level}
                    onChange={(e) => updateLanguage(index, 'level', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  >
                    {levels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleAddLanguage}
            className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary p-4 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <FaPlus />
            Yeni Dil Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguagesModal; 