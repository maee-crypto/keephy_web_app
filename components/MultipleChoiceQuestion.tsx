'use client';

interface Option {
  label: string;
  value: string;
}

interface MultipleChoiceQuestionProps {
  question: {
    _id: string;
    questionText: string;
    required: boolean;
  };
  value: string | number;
  onChange: (value: string) => void;
  options: Option[];
  error?: string;
}

export function MultipleChoiceQuestion({ 
  question, 
  value, 
  onChange, 
  options, 
  error 
}: MultipleChoiceQuestionProps) {
  const selectedValue = typeof value === 'string' ? value : '';

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {question.questionText}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`
              flex items-center p-3 border rounded-lg cursor-pointer transition-colors
              ${selectedValue === option.value
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <input
              type="radio"
              name={question._id}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-3 text-sm text-gray-700">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}