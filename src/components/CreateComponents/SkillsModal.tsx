'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaTrash, FaPlus } from 'react-icons/fa';

interface Skill {
  id: string;
  name: string;
  level: string;
}

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Skill[]) => void;
  initialData: Skill[] | null;
}

const SkillsModal: React.FC<SkillsModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [skills, setSkills] = useState<Skill[]>(initialData || [{
    id: Date.now().toString(),
    name: '',
    level: 'Başlangıç'
  }]);

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      setSkills(initialData);
    }
  }, [initialData]);

  const levels = [
    { label: 'Başlangıç', value: 'Başlangıç' },
    { label: 'Orta', value: 'Orta' },
    { label: 'İleri', value: 'İleri' },
    { label: 'Uzman', value: 'Uzman' }
  ];

  const handleAddSkill = () => {
    setSkills([
      ...skills,
      {
        id: Date.now().toString(),
        name: '',
        level: 'Başlangıç'
      }
    ]);
  };

  const handleRemoveSkill = (id: string) => {
    if (skills.length > 1) {
      setSkills(skills.filter(skill => skill.id !== id));
    }
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };
    setSkills(updatedSkills);
  };

  const handleSave = () => {
    onSave(skills);
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
          <h2 className="text-xl font-semibold">Beceriler</h2>
          <button 
            onClick={handleSave}
            className="text-primary font-semibold hover:text-primary/80"
          >
            Kaydet
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {skills.map((skill, index) => (
            <div key={skill.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {index + 1}. Beceri
                </h3>
                {skills.length > 1 && (
                  <button 
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <FaTrash size={20} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beceri Adı
                  </label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, 'name', e.target.value)}
                    placeholder="Beceri adını girin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seviye
                  </label>
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(index, 'level', e.target.value)}
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
            onClick={handleAddSkill}
            className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary p-4 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <FaPlus />
            Yeni Beceri Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsModal; 