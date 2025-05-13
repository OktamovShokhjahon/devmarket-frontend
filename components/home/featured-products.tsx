import { mockProjects } from "@/lib/mock-data"
import ProductCard from "@/components/projects/product-card"

export default function FeaturedProducts() {
  // Get 6 featured products
  const featuredProducts = mockProjects.filter((project) => project.featured).slice(0, 6)

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
