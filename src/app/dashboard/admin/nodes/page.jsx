"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderTree,
  FileText,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  Move,
  Eye,
  EyeOff,
  AlertCircle
} from "lucide-react";
import { useNodes } from "../../context/NodeContext";
import DeleteConfirmModal from "@/components/dashboard/admin/DeleteConfirmModal";
import CreateNodeModal from "@/components/dashboard/admin/CreateNodeModal";

export default function NodesPage() {
  const { nodes, loading, error, loadChildren, deleteNode } = useNodes();
  const [selectedParent, setSelectedParent] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [childrenMap, setChildrenMap] = useState({});

  useEffect(() => {
    loadChildren(selectedParent);
  }, [selectedParent, loadChildren]);

  const toggleExpand = async (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));

    if (!childrenMap[nodeId]) {
      const childNodes = await loadChildren(nodeId);
      setChildrenMap(prev => ({
        ...prev,
        [nodeId]: childNodes
      }));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNode(id);
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "section": return <FolderTree className="h-5 w-5 text-blue-500" />;
      case "group": return <FolderTree className="h-5 w-5 text-green-500" />;
      case "page": return <FileText className="h-5 w-5 text-purple-500" />;
      case "article": return <FileText className="h-5 w-5 text-orange-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    if (status === "published") {
      return <span className="flex items-center text-xs text-green-600"><Eye className="h-3 w-3 mr-1" />Published</span>;
    }
    return <span className="flex items-center text-xs text-gray-500"><EyeOff className="h-3 w-3 mr-1" />Draft</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Content Structure</h1>
          <p className="text-sm text-gray-600 mt-1">Manage sections, pages, and articles</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 text-white" />
          <span>Create New</span>
        </button>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm">
        <button
          onClick={() => setSelectedParent(null)}
          className={`px-3 py-1 rounded-full ${!selectedParent
            ? "bg-blue-100 text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
            }`}
        >
          Root
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
          {error}
        </div>
      )}

      {/* Nodes Tree */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-700 uppercase">
            <div className="col-span-5 text-black">Title & Slug</div>
            <div className="col-span-2 text-black">Type</div>
            <div className="col-span-2 text-black">Status</div>
            <div className="col-span-1 text-black">Order</div>
            <div className="col-span-2 text-black">Actions</div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {loading && nodes.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              Loading content structure...
            </div>
          ) : nodes.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              No content found. Create your first item!
            </div>
          ) : (
            nodes.map((node) => (
              <div key={node._id} className="px-6 py-4 hover:bg-gray-50">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5">
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleExpand(node._id)}
                        className="mr-2 text-gray-500 hover:text-gray-700"
                      >
                        {expandedNodes[node._id] ? (
                          <ChevronDown className="h-4 w-4 text-gray-600" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-600" />
                        )}
                      </button>
                      {getTypeIcon(node.type)}
                      <div className="ml-3">
                        <p className="font-medium text-black">{node.title}</p>
                        <p className="text-xs text-gray-600">/{node.slug}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {node.type}
                    </span>
                  </div>
                  <div className="col-span-2">
                    {getStatusBadge(node.status)}
                  </div>
                  <div className="col-span-1 text-sm text-black">
                    {node.order}
                  </div>
                  <div className="col-span-2 flex items-center space-x-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Move className="h-4 w-4 text-blue-600" />
                    </button>
                    <Link
                      href={`/dashboard/admin/nodes/${node._id}/edit`}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      <Edit className="h-4 w-4 text-green-600" />
                    </Link>
                    <button
                      onClick={() => setShowDeleteConfirm(node)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Child nodes would go here when expanded */}
                {expandedNodes[node._id] && (
                  <div className="ml-8 mt-4 border-l-2 border-gray-200 pl-4 space-y-2">
                    {childrenMap[node._id] ? (
                      childrenMap[node._id].length > 0 ? (
                        childrenMap[node._id].map((child) => (
                          <div key={child._id} className="flex items-center space-x-2">
                            {getTypeIcon(child.type)}
                            <span className="text-sm text-black">{child.title}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No children</p>
                      )
                    ) : (
                      <p className="text-sm text-gray-500">Loading...</p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateNodeModal
          parentId={selectedParent}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            loadChildren(selectedParent);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          node={showDeleteConfirm}
          onConfirm={() => handleDelete(showDeleteConfirm._id)}
          onCancel={() => setShowDeleteConfirm(null)}
        />
      )}
    </div>
  );
}