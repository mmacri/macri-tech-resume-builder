
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const HomeLoadingState: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="space-y-8">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
};

export default HomeLoadingState;
