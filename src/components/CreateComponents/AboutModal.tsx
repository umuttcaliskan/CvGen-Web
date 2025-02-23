'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: string) => void;
  initialData: string | null;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [about, setAbout] = useState(initialData || '');

  useEffect(() => {
    if (initialData) {
      setAbout(initialData);
    }
  }, [initialData]);

  const handleSave = () => {
    onSave(about);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
          <h2 className="text-xl font-semibold">Hakkımda</h2>
          <button 
            onClick={handleSave}
            className="text-primary font-semibold hover:text-primary/80"
          >
            Kaydet
          </button>
        </div>

        <div className="p-4">
          <textarea
            className="w-full h-64 border border-gray-300 rounded-lg p-4 text-base resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Kendinizi tanıtın..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutModal; 