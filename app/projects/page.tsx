"use client";

import { Suspense, useState } from "react";
import ProjectsGrid from "@/components/projects/projects-grid";
import ProjectsFilter from "@/components/projects/projects-filter";
import ProjectsSort from "@/components/projects/projects-sort";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-[1340px] w-full mx-auto px-[20px] py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Browse Projects
        </h1>
        <p className="text-muted-foreground">
          Discover high-quality digital products created by talented developers
          and designers.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <div className="hidden md:block">
          <ProjectsFilter />
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="md:hidden">
              <ProjectsFilter />
            </div>
            <ProjectsSort />
          </div>
          <Suspense fallback={<ProjectsGridSkeleton />}>
            <ProjectsGrid
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
          </Suspense>
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage}
            </span>
            <Button variant="outline" size="sm" onClick={handleNextPage}>
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
    </div>
  );
}
