import { useState, useCallback, useRef, useEffect } from 'react';
import { Check, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateNodeMutation } from '@/hooks/use-nodes';

interface AddNodeInputProps {
  parentId: string | null;
  onCancel: () => void;
  onSuccess?: () => void;
  placeholder?: string;
}

export const AddNodeInput = ({ 
  parentId, 
  onCancel, 
  onSuccess, 
  placeholder = "Enter node name..." 
}: AddNodeInputProps) => {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const createNodeMutation = useCreateNodeMutation();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCreate = useCallback(() => {
    if (name.trim().length < 2) return;
    
    createNodeMutation.mutate(
      { name, parentId },
      {
        onSuccess: () => {
          setName("");
          onSuccess?.();
          onCancel();
        }
      }
    );
  }, [createNodeMutation, name, parentId, onCancel, onSuccess]);

  return (
    <div className="flex items-center gap-3 p-2 bg-indigo-50/40 dark:bg-indigo-900/10 border border-indigo-200/40 dark:border-indigo-800/20 rounded-xl animate-in slide-in-from-left-2 duration-300 backdrop-blur-sm">
      <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0">
        <Plus className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={placeholder}
        disabled={createNodeMutation.isPending}
        className="bg-transparent border-none focus:ring-0 text-base font-semibold flex-grow text-indigo-900 dark:text-indigo-100 placeholder:text-slate-400"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleCreate();
          if (e.key === 'Escape') onCancel();
        }}
      />
      <div className="flex items-center gap-1 shrink-0 px-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCreate}
          disabled={createNodeMutation.isPending || name.trim().length < 2}
          className="h-9 w-9 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-lg"
        >
          <Check className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          disabled={createNodeMutation.isPending}
          className="h-9 w-9 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded-lg"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
