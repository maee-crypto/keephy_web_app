'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

const FreeTrial: React.FC = () => {
  const t = useTranslations();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle free trial signup
    console.log('Free trial signup:', email);
  };

  return (
    <section className="py-20 px-6 bg-primary-600 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="font-heading font-semibold md:font-bold text-3xl md:text-5xl mb-4">
          {t('Start Your Free Trial Today')}
        </h2>
        <p className="text-xl text-primary-100 mb-8">
          {t('Join thousands of businesses already using Keephy to collect better feedback')}
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('Enter your email address')}
              required
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('Get Started')}
            </button>
          </div>
        </form>
        
        <p className="text-sm text-primary-200 mt-4">
          {t('No credit card required • 14-day free trial • Cancel anytime')}
        </p>
      </div>
    </section>
  );
};

export default FreeTrial;
