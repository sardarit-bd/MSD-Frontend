"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function ExpandableTree({ nodes }) {
  return (
    <div className="space-y-3">
      {nodes?.map((node) => (
        <TreeItem key={node._id} node={node} />
      ))}
    </div>
  );
}

function TreeItem({ node }) {
  const [open, setOpen] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="border-b pb-2">
      <div className="flex items-center gap-2">
        {hasChildren && (
          <button onClick={() => setOpen(!open)}>
            {open ? <Minus size={16} /> : <Plus size={16} />}
          </button>
        )}

        <Link
          href={`/${node.fullSlug || node.slug}`}
          className="text-red-600 hover:underline font-medium"
        >
          {node.title}
        </Link>
      </div>

      {open && hasChildren && (
        <div className="ml-6 mt-2">
          {node.children.map((child) => (
            <TreeItem key={child._id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}