'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaTrash, FaPlus } from 'react-icons/fa';

interface Experience {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Experience[]) => void;
  initialData: Experience[] | null;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [experiences, setExperiences] = useState<Experience[]>(initialData || [{
    id: Date.now().toString(),
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  }]);

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      setExperiences(initialData);
    }
  }, [initialData]);

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        companyName: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const handleRemoveExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    };
    setExperiences(updatedExperiences);
  };

  const handleSave = () => {
    onSave(experiences);
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
          <h2 className="text-xl font-semibold">İş Deneyimleri</h2>
          <button 
            onClick={handleSave}
            className="text-primary font-semibold hover:text-primary/80"
          >
            Kaydet
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {index + 1}. İş Deneyimi
                </h3>
                {experiences.length > 1 && (
                  <button 
                    onClick={() => handleRemoveExperience(experience.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <FaTrash size={20} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şirket Adı
                  </label>
                  <input
                    type="text"
                    value={experience.companyName}
                    onChange={(e) => updateExperience(index, 'companyName', e.target.value)}
                    placeholder="Şirket adını girin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pozisyon
                  </label>
                  <input
                    type="text"
                    value={experience.position}
                    onChange={(e) => updateExperience(index, 'position', e.target.value)}
                    placeholder="Pozisyonunuzu girin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Başlangıç Tarihi
                    </label>
                    <input
                      type="date"
                      value={experience.startDate}
                      onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bitiş Tarihi
                    </label>
                    <input
                      type="date"
                      value={experience.endDate}
                      onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Görev Tanımı
                  </label>
                  <textarea
                    value={experience.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    placeholder="Görev tanımınızı girin"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleAddExperience}
            className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary p-4 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <FaPlus />
            Yeni İş Deneyimi Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceModal; 