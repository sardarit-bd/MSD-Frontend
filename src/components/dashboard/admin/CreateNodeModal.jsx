// components/dashboard/admin/CreateNodeModal.jsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useNodes } from "@/app/dashboard/context/NodeContext";

export default function CreateNodeModal({ parentId = null, onClose, onSuccess }) {
  const { createNode } = useNodes();
  const [formData, setFormData] = useState({
    type: "page",
    title: "",
    slug: "",
    status: "draft",
    contentHtml: "",
    metaTitle: "",
    metaDescription: "",
    order: 0,
    parentId: parentId
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      setFormData(prev => ({
        ...prev,
        title: value,
        slug: prev.slug ? prev.slug : generatedSlug
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createNode(formData);

      setFormData({
        type: "page",
        title: "",
        slug: "",
        status: "draft",
        contentHtml: "",
        metaTitle: "",
        metaDescription: "",
        order: 0,
        parentId: parentId || null
      });

      onSuccess();
    } catch (err) {
      setError(err.message || "Failed to create node");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />

        <div className="relative bg-white rounded-lg w-full max-w-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-black">Create New Content</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="section" className="text-black">Section</option>
                <option value="group" className="text-black">Group</option>
                <option value="page" className="text-black">Page</option>
                <option value="article" className="text-black">Article</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft" className="text-black">Draft</option>
                <option value="published" className="text-black">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Order
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                min="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Content (Optional)
              </label>
              <textarea
                name="contentHtml"
                value={formData.contentHtml}
                onChange={handleChange}
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}