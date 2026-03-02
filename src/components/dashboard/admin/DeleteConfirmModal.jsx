// components/dashboard/admin/DeleteConfirmModal.jsx
"use client";

import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

export default function DeleteConfirmModal({ node, onConfirm, onCancel }) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onCancel} />
        
        <div className="relative bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-red-600">Delete Content</h2>
            <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center space-x-3 text-yellow-600 bg-yellow-50 p-4 rounded-lg mb-4">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">
              This will delete <strong>"{node.title}"</strong> and all its children. This action cannot be undone.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Type:</span> {node.type}<br />
              <span className="font-medium">Slug:</span> /{node.slug}<br />
              <span className="font-medium">Status:</span> {node.status}
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300"
            >
              {loading ? "Deleting..." : "Delete Forever"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}