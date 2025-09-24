'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-4">{error?.message || 'Unexpected error occurred.'}</p>
        <button onClick={reset} className="bg-blue-600 text-white rounded px-4 py-2">Try again</button>
      </div>
    </div>
  );
}


