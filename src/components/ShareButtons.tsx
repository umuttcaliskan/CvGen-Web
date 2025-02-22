'use client';

import React from 'react';

interface ShareButtonsProps {
  title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title }) => {
  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${title}&url=${window.location.href}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${title}`, '_blank');
  };

  return (
    <div className="mt-12 pt-6 border-t">
      <h3 className="text-lg font-semibold mb-4">Bu yazıyı paylaş:</h3>
      <div className="flex gap-4">
        <button 
          onClick={shareOnTwitter}
          className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition-colors"
        >
          Twitter'da Paylaş
        </button>
        <button 
          onClick={shareOnLinkedIn}
          className="px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#0A66C2]/90 transition-colors"
        >
          LinkedIn'de Paylaş
        </button>
      </div>
    </div>
  );
};

export default ShareButtons; 