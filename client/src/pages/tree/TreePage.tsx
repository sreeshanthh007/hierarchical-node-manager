import { useState, useCallback } from 'react';
import { useNodes, useDeleteNodeMutation } from '@/hooks/use-nodes';
import { NodeTree } from '@/components/node/NodeTree';
import { NodeSkeleton } from '@/components/node/NodeSkeleton';
import ErrorView from '@/components/common/ErrorView';
import ConfirmModal from '@/components/common/ConfirmModal';
import { TreeHeader } from '@/components/tree/TreeHeader';
import { TreeContainer } from '@/components/tree/TreeContainer';
import { EmptyTreeState } from '@/components/tree/EmptyTreeState';
import { AddNodeInput } from '@/components/node/AddNodeInput';

export const TreePage = () => {
  const { data: nodes, isLoading, isError, refetch } = useNodes();
  const deleteNodeMutation = useDeleteNodeMutation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddingRoot, setIsAddingRoot] = useState(false);
  const [nodeIdToDelete, setNodeIdToDelete] = useState<string | null>(null);

  const handleDeleteRequest = useCallback((nodeId: string) => {
    setNodeIdToDelete(nodeId);
    setIsDeleteModalOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (nodeIdToDelete) {
      deleteNodeMutation.mutate(nodeIdToDelete);
      setNodeIdToDelete(null);
    }
  }, [deleteNodeMutation, nodeIdToDelete]);

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <ErrorView onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <TreeHeader onAddRootNode={() => setIsAddingRoot(true)} />

        <TreeContainer>
          {isLoading ? (
            <NodeSkeleton />
          ) : (
            <div className="flex flex-col gap-6">
              {/* Modular Inline Root Addition Input */}
              {isAddingRoot && (
                 <AddNodeInput 
                  parentId={null} 
                  onCancel={() => setIsAddingRoot(false)} 
                  placeholder="Enter root node name..."
                />
              )}

              {nodes && nodes.length > 0 ? (
                <div className="space-y-4">
                  <NodeTree
                    nodes={nodes}
                    onDeleteNode={handleDeleteRequest}
                  />
                </div>
              ) : (
                !isAddingRoot && <EmptyTreeState />
              )}
            </div>
          )}
        </TreeContainer>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this node and all its nested children? This action cannot be undone."
      />
    </div>
  );
};

export default TreePage;
