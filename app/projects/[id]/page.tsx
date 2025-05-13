"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Calendar,
  User,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { mockProjects } from "@/lib/mock-data";
import { notFound, useRouter } from "next/navigation";
import RelatedProjects from "@/components/projects/related-projects";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = mockProjects.find((p) => p.id === params.id);
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderRequirements, setOrderRequirements] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const paginatedReviews = project
    ? project.reviewsList.slice(
        (currentPage - 1) * reviewsPerPage,
        currentPage * reviewsPerPage
      )
    : [];

  const totalPages = project
    ? Math.ceil(project.reviewsList.length / reviewsPerPage)
    : 0;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params.id]);

  if (!project) {
    notFound();
  }

  const handleCreateOrder = () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (user.role !== "buyer") {
      toast({
        title: "Seller Account",
        description: "You cannot place orders with a seller account.",
        variant: "destructive",
      });
      return;
    }

    if (!orderRequirements.trim()) {
      toast({
        title: "Missing Requirements",
        description: "Please provide your project requirements.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order Created",
      description: "Your order has been created successfully.",
    });

    router.push("/orders");
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg border bg-background">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={500}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{project.category}</Badge>
              <div className="flex items-center text-yellow-500">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-current"
                      fill={i < project.rating ? "currentColor" : "none"}
                    />
                  ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({project.reviews} reviews)
                </span>
              </div>
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              {project.title}
            </h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <User className="h-4 w-4" />
                <Link
                  href={`/sellers/${encodeURIComponent(project.sellerId)}`}
                  className="hover:underline"
                >
                  {project.seller}
                </Link>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Updated {new Date(project.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold">
              ${project.price.toFixed(2)}
            </div>
            {project.originalPrice && (
              <div className="text-lg text-muted-foreground line-through">
                ${project.originalPrice.toFixed(2)}
              </div>
            )}
          </div>

          <p className="text-muted-foreground">{project.description}</p>

          <div className="flex flex-wrap gap-3">
            {showOrderForm ? (
              <div className="w-full space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold">Create Order</h3>
                <div className="space-y-2">
                  <label htmlFor="requirements" className="text-sm font-medium">
                    Project Requirements
                  </label>
                  <textarea
                    id="requirements"
                    className="outline-none w-full rounded-md border border-input bg-background p-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 "
                    rows={4}
                    placeholder="Describe your project requirements in detail..."
                    value={orderRequirements}
                    onChange={(e) => setOrderRequirements(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreateOrder}>Create Order</Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowOrderForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Button size="lg" onClick={() => setShowOrderForm(true)}>
                  Create Order
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                  onClick={() =>
                    window.open(
                      project.demoUrl || "https://example.com/demo",
                      "_blank"
                    )
                  }
                >
                  <ExternalLink className="h-4 w-4" /> Visit Demo
                </Button>
              </>
            )}
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">This product includes:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {project.includes.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold">About this product</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>{project.longDescription}</p>
              <p>
                This product is designed to help developers build better
                applications faster and with less effort. It includes all the
                necessary components and features to get started quickly.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="features" className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold">Key Features</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6 space-y-6">
            <h3 className="text-xl font-semibold">Customer Reviews</h3>
            <div className="space-y-6">
              {paginatedReviews.map((review, i) => (
                <div key={i} className="space-y-2 border-b pb-4 last:border-0">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{review.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {review.date}
                    </div>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-current"
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
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
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Projects */}
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">
          Related Projects
        </h2>
        <RelatedProjects currentId={project.id} category={project.category} />
      </div>
    </div>
  );
}
