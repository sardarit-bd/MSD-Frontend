"use client";

import { useEffect, useState } from "react";
import ExpandableTree from "./ExpandableTree";
import NotFound from "@/app/not-found";

export default function NodePage({ slugPath }) {
  const [node, setNode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNode = async () => {
      try {
        const slugs = slugPath.split("/");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/nodes/resolve`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              slugs,
              onlyPublished: true,
            }),
          }
        );

        const data = await res.json();
        setNode(data.node);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNode();
  }, [slugPath]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!node) return <NotFound/>

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">{node.title}</h1>

      <ExpandableTree nodes={node.children} />
    </div>
  );
}