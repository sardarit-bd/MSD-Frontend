"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { nodeApi } from "@/lib/api/node";

const NodeContext = createContext();

export function NodeProvider({ children }) {
  const [nodes, setNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load children
  const loadChildren = useCallback(async (parentId = null, status = "") => {
    setLoading(true);
    setError(null);
    try {
      const data = await nodeApi.getChildren(parentId, status);
      setNodes(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load single node
  const loadNode = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await nodeApi.getNode(id);
      setCurrentNode(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create node
  const createNode = useCallback(async (nodeData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await nodeApi.createNode(nodeData);
      // Refresh children if parentId exists
      if (nodeData.parentId) {
        await loadChildren(nodeData.parentId);
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadChildren]);

  // Update node
  const updateNode = useCallback(async (id, nodeData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await nodeApi.updateNode(id, nodeData);
      if (currentNode?._id === id) {
        setCurrentNode(data);
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentNode]);

  // Delete node
  const deleteNode = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await nodeApi.deleteNode(id);
      setNodes(prev => prev.filter(node => node._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <NodeContext.Provider value={{
      nodes,
      currentNode,
      loading,
      error,
      loadChildren,
      loadNode,
      createNode,
      updateNode,
      deleteNode,
    }}>
      {children}
    </NodeContext.Provider>
  );
}

export const useNodes = () => useContext(NodeContext);