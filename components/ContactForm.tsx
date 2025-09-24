'use client';

import { User, Mail } from 'lucide-react';

interface ContactInfo {
  name: string;
  email: string;
}

interface ContactFormProps {
  contactInfo: ContactInfo;
  onChange: (contactInfo: ContactInfo) => void;
  errors: { [key: string]: string };
}

export function ContactForm({ contactInfo, onChange, errors }: ContactFormProps) {
  const handleChange = (field: keyof ContactInfo, value: string) => {
    onChange({
      ...contactInfo,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <User className="inline w-4 h-4 mr-1" />
          Name
        </label>
        <input
          type="text"
          value={contactInfo.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`
            block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            ${errors.name ? 'border-red-300' : 'border-gray-300'}
          `}
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Mail className="inline w-4 h-4 mr-1" />
          Email Address
        </label>
        <input
          type="email"
          value={contactInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`
            block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            ${errors.email ? 'border-red-300' : 'border-gray-300'}
          `}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Privacy Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
        <p className="text-xs text-blue-700">
          <strong>Privacy:</strong> Your contact information will only be used to follow up on your feedback and will not be shared with third parties.
        </p>
      </div>
    </div>
  );
}