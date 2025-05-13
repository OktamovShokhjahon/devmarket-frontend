import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockProjects } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Mail, Briefcase, Award } from "lucide-react"
import Link from "next/link"
import ProductCard from "@/components/projects/product-card"
import { notFound } from "next/navigation"

// Mock sellers data (same as in sellers/page.tsx)
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
    location: "New York, USA",
    website: "https://janedesigner.com",
    email: "jane@example.com",
    workHistory: [
      {
        title: "Senior UI Designer",
        company: "Design Agency Inc.",
        period: "2020 - Present",
        description: "Leading UI design for enterprise clients and creating design systems.",
      },
      {
        title: "UI/UX Designer",
        company: "Tech Startup",
        period: "2018 - 2020",
        description: "Designed user interfaces for mobile and web applications.",
      },
      {
        title: "Freelance Designer",
        company: "Self-employed",
        period: "2016 - 2018",
        description: "Worked with various clients on branding and web design projects.",
      },
    ],
    portfolio: [
      {
        title: "E-commerce Redesign",
        image: "/placeholder.svg?height=200&width=300",
        description: "Complete redesign of an e-commerce platform focusing on conversion optimization.",
      },
      {
        title: "Finance Dashboard",
        image: "/placeholder.svg?height=200&width=300",
        description: "Data visualization dashboard for financial analytics.",
      },
      {
        title: "Mobile App Design",
        image: "/placeholder.svg?height=200&width=300",
        description: "UI/UX design for a fitness tracking mobile application.",
      },
    ],
    skills: ["UI Design", "UX Research", "Design Systems", "Figma", "Adobe XD", "Prototyping"],
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
    location: "San Francisco, USA",
    website: "https://johndeveloper.com",
    email: "john@example.com",
    workHistory: [
      {
        title: "Senior Developer",
        company: "Tech Solutions Ltd.",
        period: "2019 - Present",
        description: "Building scalable web applications using React and Node.js.",
      },
      {
        title: "Web Developer",
        company: "Digital Agency",
        period: "2017 - 2019",
        description: "Developed websites and web applications for various clients.",
      },
    ],
    portfolio: [
      {
        title: "E-commerce Platform",
        image: "/placeholder.svg?height=200&width=300",
        description: "Full-stack e-commerce solution with payment processing and inventory management.",
      },
      {
        title: "CMS Template",
        image: "/placeholder.svg?height=200&width=300",
        description: "Customizable content management system template.",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB", "AWS"],
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
    location: "Berlin, Germany",
    website: "https://reactmasters.dev",
    email: "team@reactmasters.dev",
    workHistory: [
      {
        title: "Agency Founded",
        company: "React Masters",
        period: "2021 - Present",
        description: "Established specialized React development agency.",
      },
    ],
    portfolio: [
      {
        title: "Component Library",
        image: "/placeholder.svg?height=200&width=300",
        description: "Comprehensive React component library with TypeScript support.",
      },
      {
        title: "Admin Dashboard",
        image: "/placeholder.svg?height=200&width=300",
        description: "Customizable admin dashboard template with data visualization.",
      },
    ],
    skills: ["React", "Redux", "Next.js", "TypeScript", "Styled Components", "Testing"],
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
    location: "London, UK",
    website: "https://designstudio.co",
    email: "hello@designstudio.co",
    workHistory: [
      {
        title: "Studio Founded",
        company: "Design Studio",
        period: "2021 - Present",
        description: "Established design studio specializing in digital assets.",
      },
    ],
    portfolio: [
      {
        title: "Icon Collection",
        image: "/placeholder.svg?height=200&width=300",
        description: "Collection of over 1000 vector icons for web and mobile applications.",
      },
      {
        title: "Illustration Pack",
        image: "/placeholder.svg?height=200&width=300",
        description: "Set of custom illustrations for websites and applications.",
      },
    ],
    skills: ["Illustration", "Icon Design", "UI Design", "Branding", "Adobe Illustrator", "Figma"],
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
    location: "Toronto, Canada",
    website: "https://nextexperts.dev",
    email: "info@nextexperts.dev",
    workHistory: [
      {
        title: "Agency Founded",
        company: "Next Experts",
        period: "2022 - Present",
        description: "Established specialized Next.js development agency.",
      },
    ],
    portfolio: [
      {
        title: "E-commerce Template",
        image: "/placeholder.svg?height=200&width=300",
        description: "Next.js e-commerce template with Stripe integration.",
      },
      {
        title: "Blog Template",
        image: "/placeholder.svg?height=200&width=300",
        description: "SEO-optimized blog template with content management.",
      },
    ],
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Headless CMS"],
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
    location: "Sydney, Australia",
    website: "https://securitypro.dev",
    email: "contact@securitypro.dev",
    workHistory: [
      {
        title: "Security Consultant",
        company: "Enterprise Security Inc.",
        period: "2018 - Present",
        description: "Providing security consulting and developing security solutions.",
      },
      {
        title: "Security Engineer",
        company: "Tech Corporation",
        period: "2015 - 2018",
        description: "Implemented security measures and conducted security audits.",
      },
    ],
    portfolio: [
      {
        title: "Authentication System",
        image: "/placeholder.svg?height=200&width=300",
        description: "Secure authentication system with multi-factor authentication.",
      },
      {
        title: "Security Audit Tool",
        image: "/placeholder.svg?height=200&width=300",
        description: "Tool for conducting security audits of web applications.",
      },
    ],
    skills: ["Cybersecurity", "Authentication", "OAuth", "JWT", "Security Auditing", "Node.js"],
  },
]

