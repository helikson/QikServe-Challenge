import { Skeleton } from "@/components/ui/skeleton";

function SectionsSkeleton() {
   return (
      <div className="flex justify-evenly">
         <div>
            <Skeleton className="bg-gray-300 h-20 w-20 my-1 rounded-full" />
            <Skeleton className="bg-gray-300 h-4 w-20 my-2 rounded-none" />
         </div>

         <div>
            <Skeleton className="bg-gray-300 h-20 w-20 my-1 rounded-full" />
            <Skeleton className="bg-gray-300 h-4 w-20 my-2 rounded-none" />
         </div>

         <div>
            <Skeleton className="bg-gray-300 h-20 w-20 my-1 rounded-full" />
            <Skeleton className="bg-gray-300 h-4 w-20 my-2 rounded-none" />
         </div>
      </div>
   )
}

export { SectionsSkeleton };