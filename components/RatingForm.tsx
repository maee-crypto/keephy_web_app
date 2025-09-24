'use client';

import { useState } from 'react';
import { Star, Send, User, Mail, Phone } from 'lucide-react';
import { RatingQuestion } from './RatingQuestion';
import { TextQuestion } from './TextQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { YesNoQuestion } from './YesNoQuestion';
import { ContactForm } from './ContactForm';

interface Question {
  _id: string;
  type: string;
  questionText: string;
  options?: { label: string; value: string }[];
  required: boolean;
  order: number;
}

interface Form {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  settings: {
    allowAnonymous: boolean;
    thankYouMessage: string;
    collectContact: boolean;
  };
}

interface SubmissionData {
  formId: string;
  responses: { questionId: string; answer: string | number }[];
  contactInfo?: {
    name: string;
    email: string;
  };
  deviceId: string;
}

interface RatingFormProps {
  form: Form;
  onSubmit: (data: SubmissionData) => Promise<void>;
}

export function RatingForm({ form, onSubmit }: RatingFormProps) {
  const [responses, setResponses] = useState<{ [key: string]: string | number }>({});
  const [contactInfo, setContactInfo] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleResponseChange = (questionId: string, answer: string | number) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Clear error when user provides answer
    if (errors[questionId]) {
      setErrors(prev => ({
        ...prev,
        [questionId]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    form.questions.forEach(question => {
      if (question.required && !responses[question._id]) {
        newErrors[question._id] = 'This question is required';
      }
    });

    if (form.settings.collectContact) {
      if (!contactInfo.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!contactInfo.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(contactInfo.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submissionData: SubmissionData = {
        formId: form._id,
        responses: Object.entries(responses).map(([questionId, answer]) => ({
          questionId,
          answer
        })),
        deviceId: `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };

      if (form.settings.collectContact) {
        submissionData.contactInfo = contactInfo;
      }

      await onSubmit(submissionData);
    } catch (error) {
      console.error('Submission error:', error);
      // Error handling is done in parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = (question: Question) => {
    const commonProps = {
      question,
      value: responses[question._id] || '',
      onChange: (answer: string | number) => handleResponseChange(question._id, answer),
      error: errors[question._id]
    };

    switch (question.type) {
      case 'rating':
        return <RatingQuestion {...commonProps} />;
      case 'text':
        return <TextQuestion {...commonProps} />;
      case 'multiple_choice':
        return <MultipleChoiceQuestion {...commonProps} options={question.options || []} />;
      case 'yes_no':
        return <YesNoQuestion {...commonProps} />;
      default:
        return <TextQuestion {...commonProps} />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Questions */}
      <div className="space-y-6">
        {form.questions
          .sort((a, b) => a.order - b.order)
          .map((question) => (
            <div key={question._id} className="space-y-2">
              {renderQuestion(question)}
            </div>
          ))}
      </div>

      {/* Contact Information */}
      {form.settings.collectContact && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Contact Information (Optional)
          </h3>
          <ContactForm
            contactInfo={contactInfo}
            onChange={setContactInfo}
            errors={errors}
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white
            ${isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
            }
            transition-colors duration-200
          `}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin -ml-1 mr-3 h-5 w-5 text-white">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              </div>
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit Feedback
            </>
          )}
        </button>
      </div>
    </form>
  );
}