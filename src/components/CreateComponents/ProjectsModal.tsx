'use client';

import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { generateUUID } from '@/utils/uuid';

interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies?: string;
  projectUrl?: string;
}

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (projects: Project[]) => void;
  initialData: Project[] | null;
}

export default function ProjectsModal({ isOpen, onClose, onSave, initialData }: ProjectsModalProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      setProjects(initialData);
    } else {
      setProjects([]);
    }
  }, [initialData]);

  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        id: generateUUID(),
        name: '',
        startDate: '',
        endDate: '',
        description: '',
        technologies: '',
        projectUrl: ''
      }
    ]);
  };

  const handleRemoveProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleProjectChange = (id: string, field: keyof Project, value: string) => {
    setProjects(
      projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const handleSubmit = () => {
    onSave(projects);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Projelerim">
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={project.id} className="p-4 border rounded-lg bg-gray-50 relative">
            <button
              type="button"
              onClick={() => handleRemoveProject(project.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proje Adı
              </label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => handleProjectChange(project.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Örn: E-ticaret Web Sitesi"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Başlangıç Tarihi
                </label>
                <input
                  type="text"
                  value={project.startDate}
                  onChange={(e) => handleProjectChange(project.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Örn: Ocak 2022"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bitiş Tarihi
                </label>
                <input
                  type="text"
                  value={project.endDate}
                  onChange={(e) => handleProjectChange(project.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Örn: Haziran 2022 (veya Devam Ediyor)"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proje Açıklaması
              </label>
              <textarea
                value={project.description}
                onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Projenizi kısaca açıklayın"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kullanılan Teknolojiler
              </label>
              <input
                type="text"
                value={project.technologies || ''}
                onChange={(e) => handleProjectChange(project.id, 'technologies', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Örn: React, Node.js, MongoDB"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proje URL
              </label>
              <input
                type="text"
                value={project.projectUrl || ''}
                onChange={(e) => handleProjectChange(project.id, 'projectUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Örn: https://github.com/username/project"
              />
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={handleAddProject}
          className="flex items-center justify-center w-full py-2 px-4 border border-dashed border-gray-300 rounded-lg text-primary hover:bg-gray-50"
        >
          <FaPlus className="mr-2" /> Proje Ekle
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