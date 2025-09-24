'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Gift, Copy, Check, Star, Calendar, Percent, Users, Clock } from 'lucide-react';

export default function DiscountPage() {
  const params = useParams();
  const accessKey = params.accessKey;
  
  const [discount, setDiscount] = useState({
    id: '1',
    title: 'Thank You for Your Feedback!',
    description: 'We appreciate you taking the time to share your experience with us.',
    code: 'FEEDBACK20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 50,
    maxDiscountAmount: 100,
    validFrom: '2024-03-15',
    validUntil: '2024-04-15',
    usageLimit: 1000,
    usedCount: 234,
    isActive: true,
    businessName: 'Grand Hotel Downtown',
    businessLogo: '/images/business-logo.png',
    terms: [
      'Valid for new customers only',
      'Cannot be combined with other offers',
      'Minimum order amount applies',
      'Valid until expiration date'
    ]
  });

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch discount details
    const fetchDiscount = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock data - in real app, fetch based on accessKey
        setLoading(false);
      } catch (error) {
        console.error('Error fetching discount:', error);
        setLoading(false);
      }
    };

    fetchDiscount();
  }, [accessKey]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(discount.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getDiscountText = () => {
    if (discount.discountType === 'percentage') {
      return `${discount.discountValue}% off`;
    } else {
      return `$${discount.discountValue} off`;
    }
  };

  const getRemainingDays = () => {
    const today = new Date();
    const validUntil = new Date(discount.validUntil);
    const diffTime = validUntil.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getUsagePercentage = () => {
    return Math.round((discount.usedCount / discount.usageLimit) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Gift className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{discount.title}</h1>
          <p className="text-lg text-gray-600">{discount.description}</p>
        </div>

        {/* Discount Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Business Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-lg">G</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{discount.businessName}</h2>
                  <p className="text-blue-100">Thank you for your feedback!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{getDiscountText()}</div>
                <div className="text-blue-100 text-sm">Your reward</div>
              </div>
            </div>
          </div>

          {/* Discount Code */}
          <div className="px-8 py-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Discount Code</h3>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="text-3xl font-mono font-bold text-gray-900 tracking-wider">
                  {discount.code}
                </div>
              </div>
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-2" />
                    Copy Code
                  </>
                )}
              </button>
            </div>

            {/* Discount Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Percent className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-600">Discount Value</div>
                    <div className="font-semibold text-gray-900">{getDiscountText()}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-600">Valid Until</div>
                    <div className="font-semibold text-gray-900">
                      {new Date(discount.validUntil).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-600">Usage</div>
                    <div className="font-semibold text-gray-900">
                      {discount.usedCount} / {discount.usageLimit} used
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-600">Time Remaining</div>
                    <div className="font-semibold text-gray-900">
                      {getRemainingDays()} days left
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Usage Progress</span>
                <span>{getUsagePercentage()}% used</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getUsagePercentage()}%` }}
                ></div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h4>
              <ul className="space-y-2">
                {discount.terms.map((term, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-sm text-gray-600">{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              Use This Code Now
            </button>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Share with Friends
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>This discount was earned by providing valuable feedback.</p>
            <p>Thank you for helping us improve our service!</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Reward</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Quality Feedback</h4>
              <p className="text-sm text-gray-600">
                Your detailed feedback helps us improve our services for everyone.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Instant Reward</h4>
              <p className="text-sm text-gray-600">
                Get immediate access to your discount code after submitting feedback.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Share & Earn</h4>
              <p className="text-sm text-gray-600">
                Share your experience and help others discover great services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}