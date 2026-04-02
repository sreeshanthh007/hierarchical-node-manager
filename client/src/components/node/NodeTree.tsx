import React, { memo } from 'react';
import type { Node } from '@/types/node';
import { NodeItem } from './NodeItem';


interface NodeTreeProps {
  nodes: Node[];
  onDeleteNode: (nodeId: string) => void;
  level?: number;
}

export const NodeTree: React.FC<NodeTreeProps> = memo(({ nodes, onDeleteNode, level = 0 }) => {
  return (
    <div className="flex flex-col">
      {nodes.map((node, index) => (
        <NodeItem
          key={node._id}
          node={node}
          level={level}
          isLast={index === nodes.length - 1}
          onDeleteNode={onDeleteNode}
        />
      ))}
    </div>
  );
});