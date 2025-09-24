'use client';

import React, { useState } from 'react';
import { CreditCard, Settings, Download, Calendar, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

export default function ManageCheckoutPage() {
  const [activeTab, setActiveTab] = useState('subscription');
  const [loading, setLoading] = useState(false);

  const subscription = {
    plan: 'Professional',
    price: 99,
    billing: 'monthly',
    status: 'active',
    nextBilling: '2024-04-15',
    usage: {
      businesses: 3,
      maxBusinesses: 10,
      submissions: 1247,
      maxSubmissions: 2000
    }
  };

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      isDefault: true
    }
  ];

  const invoices = [
    {
      id: 'INV-001',
      date: '2024-03-15',
      amount: 99,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-002',
      date: '2024-02-15',
      amount: 99,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-003',
      date: '2024-01-15',
      amount: 99,
      status: 'paid',
      downloadUrl: '#'
    }
  ];

  const tabs = [
    { id: 'subscription', name: 'Subscription', icon: Settings },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'invoices', name: 'Invoices', icon: Download }
  ];

  const handleCancelSubscription = async () => {
    if (confirm('Are you sure you want to cancel your subscription? You will lose access to all premium features.')) {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Subscription cancelled successfully');
      } catch (err) {
        alert('Error cancelling subscription. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdatePlan = () => {
    // Redirect to pricing page
    window.location.href = '/pricing';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Subscription</h1>
          <p className="mt-2 text-gray-600">Manage your subscription, billing, and payment methods</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Subscription Tab */}
              {activeTab === 'subscription' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Subscription</h2>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">{subscription.plan} Plan</h3>
                        <p className="text-blue-700">${subscription.price}/{subscription.billing}</p>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-800">Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Usage This Month</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Businesses</span>
                            <span>{subscription.usage.businesses}/{subscription.usage.maxBusinesses}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(subscription.usage.businesses / subscription.usage.maxBusinesses) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Submissions</span>
                            <span>{subscription.usage.submissions.toLocaleString()}/{subscription.usage.maxSubmissions.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${(subscription.usage.submissions / subscription.usage.maxSubmissions) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Next Billing</h4>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          {new Date(subscription.nextBilling).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-lg font-semibold text-gray-900">${subscription.price}</span>
                        <span className="text-sm text-gray-500 ml-1">/{subscription.billing}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={handleUpdatePlan}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Change Plan
                    </button>
                    <button
                      onClick={handleCancelSubscription}
                      disabled={loading}
                      className="px-6 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 disabled:opacity-50"
                    >
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Methods</h2>
                  
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CreditCard className="w-8 h-8 text-gray-400 mr-3" />
                            <div>
                              <div className="font-medium text-gray-900">
                                {method.brand} •••• {method.last4}
                              </div>
                              <div className="text-sm text-gray-500">
                                Expires {method.expiry}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {method.isDefault && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                Default
                              </span>
                            )}
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Add Payment Method
                  </button>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600">
                        <p>John Smith</p>
                        <p>123 Business Street</p>
                        <p>San Francisco, CA 94105</p>
                        <p>United States</p>
                      </div>
                      <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">
                        Update Address
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Invoices Tab */}
              {activeTab === 'invoices' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Invoice History</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Invoice
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {invoices.map((invoice) => (
                          <tr key={invoice.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {invoice.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(invoice.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${invoice.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {invoice.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 flex items-center">
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}