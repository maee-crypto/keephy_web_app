'use client';

import React from 'react';

const KeyFeatureImage: React.FC = () => {
  return (
    <div className="w-full h-[500px] bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-32 h-32 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-primary-700 mb-2">Key Features</h3>
        <p className="text-primary-600">Interactive feedback collection</p>
      </div>
    </div>
  );
};

export default KeyFeatureImage;
