import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock sellers data
const sellers = [
  {
    id: "1",
    name: "Jane Seller",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "JS",
    bio: "UI/UX designer specializing in dashboard interfaces and design systems.",
    productsCount: 12,
    rating: 4.8,
    joinedDate: "2022-03-15",
  },
  {
    id: "2",
    name: "John Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "JD",
    bio: "Full-stack developer creating high-quality templates and plugins for modern web applications.",
    productsCount: 8,
    rating: 4.6,
    joinedDate: "2022-05-20",
  },
  {
    id: "3",
    name: "React Masters",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "RM",
    bio: "Team of React experts building component libraries and development tools.",
    productsCount: 15,
    rating: 4.7,
    joinedDate: "2021-11-10",
  },
  {
    id: "4",
    name: "Design Studio",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "DS",
    bio: "Creative studio focused on icon sets, illustrations, and UI resources.",
    productsCount: 24,
    rating: 4.9,
    joinedDate: "2021-08-05",
  },
  {
    id: "5",
    name: "Next Experts",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "NE",
    bio: "Specialized in Next.js templates and solutions for modern web applications.",
    productsCount: 10,
    rating: 4.5,
    joinedDate: "2022-01-15",
  },
  {
    id: "6",
    name: "Security Pro",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "SP",
    bio: "Cybersecurity expert creating secure authentication systems and security tools.",
    productsCount: 6,
    rating: 4.7,
    joinedDate: "2022-04-20",
  },
]

export default function SellersPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Top Sellers</h1>
        <p className="text-muted-foreground">Discover our most trusted and highest-rated sellers.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sellers.map((seller) => (
          <Card key={seller.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
                  <AvatarFallback>{seller.initials}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold mb-1">{seller.name}</h2>
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(seller.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300 fill-gray-300"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({seller.rating})</span>
                </div>
                <p className="text-muted-foreground mb-4">{seller.bio}</p>
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {seller.productsCount} Products
                  </div>
                  <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                    Member since {new Date(seller.joinedDate).getFullYear()}
                  </div>
                </div>
                <Link href={`/sellers/${seller.id}`} className="w-full">
                  <Button variant="outline" size="sm" className="w-full gap-1">
                    View Profile <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
