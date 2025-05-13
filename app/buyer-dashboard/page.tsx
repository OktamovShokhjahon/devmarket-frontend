"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { mockPurchases } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import { downloadDemoFile } from "@/lib/demo-file"

export default function BuyerDashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    } else if (user.role !== "buyer") {
      router.push(`/${user.role}-dashboard`)
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Buyer Dashboard</h1>
      <p className="mb-8 text-muted-foreground">Manage your purchases and downloads</p>

      <Tabs defaultValue="purchases" className="space-y-8">
        <TabsList>
          <TabsTrigger value="purchases">My Purchases</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="purchases" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockPurchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader className="p-4">
                  <div className="aspect-video overflow-hidden rounded-md border">
                    <Image
                      src={purchase.product.image || "/placeholder.svg"}
                      alt={purchase.product.title}
                      width={300}
                      height={200}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">{purchase.product.title}</h3>
                    <div className="text-sm text-muted-foreground">{formatDate(purchase.purchaseDate)}</div>
                  </div>
                  <div className="mb-4 text-sm text-muted-foreground">
                    {purchase.product.description.substring(0, 100)}...
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="gap-1" onClick={() => downloadDemoFile(purchase.product.title)}>
                      <Download className="h-4 w-4" /> Download
                    </Button>
                    <Link href={`/projects/${purchase.product.id}`}>
                      <Button size="sm" variant="outline" className="gap-1">
                        <ExternalLink className="h-4 w-4" /> View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="downloads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Downloads</CardTitle>
              <CardDescription>Access and download your purchased products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPurchases.map((purchase) => (
                  <div key={purchase.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 overflow-hidden rounded-md border">
                        <Image
                          src={purchase.product.image || "/placeholder.svg"}
                          alt={purchase.product.title}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{purchase.product.title}</div>
                        <div className="text-sm text-muted-foreground">
                          Purchased on {formatDate(purchase.purchaseDate)}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="gap-1" onClick={() => downloadDemoFile(purchase.product.title)}>
                      <Download className="h-4 w-4" /> Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm font-medium">Name</div>
                  <div className="rounded-md border p-2">{user.name || "John Buyer"}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <div className="rounded-md border p-2">{user.email || "buyer@example.com"}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Account Type</div>
                  <div className="rounded-md border p-2 capitalize">{user.role}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Member Since</div>
                  <div className="rounded-md border p-2">{formatDate(new Date().toISOString())}</div>
                </div>
              </div>
              <Button className="mt-4">Edit Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
