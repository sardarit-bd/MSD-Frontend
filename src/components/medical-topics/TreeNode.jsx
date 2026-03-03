'use client';

import { useState, useCallback, memo, useMemo } from 'react';
import Link from 'next/link';

// Memoized to prevent unnecessary re-renders
const TreeNode = memo(function TreeNode({ 
  item, 
  level, 
  loadChildData, 
  loadedChildren,
  sectionSlug,
  basePath 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const hasChildren = (item.children?.length > 0) || !!item.slug;
  const hasDynamicChildren = !!item.slug && !item.children;
  
  // Handle expanding/collapsing
  const handleToggle = useCallback(async (e) => {
    e.stopPropagation();
    
    if (!isOpen && hasDynamicChildren && !loadedChildren[item.slug]) {
      setIsLoading(true);
      try {
        await loadChildData(item.slug);
      } finally {
        setIsLoading(false);
      }
    }
    setIsOpen(prev => !prev);
  }, [isOpen, hasDynamicChildren, item.slug, loadedChildren, loadChildData]);

  // Get children to render
  const childrenToRender = useMemo(() => {
    if (isOpen) {
      if (item.children) return item.children;
      if (item.slug && loadedChildren[item.slug]) return loadedChildren[item.slug];
    }
    return [];
  }, [isOpen, item.children, item.slug, loadedChildren]);

  // Generate the full path for this node if it has a slug
  const nodePath = item.slug ? `${basePath}/${item.slug}` : null;

  // Determine background color based on level
  const getLevelStyles = () => {
    if (level === 0) return 'hover:bg-blue-50';
    if (level === 1) return 'hover:bg-gray-50';
    return 'hover:bg-gray-50/50';
  };

  return (
    <div 
      className="select-none" 
      role="treeitem" 
      aria-expanded={isOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tree node header */}
      <div
        className={`
          flex items-center gap-2 py-2.5 px-4 rounded-lg
          transition-all duration-200 cursor-pointer
          ${level > 0 ? 'ml-7' : ''}
          ${getLevelStyles()}
          ${item.slug ? 'group' : ''}
          ${isHovered ? 'shadow-sm' : ''}
        `}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle(e);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`${item.title} ${hasChildren ? '(expandable)' : ''}`}
      >
        {/* Expand/collapse indicator with improved styling */}
        {hasChildren && (
          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
            {isLoading ? (
              <svg className="animate-spin h-4 w-4 text-blue-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg
                className={`
                  w-4 h-4 transition-all duration-200
                  ${isOpen ? 'text-blue-500 rotate-90' : 'text-gray-400 group-hover:text-gray-600'}
                `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </span>
        )}
        
        {/* Title with improved typography */}
        {item.slug ? (
          <Link
            href={nodePath}
            className={`
              flex-1 text-sm transition-all duration-200
              ${level === 0 
                ? 'font-semibold text-gray-900' 
                : level === 1
                  ? 'font-medium text-gray-800'
                  : 'text-gray-600'
              }
              hover:text-blue-600
              ${isHovered ? 'translate-x-0.5' : ''}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {item.title}
          </Link>
        ) : (
          <span className={`
            flex-1 text-sm
            ${level === 0 
              ? 'font-semibold text-gray-900' 
              : level === 1
                ? 'font-medium text-gray-800'
                : 'text-gray-600'
            }
          `}>
            {item.title}
          </span>
        )}
        
        {/* Enhanced badge */}
        {item.slug && (
          <span className={`
            text-xs px-2 py-1 rounded-full transition-all duration-200
            ${isHovered 
              ? 'bg-blue-100 text-blue-700 opacity-100' 
              : 'bg-gray-100 text-gray-500 opacity-0 group-hover:opacity-100'
            }
          `}>
            {isHovered ? 'Open →' : 'Details'}
          </span>
        )}
      </div>

      {/* Children with animated expansion */}
      {isOpen && childrenToRender.length > 0 && (
        <div 
          className="mt-1 border-l-2 border-blue-200 ml-6 pl-3 space-y-1 animate-fadeIn"
          style={{
            animation: 'fadeIn 0.2s ease-in-out'
          }}
        >
          {childrenToRender.map((child, index) => (
            <TreeNode
              key={`${child.title}-${index}`}
              item={child}
              level={level + 1}
              loadChildData={loadChildData}
              loadedChildren={loadedChildren}
              sectionSlug={sectionSlug}
              basePath={basePath}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
});

export default TreeNode;