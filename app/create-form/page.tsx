'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Save, Eye, Settings, Type, CheckSquare, Star, MessageSquare, Calendar } from 'lucide-react';

export default function CreateFormPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    isPublic: false,
    allowAnonymous: true,
    requireEmail: false
  });

  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: 'rating',
      text: 'How would you rate your overall experience?',
      required: true,
      options: [] as string[]
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const questionTypes = [
    { id: 'rating', name: 'Rating', icon: Star, description: '1-5 star rating' },
    { id: 'text', name: 'Text', icon: Type, description: 'Short text answer' },
    { id: 'textarea', name: 'Long Text', icon: MessageSquare, description: 'Long text answer' },
    { id: 'multiple-choice', name: 'Multiple Choice', icon: CheckSquare, description: 'Select one option' },
    { id: 'checkbox', name: 'Checkbox', icon: CheckSquare, description: 'Select multiple options' },
    { id: 'date', name: 'Date', icon: Calendar, description: 'Date picker' }
  ];

  const addQuestion = (type: string) => {
    const newQuestion = {
      id: questions.length + 1,
      type,
      text: '',
      required: false,
      options: type === 'multiple-choice' || type === 'checkbox' ? ['Option 1', 'Option 2'] : []
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: number, field: string, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const addOption = (questionId: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }
        : q
    ));
  };

  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { 
            ...q, 
            options: q.options.map((opt, idx) => idx === optionIndex ? value : opt)
          }
        : q
    ));
  };

  const removeOption = (questionId: number, optionIndex: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.filter((_, idx) => idx !== optionIndex) }
        : q
    ));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Form saved successfully!');
    } catch (err) {
      alert('Error saving form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderQuestionPreview = (question: any) => {
    switch (question.type) {
      case 'rating':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {question.text} {question.required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 text-gray-300" />
              ))}
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {question.text} {question.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your answer..."
            />
          </div>
        );
      
      case 'textarea':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {question.text} {question.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your answer..."
            />
          </div>
        );
      
      case 'multiple-choice':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {question.text} {question.required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {question.options.map((option: string, index: number) => (
                <label key={index} className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {question.text} {question.required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {question.options.map((option: string, index: number) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
      
      case 'date':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {question.text} {question.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Feedback Form</h1>
          <p className="mt-2 text-gray-600">Design and customize your customer feedback form</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Builder */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Form Settings */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Form Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Form Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Customer Feedback Form"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select category</option>
                      <option value="service">Service Quality</option>
                      <option value="product">Product Feedback</option>
                      <option value="experience">Overall Experience</option>
                      <option value="suggestion">Suggestions</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe what this form is for..."
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.allowAnonymous}
                      onChange={(e) => setFormData({...formData, allowAnonymous: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Allow anonymous submissions</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.requireEmail}
                      onChange={(e) => setFormData({...formData, requireEmail: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Require email address</span>
                  </label>
                </div>
              </div>

              {/* Questions */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPreviewMode(!previewMode)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {previewMode ? 'Edit' : 'Preview'}
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Form
                    </button>
                  </div>
                </div>

                {previewMode ? (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{formData.title}</h3>
                      <p className="text-gray-600 mb-6">{formData.description}</p>
                      <div className="space-y-6">
                        {questions.map((question) => (
                          <div key={question.id} className="bg-white rounded-lg p-4 border">
                            {renderQuestionPreview(question)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {questions.map((question) => (
                      <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={question.text}
                              onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter your question..."
                            />
                          </div>
                          <button
                            onClick={() => removeQuestion(question.id)}
                            className="ml-4 text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={question.required}
                              onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
                              className="mr-2"
                            />
                            <span className="text-sm text-gray-700">Required</span>
                          </label>
                        </div>

                        {(question.type === 'multiple-choice' || question.type === 'checkbox') && (
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Options</label>
                            {question.options.map((option: string, index: number) => (
                              <div key={index} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => updateOption(question.id, index, e.target.value)}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                  onClick={() => removeOption(question.id, index)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => addOption(question.id)}
                              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add Option
                            </button>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Add Question Buttons */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {questionTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            onClick={() => addQuestion(type.id)}
                            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
                          >
                            <Icon className="w-6 h-6 text-gray-400 mb-2" />
                            <div className="text-sm font-medium text-gray-900">{type.name}</div>
                            <div className="text-xs text-gray-500">{type.description}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Form Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Questions</span>
                    <span className="text-sm font-medium text-gray-900">{questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Required Questions</span>
                    <span className="text-sm font-medium text-gray-900">
                      {questions.filter(q => q.required).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Estimated Time</span>
                    <span className="text-sm font-medium text-gray-900">
                      {Math.ceil(questions.length * 0.5)} min
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    Generate QR Code
                  </button>
                  <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                    Preview Form
                  </button>
                  <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                    Share Form
                  </button>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Tips</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Keep questions short and clear</li>
                  <li>• Use rating questions for quick feedback</li>
                  <li>• Add open-ended questions for detailed insights</li>
                  <li>• Test your form before publishing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}