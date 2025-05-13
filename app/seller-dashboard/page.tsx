"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Plus, Trash2, BarChart3, DollarSign, ShoppingCart, Users, User, Wallet } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { mockProjects, mockSales } from "@/lib/mock-data"
import { formatDate, formatPrice } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function SellerDashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState<any>(null)
  const [sellerProducts, setSellerProducts] = useState<any[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    } else if (user.role !== "seller") {
      router.push(`/${user.role}-dashboard`)
    }

    // Filter products for this seller
    const products = mockProjects.filter((p) => p.seller === "Jane Seller")
    setSellerProducts(products)
  }, [user, router])

  if (!user) {
    return null
  }

  const handleDeleteProduct = () => {
    // Simulate API call
    setTimeout(() => {
      // Remove product from local state
      setSellerProducts(sellerProducts.filter((p) => p.id !== productToDelete))

      toast({
        title: "Product Deleted",
        description: "The product has been successfully deleted.",
      })
      setIsDeleteDialogOpen(false)
      setProductToDelete(null)
    }, 500)
  }

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    setTimeout(() => {
      // Update product in local state
      setSellerProducts(sellerProducts.map((p) => (p.id === productToEdit.id ? productToEdit : p)))

      toast({
        title: "Product Updated",
        description: "Your product has been successfully updated.",
      })
      setIsEditDialogOpen(false)
      setProductToEdit(null)
    }, 500)
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Product Added",
        description: "Your new product has been successfully added.",
      })
    }, 500)
  }

  // Calculate total revenue
  const totalRevenue = mockSales.reduce((total, sale) => total + sale.amount, 0)

  // Calculate total sales
  const totalSales = mockSales.length

  // Calculate total products
  const totalProducts = sellerProducts.length

  return (
    <div className="container py-8 md:py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Seller Dashboard</h1>
      <p className="mb-8 text-muted-foreground">Manage your products and track your sales</p>

      {/* Quick Actions */}
      <div className="mb-8 flex flex-wrap gap-4">
        <Link href="/seller-dashboard/profile">
          <Button variant="outline" className="gap-2">
            <User className="h-4 w-4" /> Edit Profile
          </Button>
        </Link>
        <Link href="/seller-dashboard/withdraw">
          <Button variant="outline" className="gap-2">
            <Wallet className="h-4 w-4" /> Withdraw Funds
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-3">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold">{formatPrice(totalRevenue)}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-3">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
              <h3 className="text-2xl font-bold">{totalSales}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-3">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Products</p>
              <h3 className="text-2xl font-bold">{totalProducts}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Customers</p>
              <h3 className="text-2xl font-bold">42</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-8">
        <TabsList>
          <TabsTrigger value="products">My Products</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Your Products</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <form onSubmit={handleAddProduct}>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>Fill in the details for your new digital product.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Product Title</Label>
                      <Input id="title" placeholder="Enter product title" required />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input id="price" type="number" min="0" step="0.01" placeholder="29.99" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select defaultValue="template">
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="template">Template</SelectItem>
                            <SelectItem value="ui-kit">UI Kit</SelectItem>
                            <SelectItem value="plugin">Plugin</SelectItem>
                            <SelectItem value="icon-set">Icon Set</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Enter product description" rows={4} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="file">Product File</Label>
                      <Input id="file" type="file" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Product</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sellerProducts.map((product) => (
              <Card key={product.id}>
                <CardHeader className="p-4">
                  <div className="aspect-video overflow-hidden rounded-md border">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={300}
                      height={200}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">{product.title}</h3>
                    <div className="font-medium text-primary">${product.price.toFixed(2)}</div>
                  </div>
                  <div className="mb-4 text-sm text-muted-foreground">{product.description.substring(0, 100)}...</div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => {
                        setProductToEdit(product)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="gap-1"
                      onClick={() => {
                        setProductToDelete(product.id)
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>View your recent sales and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 overflow-hidden rounded-md border">
                            <Image
                              src={sale.product.image || "/placeholder.svg"}
                              alt={sale.product.title}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="font-medium">{sale.product.title}</div>
                        </div>
                      </TableCell>
                      <TableCell>{sale.customer}</TableCell>
                      <TableCell>{formatDate(sale.date)}</TableCell>
                      <TableCell className="text-right">{formatPrice(sale.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>View your sales performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-lg border bg-muted/40 flex items-center justify-center">
                <p className="text-muted-foreground">Sales chart will be displayed here</p>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium text-muted-foreground">Total Revenue</div>
                  <div className="mt-1 text-2xl font-bold">{formatPrice(totalRevenue)}</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium text-muted-foreground">Average Order Value</div>
                  <div className="mt-1 text-2xl font-bold">{formatPrice(totalRevenue / totalSales)}</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium text-muted-foreground">Conversion Rate</div>
                  <div className="mt-1 text-2xl font-bold">4.2%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          {productToEdit && (
            <form onSubmit={handleEditProduct}>
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>Update the details for your product.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Product Title</Label>
                  <Input
                    id="edit-title"
                    value={productToEdit.title}
                    onChange={(e) => setProductToEdit({ ...productToEdit, title: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-price">Price ($)</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={productToEdit.price}
                      onChange={(e) => setProductToEdit({ ...productToEdit, price: Number.parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-category">Category</Label>
                    <Select
                      value={productToEdit.category.toLowerCase()}
                      onValueChange={(value) => setProductToEdit({ ...productToEdit, category: value })}
                    >
                      <SelectTrigger id="edit-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="template">Template</SelectItem>
                        <SelectItem value="ui-kit">UI Kit</SelectItem>
                        <SelectItem value="plugin">Plugin</SelectItem>
                        <SelectItem value="icon-set">Icon Set</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={productToEdit.description}
                    onChange={(e) => setProductToEdit({ ...productToEdit, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-file">Product File</Label>
                  <Input id="edit-file" type="file" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
