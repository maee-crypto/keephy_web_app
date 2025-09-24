'use client';

import React from 'react';
import { FileText, Scale, Shield, AlertTriangle, Users, CreditCard } from 'lucide-react';

export default function TermsConditionsPage() {
  const lastUpdated = 'March 15, 2024';

  const sections = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: 'Acceptance of Terms',
      content: [
        {
          subtitle: 'Agreement to Terms',
          text: 'By accessing and using Keephy\'s services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
        },
        {
          subtitle: 'Modifications',
          text: 'We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform. Continued use of our services after such modifications constitutes acceptance of the updated terms.'
        }
      ]
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: 'User Accounts',
      content: [
        {
          subtitle: 'Account Creation',
          text: 'You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.'
        },
        {
          subtitle: 'Account Security',
          text: 'You must notify us immediately of any unauthorized use of your account or any other breach of security. We are not liable for any loss or damage arising from your failure to comply with this security obligation.'
        },
        {
          subtitle: 'Account Termination',
          text: 'We reserve the right to terminate or suspend your account at any time, with or without notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.'
        }
      ]
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      title: 'Acceptable Use',
      content: [
        {
          subtitle: 'Permitted Uses',
          text: 'You may use our services only for lawful purposes and in accordance with these terms. You agree not to use our services in any way that could damage, disable, overburden, or impair our servers or networks.'
        },
        {
          subtitle: 'Prohibited Activities',
          text: 'You agree not to: (a) violate any applicable laws or regulations; (b) infringe on the rights of others; (c) transmit any harmful or malicious code; (d) attempt to gain unauthorized access to our systems; (e) use our services for any illegal or unauthorized purpose.'
        },
        {
          subtitle: 'Content Guidelines',
          text: 'You are responsible for all content you submit through our platform. Content must not be illegal, harmful, threatening, abusive, defamatory, or otherwise objectionable. We reserve the right to remove content that violates these guidelines.'
        }
      ]
    },
    {
      icon: <CreditCard className="w-6 h-6 text-orange-600" />,
      title: 'Payment Terms',
      content: [
        {
          subtitle: 'Billing',
          text: 'Fees for our services are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. You authorize us to charge your payment method for all applicable fees.'
        },
        {
          subtitle: 'Price Changes',
          text: 'We may change our pricing at any time. We will provide at least 30 days notice before any price changes take effect. Continued use of our services after price changes constitutes acceptance of the new pricing.'
        },
        {
          subtitle: 'Refunds',
          text: 'Refunds are provided only in accordance with our refund policy. We may offer refunds at our sole discretion for technical issues or service failures that are our responsibility.'
        }
      ]
    },
    {
      icon: <Scale className="w-6 h-6 text-red-600" />,
      title: 'Intellectual Property',
      content: [
        {
          subtitle: 'Our Rights',
          text: 'The Keephy platform, including its design, functionality, and content, is owned by us and protected by intellectual property laws. You may not copy, modify, or distribute our platform without our written permission.'
        },
        {
          subtitle: 'Your Content',
          text: 'You retain ownership of the content you submit through our platform. By using our services, you grant us a license to use, store, and process your content as necessary to provide our services.'
        },
        {
          subtitle: 'Feedback',
          text: 'Any feedback, comments, or suggestions you provide regarding our services may be used by us without any obligation to compensate you.'
        }
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
      title: 'Limitation of Liability',
      content: [
        {
          subtitle: 'Disclaimer',
          text: 'Our services are provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.'
        },
        {
          subtitle: 'Limitation of Damages',
          text: 'In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of our services.'
        },
        {
          subtitle: 'Maximum Liability',
          text: 'Our total liability to you for any claims arising out of or relating to these terms or our services shall not exceed the amount you paid us for the services in the 12 months preceding the claim.'
        }
      ]
    }
  ];

  const keyPoints = [
    'Service availability is not guaranteed',
    'Data backup is your responsibility',
    'Third-party integrations are not our responsibility',
    'We may suspend services for maintenance',
    'Export your data before account closure',
    'Compliance with local laws is your responsibility'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Terms & Conditions
            </h1>
            <p className="mt-4 text-xl text-blue-100">
              Please read these terms carefully before using our services.
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
            These Terms and Conditions ("Terms") govern your use of Keephy's customer feedback platform 
            and related services (collectively, the "Services") operated by Keephy Inc. ("us", "we", or "our").
          </p>
          <p className="text-lg text-gray-600">
            By accessing or using our Services, you agree to be bound by these Terms. If you disagree 
            with any part of these terms, then you may not access the Services.
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

        {/* Service Level Agreement */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Level Agreement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Uptime Guarantee</h3>
              <p className="text-gray-600">
                We strive to maintain 99.9% uptime for our Services. If we fail to meet this standard, 
                you may be eligible for service credits as outlined in our SLA.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Response</h3>
              <p className="text-gray-600">
                We provide support during business hours (9 AM - 6 PM PST, Monday through Friday). 
                Response times vary by plan level and issue severity.
              </p>
            </div>
          </div>
        </div>

        {/* Important Notices */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Notices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Governing Law */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
          <p className="text-lg text-gray-600 mb-4">
            These Terms shall be interpreted and governed by the laws of the State of California, 
            without regard to its conflict of law provisions. Any disputes arising from these Terms 
            or your use of our Services shall be resolved in the courts of San Francisco County, California.
          </p>
          <p className="text-lg text-gray-600">
            If any provision of these Terms is held to be invalid or unenforceable, the remaining 
            provisions shall remain in full force and effect.
          </p>
        </div>

        {/* Severability */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability</h2>
          <p className="text-lg text-gray-600">
            If any provision of these Terms is found to be unenforceable or invalid, that provision 
            will be limited or eliminated to the minimum extent necessary so that these Terms will 
            otherwise remain in full force and effect and enforceable.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-gray-900 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
          <p className="text-gray-300 mb-6">
            If you have any questions about these Terms and Conditions, please contact us:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-300">
                <a href="mailto:legal@keephy.com" className="hover:text-white">
                  legal@keephy.com
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