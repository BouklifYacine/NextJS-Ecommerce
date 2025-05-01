import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProduitUnique = () => {
  return (
    <div className="min-h-screen">
    

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 p-4 md:p-16">
    
        <Skeleton className="flex-1 w-full max-w-[500px] aspect-square rounded-2xl" />

      
        <Skeleton className="flex-1 w-full max-w-[500px] h-[400px] rounded-2xl" />
      </div>
    </div>
  );
};

export default SkeletonProduitUnique;
