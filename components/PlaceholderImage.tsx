
import React from 'react';

interface PlaceholderImageProps {
  description: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ description }) => {
  return (
    <div className="w-full h-64 md:h-96 bg-gray-200 border-2 border-dashed border-gray-400 rounded-2xl flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:bg-gray-250">
      <i className="fas fa-image text-gray-400 text-5xl mb-4"></i>
      <p className="text-xl font-bold text-gray-500 mb-2">画像準備中</p>
      <p className="text-sm text-gray-400 max-w-md italic">
        {description}
      </p>
    </div>
  );
};

export default PlaceholderImage;
