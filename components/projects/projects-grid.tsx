"use client";

import { mockProjects } from "@/lib/mock-data";
import ProductCard from "@/components/projects/product-card";

export default function ProjectsGrid({
  currentPage,
  itemsPerPage,
}: {
  currentPage: number;
  itemsPerPage: number;
}) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = mockProjects.slice(startIndex, endIndex);

  return (
    <div className="grid gap-6 grid-cols-1 md2:grid-cols-3 md3:grid-cols-2">
      {paginatedProjects.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
