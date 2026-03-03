'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6">
          {error.message || 'Failed to load medical content'}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-[#1e5c75] text-white rounded-md hover:bg-[#0F3549] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}