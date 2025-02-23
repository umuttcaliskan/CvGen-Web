'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaTrash, FaPlus } from 'react-icons/fa';

interface Education {
  id: string;
  schoolName: string;
  department: string;
  startDate: string;
  endDate: string;
}

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Education[]) => void;
  initialData: Education[] | null;
}

const EducationModal: React.FC<EducationModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [educations, setEducations] = useState<Education[]>(initialData || [{
    id: Date.now().toString(),
    schoolName: '',
    department: '',
    startDate: '',
    endDate: ''
  }]);

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      setEducations(initialData);
    }
  }, [initialData]);

  const handleAddEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now().toString(),
        schoolName: '',
        department: '',
        startDate: '',
        endDate: ''
      }
    ]);
  };

  const handleRemoveEducation = (id: string) => {
    if (educations.length > 1) {
      setEducations(educations.filter(edu => edu.id !== id));
    }
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updatedEducations = [...educations];
    updatedEducations[index] = {
      ...updatedEducations[index],
      [field]: value
    };
    setEducations(updatedEducations);
  };

  const handleSave = () => {
    onSave(educations);
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
          <h2 className="text-xl font-semibold">Eğitim Bilgileri</h2>
          <button 
            onClick={handleSave}
            className="text-primary font-semibold hover:text-primary/80"
          >
            Kaydet
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {educations.map((education, index) => (
            <div key={education.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {index + 1}. Eğitim Bilgisi
                </h3>
                {educations.length > 1 && (
                  <button 
                    onClick={() => handleRemoveEducation(education.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <FaTrash size={20} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Okul Adı
                  </label>
                  <input
                    type="text"
                    value={education.schoolName}
                    onChange={(e) => updateEducation(index, 'schoolName', e.target.value)}
                    placeholder="Okul adını girin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bölüm
                  </label>
                  <input
                    type="text"
                    value={education.department}
                    onChange={(e) => updateEducation(index, 'department', e.target.value)}
                    placeholder="Bölüm adını girin"
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
                      value={education.startDate}
                      onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bitiş Tarihi
                    </label>
                    <input
                      type="date"
                      value={education.endDate}
                      onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleAddEducation}
            className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary p-4 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <FaPlus />
            Yeni Eğitim Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationModal; 