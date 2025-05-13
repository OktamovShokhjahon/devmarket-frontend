"use client";

import { SelectItem } from "@/components/ui/select";

import { SelectContent } from "@/components/ui/select";

import { SelectValue } from "@/components/ui/select";

import { SelectTrigger } from "@/components/ui/select";

import { Select } from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  Users,
  ShoppingBag,
  DollarSign,
  BarChart3,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mockProjects } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const mockUsers = [
  {
    id: "1",
    name: "John Buyer",
    email: "buyer@example.com",
    role: "buyer",
    status: "active",
    joinDate: "2023-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Jane Seller",
    email: "seller@example.com",
    role: "seller",
    status: "active",
    joinDate: "2023-02-20T00:00:00Z",
  },
  {
    id: "3",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "buyer",
    status: "inactive",
    joinDate: "2023-03-10T00:00:00Z",
  },
  {
    id: "4",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "seller",
    status: "pending",
    joinDate: "2023-04-05T00:00:00Z",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "buyer",
    status: "active",
    joinDate: "2023-05-12T00:00:00Z",
  },
];

const pendingProducts = mockProjects.slice(0, 3).map((product) => ({
  ...product,
  status: "pending",
  submittedDate: "2023-05-01T00:00:00Z",
}));

const mockTransactions = [
  {
    id: "t1",
    type: "purchase",
    user: "John Buyer",
    product: "Modern Dashboard UI Kit",
    amount: 49.99,
    date: "2023-05-15T00:00:00Z",
  },
  {
    id: "t2",
    type: "sale",
    user: "Jane Seller",
    product: "Analytics Dashboard Template",
    amount: 69.99,
    date: "2023-05-10T00:00:00Z",
  },
  {
    id: "t3",
    type: "purchase",
    user: "Alice Johnson",
    product: "E-commerce Template",
    amount: 79.99,
    date: "2023-04-20T00:00:00Z",
  },
  {
    id: "t4",
    type: "sale",
    user: "Charlie Brown",
    product: "Mobile App UI Kit",
    amount: 89.99,
    date: "2023-04-15T00:00:00Z",
  },
];

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [products, setProducts] = useState(pendingProducts);

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");

    if (!user && !localStorageUser) {
      router.push("/auth/login");
    } else if (user && user.role !== "admin") {
      router.push(`/${user.role}-dashboard`);
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleApproveProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
    toast({
      title: "Product Approved",
      description: "The product has been approved and published.",
    });
  };

  const handleRejectProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
    toast({
      title: "Product Rejected",
      description: "The product has been rejected.",
    });
  };

  const handleUserStatusChange = (id: string, newStatus: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
    toast({
      title: "User Status Updated",
      description: `User status has been updated to ${newStatus}.`,
    });
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const totalProducts = mockProjects.length;
  const totalRevenue = 12580.75;

  return (
    <div className="container py-8 md:py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
        Admin Dashboard
      </h1>
      <p className="mb-8 text-muted-foreground">
        Manage users, products, and platform settings
      </p>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Users
              </p>
              <h3 className="text-2xl font-bold">{totalUsers}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-3">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Products
              </p>
              <h3 className="text-2xl font-bold">{totalProducts}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-3">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </p>
              <h3 className="text-2xl font-bold">${totalRevenue.toFixed(2)}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-3">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Users
              </p>
              <h3 className="text-2xl font-bold">{activeUsers}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-8">
        <TabsList className="flex flex-wrap gap-2 md:flex-nowrap md:overflow-x-auto md:whitespace-nowrap">
          <TabsTrigger value="products" className="flex-1 md:flex-none">
            Product Moderation
          </TabsTrigger>
          <TabsTrigger value="users" className="flex-1 md:flex-none">
            User Management
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1 md:flex-none">
            Platform Settings
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex-1 md:flex-none">
            Transactions History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Products</CardTitle>
              <CardDescription>
                Review and approve product submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Check className="mb-2 h-10 w-10 text-green-500" />
                  <h3 className="text-lg font-medium">All caught up!</h3>
                  <p className="text-muted-foreground">
                    There are no pending products to review.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-start"
                    >
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{product.title}</h3>
                          <Badge variant="outline">{product.category}</Badge>
                          <Badge variant="secondary">
                            ${product.price.toFixed(2)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {product.description.substring(0, 150)}...
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Submitted by{" "}
                          <span className="font-medium">{product.seller}</span>{" "}
                          on {formatDate(product.submittedDate)}
                        </div>
                      </div>
                      <div className="flex gap-2 sm:flex-col">
                        <Button
                          size="sm"
                          className="gap-1"
                          onClick={() => handleApproveProduct(product.id)}
                        >
                          <Check className="h-4 w-4" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="gap-1"
                          onClick={() => handleRejectProduct(product.id)}
                        >
                          <X className="h-4 w-4" /> Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="capitalize">{user.role}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "active"
                              ? "success"
                              : user.status === "pending"
                              ? "warning"
                              : "destructive"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.joinDate)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {user.status !== "active" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 gap-1"
                              onClick={() =>
                                handleUserStatusChange(user.id, "active")
                              }
                            >
                              <Check className="h-3 w-3" /> Activate
                            </Button>
                          )}
                          {user.status !== "inactive" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 gap-1"
                              onClick={() =>
                                handleUserStatusChange(user.id, "inactive")
                              }
                            >
                              <X className="h-3 w-3" /> Deactivate
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>
                Configure global platform settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">General Settings</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platform Name</label>
                    <Input defaultValue="DevMarket" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Support Email</label>
                    <Input defaultValue="support@devmarket.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Commission Rate (%)
                    </label>
                    <Input type="number" defaultValue="10" min="0" max="100" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Minimum Withdrawal
                    </label>
                    <Input type="number" defaultValue="50" min="0" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Moderation Settings</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Auto-approve Products
                    </label>
                    <Select defaultValue="no">
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Auto-approve Users
                    </label>
                    <Select defaultValue="yes">
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transactions History</CardTitle>
              <CardDescription>
                View all transactions that occurred on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.id}
                      </TableCell>
                      <TableCell className="capitalize">
                        {transaction.type}
                      </TableCell>
                      <TableCell>{transaction.user}</TableCell>
                      <TableCell>{transaction.product}</TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
