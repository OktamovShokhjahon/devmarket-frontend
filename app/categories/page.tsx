import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Category data
const categories = [
  {
    id: "template",
    name: "Templates",
    description: "Ready-to-use website and application templates",
    count: 24,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "ui-kit",
    name: "UI Kits",
    description: "Component libraries and design systems",
    count: 18,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "plugin",
    name: "Plugins",
    description: "Extensions and add-ons for your applications",
    count: 15,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "icon-set",
    name: "Icon Sets",
    description: "Collections of icons for your projects",
    count: 12,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "theme",
    name: "Themes",
    description: "Beautiful themes for various platforms",
    count: 9,
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function CategoriesPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Categories
        </h1>
        <p className="text-muted-foreground">
          Browse products by category to find exactly what you need.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md3:grid-cols-2 md2:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/projects?category=${category.id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={300}
                  height={200}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {category.count} items
                  </span>
                </div>
                <p className="mb-4 text-muted-foreground">
                  {category.description}
                </p>
                <Button variant="outline" size="sm" className="gap-1 mt-2">
                  Browse {category.name} <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
