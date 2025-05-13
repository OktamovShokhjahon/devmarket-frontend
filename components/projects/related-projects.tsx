"use client"

import { mockProjects } from "@/lib/mock-data"
import ProductCard from "@/components/projects/product-card"
import Link from "next/link"
import { useCallback } from "react"

interface RelatedProjectsProps {
  currentId: string
  category: string
}

export default function RelatedProjects({ currentId, category }: RelatedProjectsProps) {
  // Get related projects (same category, different ID)
  const relatedProjects = mockProjects
    .filter((project) => project.id !== currentId && project.category === category)
    .slice(0, 3)

  // Use useCallback to prevent recreation of the function on each render
  const handleClick = useCallback(() => {
    // Scroll to top when clicking a related project
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {relatedProjects.map((product) => (
        <Link key={product.id} href={`/projects/${product.id}`} className="block" onClick={handleClick}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  )
}
