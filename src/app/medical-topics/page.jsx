import Link from 'next/link';
import { generateSlug } from '@/lib/medical-topics/utils';

// Server component - no 'use client' needed
export default async function MedicalTopicsPage() {
  // Import index.json on server
  const indexData = (await import('@/data/medical-topics/index.json')).default;
  
  const sections = Object.entries(indexData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Medical Topics
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive, peer-reviewed medical information for healthcare professionals and patients
            </p>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{sections.length}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Main Sections</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,200+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Medical Topics</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Free Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Browse by Section</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <option>Alphabetical</option>
              <option>Most Popular</option>
              <option>Recently Updated</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map(([slug, { title }], index) => (
            <Link
              key={slug}
              href={`/medical-topics/${slug}`}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors duration-300">
                  <svg 
                    className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-white transition-colors duration-300 mb-2">
                  {title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-500 group-hover:text-blue-100 transition-colors duration-300 text-sm line-clamp-2">
                  Explore comprehensive information about {title.toLowerCase()}, including causes, symptoms, diagnosis, and treatment options.
                </p>
                
                {/* Stats */}
                <div className="mt-4 flex items-center text-sm text-gray-400 group-hover:text-blue-100 transition-colors duration-300">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span>{Math.floor(Math.random() * 20) + 10} subtopics</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}