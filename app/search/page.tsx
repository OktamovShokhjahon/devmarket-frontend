"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockProjects } from "@/lib/mock-data"
import { Search } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProductCard from "@/components/projects/product-card"
import ProjectsFilter from "@/components/projects/projects-filter"
import ProjectsSort from "@/components/projects/projects-sort"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [searchResults, setSearchResults] = useState<typeof mockProjects>([])

  useEffect(() => {
    if (query) {
      // Filter projects based on search query
      const results = mockProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(query.toLowerCase()) ||
          project.description.toLowerCase().includes(query.toLowerCase()) ||
          project.category.toLowerCase().includes(query.toLowerCase()) ||
          project.seller.toLowerCase().includes(query.toLowerCase()),
      )

      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Search Results</h1>
        <form onSubmit={handleSearch} className="max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products, categories, sellers..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 h-10">
              Search
            </Button>
          </div>
        </form>
      </div>

      {query && (
        <div className="mb-6">
          <p className="text-muted-foreground">
            {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for "{query}"
          </p>
        </div>
      )}

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

          {searchResults.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">No results found</h2>
              <p className="text-muted-foreground mb-4">
                We couldn't find any products matching your search. Try using different keywords or browse our
                categories.
              </p>
              <Button asChild>
                <a href="/categories">Browse Categories</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
