const API_BASE = "http://localhost:5000/api";

// Get auth token
const getToken = () => localStorage.getItem("accessToken");

// Helper for fetch with auth
const authFetch = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// Node APIs
export const nodeApi = {
  // Get children nodes
  getChildren: async (parentId = null, status = "") => {
    const params = new URLSearchParams();
    if (parentId) params.append("parentId", parentId);
    if (status) params.append("status", status);
    
    return authFetch(`/nodes?${params.toString()}`);
  },

  // Get single node
  getNode: async (id) => {
    return authFetch(`/nodes/${id}`);
  },

  // Create node
  createNode: async (nodeData) => {
    return authFetch("/nodes", {
      method: "POST",
      body: JSON.stringify(nodeData),
    });
  },

  // Update node
  updateNode: async (id, nodeData) => {
    return authFetch(`/nodes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(nodeData),
    });
  },

  // Delete node
  deleteNode: async (id) => {
    return authFetch(`/nodes/${id}`, {
      method: "DELETE",
    });
  },

  // Reorder siblings
  reorderNodes: async (parentId, items) => {
    return authFetch("/nodes/reorder", {
      method: "POST",
      body: JSON.stringify({ parentId, items }),
    });
  },

  // Get breadcrumb
  getBreadcrumb: async (id) => {
    return authFetch(`/nodes/${id}/breadcrumb`);
  },

  // Resolve path (public)
  resolvePath: async (slugs, onlyPublished = true) => {
    const response = await fetch(`${API_BASE}/nodes/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slugs, onlyPublished }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Not found");
    }
    
    return data;
  },
};