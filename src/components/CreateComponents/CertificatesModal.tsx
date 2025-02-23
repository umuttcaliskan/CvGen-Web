'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaTrash, FaPlus } from 'react-icons/fa';

interface Certificate {
  id: string;
  name: string;
  institution: string;
  date: string;
}

interface CertificatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Certificate[]) => void;
  initialData: Certificate[] | null;
}

const CertificatesModal: React.FC<CertificatesModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [certificates, setCertificates] = useState<Certificate[]>(initialData || [{
    id: Date.now().toString(),
    name: '',
    institution: '',
    date: ''
  }]);

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      setCertificates(initialData);
    }
  }, [initialData]);

  const handleAddCertificate = () => {
    setCertificates([
      ...certificates,
      {
        id: Date.now().toString(),
        name: '',
        institution: '',
        date: ''
      }
    ]);
  };

  const handleRemoveCertificate = (id: string) => {
    if (certificates.length > 1) {
      setCertificates(certificates.filter(cert => cert.id !== id));
    }
  };

  const updateCertificate = (index: number, field: keyof Certificate, value: string) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index] = {
      ...updatedCertificates[index],
      [field]: value
    };
    setCertificates(updatedCertificates);
  };

  const handleSave = () => {
    onSave(certificates);
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
          <h2 className="text-xl font-semibold">Sertifikalar</h2>
          <button 
            onClick={handleSave}
            className="text-primary font-semibold hover:text-primary/80"
          >
            Kaydet
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {certificates.map((certificate, index) => (
            <div key={certificate.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {index + 1}. Sertifika
                </h3>
                {certificates.length > 1 && (
                  <button 
                    onClick={() => handleRemoveCertificate(certificate.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <FaTrash size={20} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sertifika Adı
                  </label>
                  <input
                    type="text"
                    value={certificate.name}
                    onChange={(e) => updateCertificate(index, 'name', e.target.value)}
                    placeholder="Sertifika adını girin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kurum
                  </label>
                  <input
                    type="text"
                    value={certificate.institution}
                    onChange={(e) => updateCertificate(index, 'institution', e.target.value)}
                    placeholder="Kurumu girin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alınma Tarihi
                  </label>
                  <input
                    type="date"
                    value={certificate.date}
                    onChange={(e) => updateCertificate(index, 'date', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleAddCertificate}
            className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary p-4 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <FaPlus />
            Yeni Sertifika Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificatesModal; 