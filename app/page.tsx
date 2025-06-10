import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Compass, Zap } from "lucide-react"
import Link from "next/link"
import FeaturedProducts from "@/components/home/featured-products"
import Testimonials from "@/components/home/testimonials"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background pt-16 md:pt-24">
        <div className="container flex flex-col items-center gap-4 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              The Digital Marketplace for <span className="text-primary">Developers</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Buy and sell high-quality digital products created by developers for developers. Templates, plugins, UI
              kits, and more.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/projects">
              <Button size="lg" className="gap-1">
                Browse Products <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/register?type=seller">
              <Button size="lg" variant="outline">
                Become a Seller
              </Button>
            </Link>
          </div>
          <div className="mt-8 w-full max-w-5xl overflow-hidden rounded-lg border shadow-xl h-[60vh]">
            <Image
              src="/placeholder.svg?height=600&width=1200"
              width={1200}
              height={600}
              alt="DevMarket Platform Preview"
              className="w-full"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose DevMarket?</h2>
          <p className="max-w-[85%] text-muted-foreground">
            Our platform offers the best experience for both buyers and sellers of digital products.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 text-center shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Quality Products</h3>
            <p className="text-muted-foreground">All products are reviewed to ensure they meet our high standards.</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 text-center shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Fast Delivery</h3>
            <p className="text-muted-foreground">Instant downloads after purchase with secure payment processing.</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 text-center shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Compass className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Seller Support</h3>
            <p className="text-muted-foreground">Tools and analytics to help you grow your digital product business.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tighter">Featured Products</h2>
          <Link href="/projects">
            <Button variant="ghost" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <FeaturedProducts />
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-12">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter">What Our Users Say</h2>
          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <div className="rounded-lg bg-primary/10 px-6 py-12 text-center md:px-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter">Ready to Get Started?</h2>
          <p className="mx-auto mb-6 max-w-[600px] text-muted-foreground">
            Join thousands of developers and designers who are already using DevMarket to buy and sell digital products.
          </p>
          <div className="flex flex-col gap-2 justify-center sm:flex-row">
            <Link href="/auth/register">
              <Button size="lg">Create an Account</Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
