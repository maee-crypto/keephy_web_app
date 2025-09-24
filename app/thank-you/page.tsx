'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Mail, Calendar, Users, BarChart3, Settings } from 'lucide-react';
import Link from 'next/link';

export default function ThankYouPage() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to dashboard or admin
          window.location.href = '/admin';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextSteps = [
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: 'Check Your Email',
      description: 'We\'ve sent you a welcome email with setup instructions and next steps.',
      action: 'Check Inbox'
    },
    {
      icon: <Settings className="w-6 h-6 text-green-600" />,
      title: 'Complete Setup',
      description: 'Finish setting up your business profile and configure your preferences.',
      action: 'Go to Settings'
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: 'Invite Your Team',
      description: 'Add team members and assign roles to get everyone started.',
      action: 'Invite Team'
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-orange-600" />,
      title: 'Create Your First Form',
      description: 'Design and deploy your first feedback form to start collecting insights.',
      action: 'Create Form'
    }
  ];

  const features = [
    '14-day free trial with full access',
    'No credit card required',
    '24/7 customer support',
    'Unlimited forms and submissions',
    'Advanced analytics and reporting',
    'Mobile-optimized experience'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Keephy! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your account has been created successfully. You're now ready to start collecting 
            valuable customer feedback and improving your business.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-blue-800">
              Redirecting to your dashboard in <span className="font-bold">{countdown}</span> seconds...
            </p>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What's Included in Your Free Trial
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Your Next Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 mr-4">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    {step.action} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admin"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/how-it-works"
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
            >
              Learn How It Works
            </Link>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need Help Getting Started?
          </h3>
          <p className="text-gray-600 mb-4">
            Our support team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/pricing"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View Pricing
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/about-us"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}