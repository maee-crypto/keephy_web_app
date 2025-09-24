'use client';

interface TextQuestionProps {
  question: {
    _id: string;
    questionText: string;
    required: boolean;
  };
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
}

export function TextQuestion({ question, value, onChange, error }: TextQuestionProps) {
  const textValue = typeof value === 'string' ? value : '';

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {question.questionText}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <textarea
        value={textValue}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className={`
          block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          ${error ? 'border-red-300' : 'border-gray-300'}
        `}
        placeholder="Please share your thoughts..."
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}