export default function SellerProfilePage({ params }: { params: { id: string } }) {
  const seller = sellers.find((s) => s.id === params.id)

  if (!seller) {
    notFound()
  }

  // Get products by this seller
  const sellerProducts = mockProjects.filter((p) => p.seller === seller.name)

  // Get all reviews from all products by this seller
  const sellerReviews = sellerProducts.flatMap((product) => product.reviewsList)

  return (
    <div className="container py-8 md:py-12">
      <Link
        href="/sellers"
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Sellers
      </Link>

      <div className="mb-8 grid gap-8 md:grid-cols-[250px_1fr]">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-32 w-32 mb-4">
            <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
            <AvatarFallback className="text-3xl">{seller.initials}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-1">{seller.name}</h1>
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
          <Button variant="outline" className="gap-2 mb-4">
            <Mail className="h-4 w-4" /> Contact Seller
          </Button>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>Member since {formatDate(seller.joinedDate)}</div>
            <div>{seller.location}</div>
            <div>
              <a
                href={seller.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {seller.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          </div>

          <div className="mt-6 w-full">
            <h3 className="text-sm font-medium mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {seller.skills.map((skill, index) => (
                <span key={index} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">About {seller.name}</h2>
              <p className="text-muted-foreground mb-6">{seller.bio}</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold">{sellerProducts.length}</div>
                  <div className="text-sm text-muted-foreground">Products</div>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold">{seller.rating}</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold">
                    {Math.floor(
                      (new Date().getTime() - new Date(seller.joinedDate).getTime()) / (1000 * 60 * 60 * 24 * 30),
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">Months</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Work History Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Briefcase className="h-5 w-5" /> Work History
        </h2>
        <div className="space-y-6">
          {seller.workHistory.map((work, index) => (
            <div key={index} className="rounded-lg border p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-lg font-semibold">{work.title}</h3>
                <span className="text-sm text-muted-foreground">{work.period}</span>
              </div>
              <div className="text-md font-medium mb-2">{work.company}</div>
              <p className="text-muted-foreground">{work.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Award className="h-5 w-5" /> Portfolio
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {seller.portfolio.map((item, index) => (
            <div key={index} className="rounded-lg border overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sellerProducts.length > 0 ? (
            sellerProducts.map((product) => (
              <Link key={product.id} href={`/projects/${product.id}`} scroll={true}>
                <ProductCard product={product} />
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">This seller has no products yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <div className="space-y-6">
          {sellerReviews.length > 0 ? (
            sellerReviews.map((review, i) => (
              <div key={i} className="rounded-lg border p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{review.date}</div>
                </div>
                <div className="flex items-center text-yellow-500">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 rounded-lg border">
              <p className="text-muted-foreground">No reviews yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
