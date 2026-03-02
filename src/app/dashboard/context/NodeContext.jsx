// app/dashboard/context/NodeContext.jsx
"use client";

import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const NodeContext = createContext();

export function NodeProvider({ children }) {
  const [nodes, setNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add token to requests
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const loadChildren = useCallback(async (parentId = null) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (parentId) params.append("parentId", parentId);

      const response = await api.get(`/nodes?${params.toString()}`);

      setNodes(response.data);

      return response.data;

    } catch (err) {
      setError(err.response?.data?.message || "Failed to load nodes");
      console.error("Load children error:", err);
      return []; // নিরাপদ fallback
    } finally {
      setLoading(false);
    }
  }, []);

  const loadNode = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/nodes/${id}`);
      setCurrentNode(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load node");
      console.error("Load node error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNode = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/nodes", data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create node");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateNode = useCallback(async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.patch(`/nodes/${id}`, data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update node");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteNode = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.delete(`/nodes/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete node");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reorderNodes = useCallback(async (parentId, items) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/nodes/reorder", { parentId, items });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reorder nodes");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <NodeContext.Provider
      value={{
        nodes,
        currentNode,
        loading,
        error,
        loadChildren,
        loadNode,
        createNode,
        updateNode,
        deleteNode,
        reorderNodes,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
}

export function useNodes() {
  const context = useContext(NodeContext);
  if (!context) {
    throw new Error("useNodes must be used within a NodeProvider");
  }
  return context;
}