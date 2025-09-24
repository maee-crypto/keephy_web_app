'use client';

import React from 'react';
import { Shield, Eye, Lock, Users, Database, Globe } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'March 15, 2024';

  const sections = [
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, phone number, business information, and payment details.'
        },
        {
          subtitle: 'Usage Information',
          text: 'We automatically collect certain information about your use of our services, including your IP address, browser type, device information, pages visited, and time spent on our platform.'
        },
        {
          subtitle: 'Customer Feedback Data',
          text: 'We collect and process customer feedback data that you submit through our platform, including ratings, comments, and other feedback content.'
        }
      ]
    },
    {
      icon: <Eye className="w-6 h-6 text-green-600" />,
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use your information to provide, maintain, and improve our services, including processing feedback data and generating analytics reports.'
        },
        {
          subtitle: 'Communication',
          text: 'We use your contact information to send you important updates about our services, respond to your inquiries, and provide customer support.'
        },
        {
          subtitle: 'Analytics and Insights',
          text: 'We analyze usage patterns and feedback data to help you understand customer satisfaction trends and improve your business operations.'
        }
      ]
    },
    {
      icon: <Lock className="w-6 h-6 text-purple-600" />,
      title: 'Data Security',
      content: [
        {
          subtitle: 'Encryption',
          text: 'We use industry-standard encryption to protect your data both in transit and at rest. All data is encrypted using AES-256 encryption.'
        },
        {
          subtitle: 'Access Controls',
          text: 'We implement strict access controls and authentication measures to ensure only authorized personnel can access your data.'
        },
        {
          subtitle: 'Regular Audits',
          text: 'We conduct regular security audits and assessments to identify and address potential vulnerabilities in our systems.'
        }
      ]
    },
    {
      icon: <Users className="w-6 h-6 text-orange-600" />,
      title: 'Data Sharing',
      content: [
        {
          subtitle: 'Third-Party Services',
          text: 'We may share your information with trusted third-party service providers who assist us in operating our platform, such as cloud hosting providers and analytics services.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information if required by law or if we believe such action is necessary to comply with legal processes or protect our rights.'
        },
        {
          subtitle: 'Business Transfers',
          text: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.'
        }
      ]
    },
    {
      icon: <Database className="w-6 h-6 text-red-600" />,
      title: 'Data Retention',
      content: [
        {
          subtitle: 'Retention Period',
          text: 'We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy.'
        },
        {
          subtitle: 'Account Deletion',
          text: 'You may request deletion of your account and associated data at any time. We will process such requests within 30 days.'
        },
        {
          subtitle: 'Backup Data',
          text: 'Some data may be retained in backup systems for a limited period to ensure data integrity and recovery capabilities.'
        }
      ]
    },
    {
      icon: <Globe className="w-6 h-6 text-indigo-600" />,
      title: 'International Transfers',
      content: [
        {
          subtitle: 'Global Operations',
          text: 'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.'
        },
        {
          subtitle: 'GDPR Compliance',
          text: 'For users in the European Union, we comply with the General Data Protection Regulation (GDPR) and provide additional rights and protections.'
        },
        {
          subtitle: 'Data Processing Agreements',
          text: 'We have data processing agreements in place with all third-party service providers to ensure your data is handled in accordance with applicable privacy laws.'
        }
      ]
    }
  ];

  const rights = [
    'Access your personal information',
    'Correct inaccurate data',
    'Request data deletion',
    'Object to data processing',
    'Data portability',
    'Withdraw consent'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-xl text-blue-100">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="mt-2 text-sm text-blue-200">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-lg text-gray-600 mb-4">
            At Keephy, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
            customer feedback platform and related services.
          </p>
          <p className="text-lg text-gray-600">
            By using our services, you agree to the collection and use of information in accordance with this policy. 
            If you do not agree with our policies and practices, please do not use our services.
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                {section.icon}
                <h2 className="text-2xl font-bold text-gray-900 ml-3">{section.title}</h2>
              </div>
              <div className="space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.subtitle}</h3>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Your Rights */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights</h2>
          <p className="text-lg text-gray-600 mb-6">
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rights.map((right, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700">{right}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-600">
            To exercise any of these rights, please contact us at{' '}
            <a href="mailto:privacy@keephy.com" className="text-blue-600 hover:text-blue-700 font-medium">
              privacy@keephy.com
            </a>
          </p>
        </div>

        {/* Cookies */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
          <p className="text-lg text-gray-600 mb-4">
            We use cookies and similar tracking technologies to enhance your experience on our platform. 
            Cookies are small data files stored on your device that help us remember your preferences and 
            improve our services.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Types of Cookies We Use:</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
          </div>
        </div>

        {/* Changes to Policy */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
          <p className="text-lg text-gray-600">
            We may update this Privacy Policy from time to time to reflect changes in our practices or 
            applicable laws. We will notify you of any material changes by posting the new Privacy Policy 
            on this page and updating the "Last updated" date. We encourage you to review this Privacy 
            Policy periodically for any changes.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-gray-900 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-300 mb-6">
            If you have any questions about this Privacy Policy or our privacy practices, please contact us:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-300">
                <a href="mailto:privacy@keephy.com" className="hover:text-white">
                  privacy@keephy.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-gray-300">
                Keephy Inc.<br />
                123 Business Street<br />
                San Francisco, CA 94105<br />
                United States
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}