import { Skeleton } from "@/components/ui/skeleton";

export const NodeSkeleton = () => {
  return (
    <div className="space-y-3 p-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
             <Skeleton className="h-8 w-8 rounded-lg" />
             <Skeleton className="h-6 w-48" />
          </div>
          {i % 2 === 0 && (
            <div className="ml-8 space-y-2 border-l-2 border-slate-100 dark:border-slate-800/50 pl-4">
               <div className="flex items-center gap-3">
                 <Skeleton className="h-8 w-8 rounded-lg" />
                 <Skeleton className="h-6 w-32" />
               </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
