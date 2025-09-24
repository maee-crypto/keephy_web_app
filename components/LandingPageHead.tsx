'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const LandingPageHead: React.FC = () => {
  const t = useTranslations();

  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('NFC Feedback Solutions')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            {t('Collect real-time customer feedback with a simple tap')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              {t('Get Started')}
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              {t('Learn More')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPageHead;
