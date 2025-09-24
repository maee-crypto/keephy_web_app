'use client';

import React, { useState } from 'react';
import { Check, Star, ArrowRight, Zap, Shield, Users, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small businesses getting started',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        'Up to 3 businesses',
        '500 submissions/month',
        'Basic analytics',
        'Email support',
        'Standard forms',
        'QR code generation',
        'Basic reporting'
      ],
      limitations: [
        'Limited integrations',
        'Basic customization'
      ],
      popular: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses with multiple locations',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        'Up to 10 businesses',
        '2,000 submissions/month',
        'Advanced analytics',
        'Priority support',
        'Custom forms',
        'API access',
        'Integrations',
        'Advanced reporting',
        'Staff management',
        'Multi-language support'
      ],
      limitations: [],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with complex needs',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      features: [
        'Unlimited businesses',
        'Unlimited submissions',
        'Premium analytics',
        '24/7 support',
        'Custom branding',
        'Advanced API',
        'White-label options',
        'SSO integration',
        'Custom integrations',
        'Dedicated account manager',
        'Advanced security',
        'Compliance tools'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    const monthlyTotal = plan.monthlyPrice * 12;
    const yearlyTotal = plan.yearlyPrice;
    return Math.round(((monthlyTotal - yearlyTotal) / monthlyTotal) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your business. All plans include our core features with no hidden fees.
            </p>
          </div>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Save up to 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="mt-2 text-gray-600">{plan.description}</p>
                  
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">
                        ${getPrice(plan)}
                      </span>
                      <span className="text-xl text-gray-600">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p className="mt-2 text-sm text-green-600">
                        Save {getSavings(plan)}% vs monthly
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href={plan.name === 'Enterprise' ? '/contact' : '/sign-up'}
                    className={`w-full flex justify-center items-center px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>

                <div className="mt-8">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Comparison */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Compare all features</h2>
            <p className="mt-4 text-lg text-gray-600">
              See how our plans stack up against each other
            </p>
          </div>

          <div className="mt-12 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Starter
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Professional
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { feature: 'Businesses', starter: '3', professional: '10', enterprise: 'Unlimited' },
                  { feature: 'Monthly Submissions', starter: '500', professional: '2,000', enterprise: 'Unlimited' },
                  { feature: 'Staff Members', starter: '10', professional: '50', enterprise: 'Unlimited' },
                  { feature: 'Forms', starter: '5', professional: '20', enterprise: 'Unlimited' },
                  { feature: 'Analytics', starter: 'Basic', professional: 'Advanced', enterprise: 'Premium' },
                  { feature: 'Support', starter: 'Email', professional: 'Priority', enterprise: '24/7' },
                  { feature: 'API Access', starter: 'No', professional: 'Yes', enterprise: 'Advanced' },
                  { feature: 'Integrations', starter: 'Basic', professional: 'Standard', enterprise: 'Custom' },
                  { feature: 'White-label', starter: 'No', professional: 'No', enterprise: 'Yes' },
                  { feature: 'SSO', starter: 'No', professional: 'No', enterprise: 'Yes' }
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {row.starter}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {row.professional}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Frequently asked questions</h2>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'Can I change plans anytime?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes, all plans come with a 14-day free trial. No credit card required to get started.'
              },
              {
                question: 'What happens if I exceed my limits?',
                answer: 'We\'ll notify you when you\'re approaching your limits. You can upgrade your plan or purchase additional capacity as needed.'
              },
              {
                question: 'Do you offer custom pricing?',
                answer: 'Yes, for Enterprise customers with specific needs, we offer custom pricing and features. Contact our sales team for more information.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to get started?
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Join thousands of businesses already using Keephy to improve customer satisfaction.
            </p>
            <div className="mt-8">
              <Link
                href="/sign-up"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Start your free trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}