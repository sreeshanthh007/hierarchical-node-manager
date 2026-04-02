import { useState, memo } from 'react';
import type { Node } from '@/types/node';
import { NodeTree } from './NodeTree';
import { Button } from '@/components/ui/button';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { AddNodeInput } from './AddNodeInput';

interface NodeItemProps {
  node: Node;
  onDeleteNode: (nodeId: string) => void;
  level?: number;
  isLast?: boolean;
}

export const NodeItem = memo(({ node, onDeleteNode, level = 0, isLast = false }: NodeItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddingMode, setIsAddingMode] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col relative">
      {/* Connector lines for children level */}
      {level > 0 && (
        <>
          {/* Vertical line connector */}
          <div className={`absolute -left-[18px] top-0 w-[2px] bg-slate-300 dark:bg-slate-700 ${isLast ? 'h-[20px]' : 'h-full'}`} />
          {/* Horizontal branch line */}
          <div className="absolute -left-[18px] top-[20px] w-[18px] h-[2px] bg-slate-300 dark:bg-slate-700 rounded-r-full" />
        </>
      )}

      <div className="flex items-center group py-2 px-3 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all duration-200 gap-3 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm hover:shadow-md">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`h-8 w-8 transition-transform duration-200 ${isExpanded ? 'rotate-0' : '-rotate-90'} ${!hasChildren ? 'opacity-20 cursor-default' : 'opacity-100'}`}
          disabled={!hasChildren}
        >
          <ChevronDown className="h-5 w-5 text-slate-500" />
        </Button>

        <div className="flex items-center gap-2 flex-grow">
          {/* Symbol indicating if it has children or not */}
          {!hasChildren ? (
            <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600 ml-1 mr-2" />
          ) : null}
          
          <span className="font-semibold text-base text-slate-800 dark:text-slate-200 tracking-tight transition-colors">
            {node.name}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsAddingMode(true)}
            className="h-8 w-8 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
            title="Add Child Inline"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteNode(node._id)}
            className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30"
            title="Delete Node"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Modular Inline Adding Interface */}
      {isAddingMode && (
        <div className="ml-[22px] my-2 relative">
          {/* Trunk Extension Line */}
          {!isLast && (
             <div className="absolute -left-[22px] top-0 w-[2px] h-full bg-slate-200 dark:bg-slate-800" />
          )}
          {/* Horizontal Line Connector */}
          <div className="absolute -left-[22px] top-[18px] w-[22px] h-[2px] bg-slate-300 dark:bg-slate-700 rounded-r-full" />
          
          <AddNodeInput 
            parentId={node._id} 
            onCancel={() => setIsAddingMode(false)}
            onSuccess={() => setIsExpanded(true)}
            placeholder="Child node name..."
          />
        </div>
      )}

      {/* Recursive Children Rendering */}
      {isExpanded && hasChildren && (
        <div className="ml-[18px] my-1 transition-all">
          <NodeTree
            nodes={node.children}
            onDeleteNode={onDeleteNode}
            level={level + 1}
          />
        </div>
      )}
    </div>
  );
});
