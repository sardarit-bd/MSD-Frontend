import Link from 'next/link';
import TreeView from './TreeView';

// Server component that passes data to client component
export default function SectionContent({ section, sectionSlug, sectionTitle }) {
  if (!section || !section.items) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">No content available</h2>
          <p className="text-gray-500">This section is currently being updated.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-b from-blue-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link 
                  href="/medical-topics" 
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Medical Topics
                </Link>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className="text-gray-700 font-medium">{sectionTitle || section.title}</li>
            </ol>
          </nav>
          
          {/* Title section */}
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {section.title}
            </h1>
            {section.description && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {section.description}
              </p>
            )}
            
            {/* Stats or metadata */}
            <div className="flex items-center space-x-6 mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center text-gray-500">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="text-sm">{countTotalItems(section.items)} topics</span>
              </div>
              <div className="flex items-center text-gray-500">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Last updated: March 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with quick navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  On this page
                </h3>
                <nav className="space-y-2">
                  {section.items.slice(0, 5).map((item, idx) => (
                    <a
                      key={idx}
                      href={`#section-${idx}`}
                      className="block text-sm text-gray-600 hover:text-blue-600 transition-colors py-1"
                    >
                      {item.title}
                    </a>
                  ))}
                  {section.items.length > 5 && (
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2">
                      View all ({section.items.length})
                    </button>
                  )}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main tree navigation */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    In This Section
                  </h2>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-200">
                    {section.items.length} main topics
                  </span>
                </div>
              </div>
              <div className="p-6">
                <TreeView 
                  items={section.items || []} 
                  sectionSlug={sectionSlug}
                  basePath={`/medical-topics/${sectionSlug}`}
                />
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-6 flex items-center justify-end space-x-4">
              <button className="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </button>
              <button className="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Print
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// Helper function to count total items recursively
function countTotalItems(items) {
  if (!items) return 0;
  return items.reduce((total, item) => {
    return total + 1 + (item.children ? countTotalItems(item.children) : 0);
  }, 0);
}