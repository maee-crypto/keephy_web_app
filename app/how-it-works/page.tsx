'use client';

import React, { useState } from 'react';
import { ArrowRight, QrCode, Smartphone, BarChart3, Users, Settings, CheckCircle, Play } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Create Your Account',
      description: 'Sign up for Keephy and set up your business profile in minutes.',
      details: [
        'Choose your business type and industry',
        'Set up your business information',
        'Configure your preferences',
        'Invite your team members'
      ],
      icon: <Users className="w-8 h-8 text-blue-600" />,
      image: '/images/how-it-works/signup.jpg'
    },
    {
      number: '02',
      title: 'Design Your Forms',
      description: 'Create custom feedback forms tailored to your business needs.',
      details: [
        'Choose from our template library',
        'Customize questions and branding',
        'Set up conditional logic',
        'Preview and test your forms'
      ],
      icon: <Settings className="w-8 h-8 text-green-600" />,
      image: '/images/how-it-works/forms.jpg'
    },
    {
      number: '03',
      title: 'Deploy QR Codes & NFC',
      description: 'Generate QR codes and NFC tags to collect feedback anywhere.',
      details: [
        'Generate QR codes for each form',
        'Print and place NFC tags',
        'Customize with your branding',
        'Track placement locations'
      ],
      icon: <QrCode className="w-8 h-8 text-purple-600" />,
      image: '/images/how-it-works/qr-codes.jpg'
    },
    {
      number: '04',
      title: 'Collect Feedback',
      description: 'Customers scan and submit feedback instantly from their devices.',
      details: [
        'Customers scan QR codes or tap NFC',
        'Fill out forms on their phones',
        'Submit feedback in seconds',
        'Receive instant confirmations'
      ],
      icon: <Smartphone className="w-8 h-8 text-orange-600" />,
      image: '/images/how-it-works/feedback.jpg'
    },
    {
      number: '05',
      title: 'Analyze & Act',
      description: 'Get real-time insights and analytics to improve your business.',
      details: [
        'View real-time dashboard',
        'Analyze customer sentiment',
        'Identify trends and patterns',
        'Take action on insights'
      ],
      icon: <BarChart3 className="w-8 h-8 text-red-600" />,
      image: '/images/how-it-works/analytics.jpg'
    }
  ];

  const features = [
    {
      title: 'Easy Setup',
      description: 'Get started in minutes with our intuitive setup wizard.',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />
    },
    {
      title: 'Real-Time Data',
      description: 'See feedback as it comes in with live updates and notifications.',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />
    },
    {
      title: 'Mobile Optimized',
      description: 'Forms work perfectly on any device, anywhere, anytime.',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />
    },
    {
      title: 'Advanced Analytics',
      description: 'AI-powered insights help you understand customer sentiment.',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />
    },
    {
      title: 'Team Collaboration',
      description: 'Share insights and collaborate with your team members.',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />
    },
    {
      title: 'Integrations',
      description: 'Connect with your existing tools and workflows.',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />
    }
  ];

  const useCases = [
    {
      industry: 'Restaurants',
      title: 'Improve Food Service',
      description: 'Collect feedback on food quality, service speed, and overall experience.',
      benefits: ['Increase customer satisfaction', 'Reduce wait times', 'Improve food quality']
    },
    {
      industry: 'Hotels',
      title: 'Enhance Guest Experience',
      description: 'Gather feedback on room cleanliness, staff service, and amenities.',
      benefits: ['Boost guest satisfaction', 'Improve service quality', 'Increase repeat bookings']
    },
    {
      industry: 'Retail',
      title: 'Optimize Shopping Experience',
      description: 'Understand customer preferences and shopping behavior.',
      benefits: ['Increase sales', 'Improve store layout', 'Enhance customer service']
    },
    {
      industry: 'Healthcare',
      title: 'Improve Patient Care',
      description: 'Collect patient feedback on care quality and facility experience.',
      benefits: ['Enhance patient satisfaction', 'Improve care quality', 'Reduce complaints']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              How Keephy Works
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              Transform your customer feedback collection in 5 simple steps. 
              From setup to insights, we make it easy to understand your customers.
            </p>
            <div className="mt-8">
              <Link
                href="/sign-up"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">5 Simple Steps to Success</h2>
            <p className="mt-4 text-lg text-gray-600">
              Follow our proven process to start collecting valuable customer feedback
            </p>
          </div>

          {/* Step Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    activeStep === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Content */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-600">Step {steps[activeStep].number}</div>
                    <h3 className="text-2xl font-bold text-gray-900">{steps[activeStep].title}</h3>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 mb-6">{steps[activeStep].description}</p>
                
                <ul className="space-y-3">
                  {steps[activeStep].details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-100 flex items-center justify-center p-8">
                <div className="w-64 h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                  <Play className="w-16 h-16 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Step Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Keephy Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Powerful features that make feedback collection simple and effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Perfect for Every Industry</h2>
            <p className="mt-4 text-lg text-gray-600">
              See how different businesses use Keephy to improve their customer experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-600">{useCase.industry}</div>
                    <h3 className="text-lg font-semibold text-gray-900">{useCase.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
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
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-blue-200">
              No credit card required • 14-day free trial • Setup in minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}