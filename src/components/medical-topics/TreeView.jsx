'use client';

import { useState, useCallback, useMemo } from 'react';
import TreeNode from './TreeNode';

export default function TreeView({ items, sectionSlug, basePath }) {
  const [loadedChildren, setLoadedChildren] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  
  // Memoize the load function to prevent unnecessary re-renders
  const loadChildData = useCallback(async (slug) => {
    // Prevent multiple simultaneous loads for same slug
    if (loadingStates[slug]) return null;
    if (loadedChildren[slug]) return loadedChildren[slug];
    
    setLoadingStates(prev => ({ ...prev, [slug]: true }));
    
    try {
      // Dynamic import with error boundary
      const module = await import(`@/data/medical-topics/${slug}.json`)
        .catch((error) => {
          console.error(`Failed to load ${slug}:`, error);
          return null;
        });
      
      if (module?.default?.items) {
        setLoadedChildren(prev => ({
          ...prev,
          [slug]: module.default.items
        }));
        return module.default.items;
      }
    } catch (error) {
      console.error(`Error loading ${slug}:`, error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [slug]: false }));
    }
    
    return null;
  }, [loadedChildren, loadingStates]);

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    
    const searchLower = searchTerm.toLowerCase();
    const filterItems = (itemsList) => {
      return itemsList.filter(item => {
        const matches = item.title.toLowerCase().includes(searchLower);
        if (item.children) {
          const filteredChildren = filterItems(item.children);
          if (filteredChildren.length > 0) return true;
        }
        return matches;
      });
    };
    
    return filterItems(items);
  }, [items, searchTerm]);

  if (!items?.length) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-500">No content available for this section.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-black w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all "
        />
        <svg
          className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results count */}
      {searchTerm && (
        <div className="text-sm text-gray-500">
          Found {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
        </div>
      )}

      {/* Tree navigation */}
      <div className="space-y-1" role="tree">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <TreeNode
              key={`${item.title}-${index}`}
              item={item}
              level={0}
              loadChildData={loadChildData}
              loadedChildren={loadedChildren}
              sectionSlug={sectionSlug}
              basePath={basePath}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No matching topics found.
          </div>
        )}
      </div>

      {/* Load more indicator */}
      {Object.keys(loadedChildren).length > 0 && (
        <div className="text-xs text-gray-400 text-center pt-4 border-t border-gray-100">
          {Object.keys(loadedChildren).length} sections expanded
        </div>
      )}
    </div>
  );
}