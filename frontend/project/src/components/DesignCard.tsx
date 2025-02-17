import React from 'react';
import { Heart } from 'lucide-react';
import { ClothingDesign } from '../types';

interface DesignCardProps {
  design: ClothingDesign;
}

export function DesignCard({ design }: DesignCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-64 overflow-hidden">
        <img
          src={design.image}
          alt={design.name}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{design.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{design.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${design.price.toFixed(2)}
          </span>
          <span className="text-sm font-medium text-gray-500 capitalize">
            {design.category}
          </span>
        </div>
      </div>
    </div>
  );
}