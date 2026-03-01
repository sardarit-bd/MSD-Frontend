"use client";

import { AlertTriangle } from "lucide-react";

export default function DeleteConfirmModal({ node, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onCancel}></div>
        
        <div className="relative bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex items-center justify-center mb-4 text-red-600">
            <AlertTriangle className="h-12 w-12" />
          </div>
          
          <h2 className="text-xl font-semibold text-center mb-2">Delete Content</h2>
          
          <p className="text-gray-600 text-center mb-4">
            Are you sure you want to delete <span className="font-semibold">"{node.title}"</span>?
            This will also delete all child content recursively. This action cannot be undone.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Warning:</strong> All pages, articles, and sub-sections under this item will be permanently deleted.
            </p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete Permanently
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}