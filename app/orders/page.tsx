"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowUpRight,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Search,
  Star,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    product: {
      id: "1",
      title: "Modern Dashboard UI Kit",
      image: "/placeholder.svg?height=80&width=120",
      price: 49.99,
    },
    buyer: {
      id: "b1",
      name: "John Buyer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    seller: {
      id: "s1",
      name: "Jane Seller",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "in_progress",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days from now
    requirements:
      "I need a custom dashboard with user analytics and revenue tracking.",
    deliveryFiles: [],
    messages: 3,
    revisions: 0,
  },
  {
    id: "ORD-002",
    product: {
      id: "3",
      title: "React Component Library",
      image: "/placeholder.svg?height=80&width=120",
      price: 39.99,
    },
    buyer: {
      id: "b2",
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    seller: {
      id: "s2",
      name: "React Masters",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "delivered",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    requirements:
      "I need custom data visualization components for my React application.",
    deliveryFiles: [
      {
        id: "f1",
        name: "component-library.zip",
        size: "2.4 MB",
        uploadedAt: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 1
        ).toISOString(),
      },
      {
        id: "f2",
        name: "documentation.pdf",
        size: "1.2 MB",
        uploadedAt: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 1
        ).toISOString(),
      },
    ],
    messages: 8,
    revisions: 1,
  },
  {
    id: "ORD-003",
    product: {
      id: "5",
      title: "Next.js Blog Template",
      image: "/placeholder.svg?height=80&width=120",
      price: 59.99,
    },
    buyer: {
      id: "b3",
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    seller: {
      id: "s3",
      name: "Next Experts",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    requirements:
      "I need a blog template with newsletter integration and SEO optimization.",
    deliveryFiles: [
      {
        id: "f3",
        name: "blog-template.zip",
        size: "3.7 MB",
        uploadedAt: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 4
        ).toISOString(),
      },
    ],
    messages: 5,
    revisions: 0,
  },
  {
    id: "ORD-004",
    product: {
      id: "4",
      title: "Premium Icon Set",
      image: "/placeholder.svg?height=80&width=120",
      price: 29.99,
    },
    buyer: {
      id: "b4",
      name: "Charlie Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    seller: {
      id: "s4",
      name: "Design Studio",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "revision",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days from now
    requirements:
      "I need additional icons in the same style for my application.",
    deliveryFiles: [
      {
        id: "f4",
        name: "icon-set-v1.zip",
        size: "1.8 MB",
        uploadedAt: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 1
        ).toISOString(),
      },
    ],
    messages: 6,
    revisions: 1,
  },
  {
    id: "ORD-005",
    product: {
      id: "2",
      title: "E-commerce Template",
      image: "/placeholder.svg?height=80&width=120",
      price: 79.99,
    },
    buyer: {
      id: "b5",
      name: "David Miller",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    seller: {
      id: "s5",
      name: "John Developer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days from now
    requirements:
      "I need a custom e-commerce template with payment gateway integration.",
    deliveryFiles: [],
    messages: 1,
    revisions: 0,
  },
];

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [deliveryFiles, setDeliveryFiles] = useState<File[]>([]);
  const [currentDeliveryOrderId, setCurrentDeliveryOrderId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user");

    if (!user && !userLocalStorage) {
      router.push("/auth/login");
    }
  }, [user, router]);

  useEffect(() => {
    // Filter orders based on active tab, search query, and status filter
    let filtered = orders;

    // Filter by tab
    if (activeTab !== "all") {
      if (user?.role === "buyer") {
        filtered = filtered.filter((order) => {
          if (activeTab === "active") {
            return ["pending", "in_progress", "revision"].includes(
              order.status
            );
          } else if (activeTab === "delivered") {
            return order.status === "delivered";
          } else if (activeTab === "completed") {
            return order.status === "completed";
          }
          return true;
        });
      } else if (user?.role === "seller") {
        filtered = filtered.filter((order) => {
          if (activeTab === "active") {
            return ["pending", "in_progress", "revision"].includes(
              order.status
            );
          } else if (activeTab === "delivered") {
            return order.status === "delivered";
          } else if (activeTab === "completed") {
            return order.status === "completed";
          }
          return true;
        });
      }
    }

    // Filter by status if specific status is selected
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.product.title.toLowerCase().includes(query) ||
          (user?.role === "buyer" &&
            order.seller.name.toLowerCase().includes(query)) ||
          (user?.role === "seller" &&
            order.buyer.name.toLowerCase().includes(query))
      );
    }

    setFilteredOrders(filtered);
  }, [activeTab, orders, searchQuery, statusFilter, user]);

  const handleAcceptOrder = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "in_progress" } : order
      )
    );
    toast({
      title: "Order Accepted",
      description: "You've accepted the order and can now start working on it.",
    });
  };

  const handleOpenDeliveryModal = (orderId: string) => {
    setCurrentDeliveryOrderId(orderId);
    setDeliveryModalOpen(true);
  };

  const handleSubmitDelivery = () => {
    if (!currentDeliveryOrderId) return;

    const uploadedFiles = deliveryFiles.map((file, index) => ({
      id: `f-${Date.now()}-${index}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      uploadedAt: new Date().toISOString(),
    }));

    setOrders(
      orders.map((order) =>
        order.id === currentDeliveryOrderId
          ? {
              ...order,
              status: "delivered",
              deliveryFiles: uploadedFiles,
            }
          : order
      )
    );

    toast({
      title: "Order Delivered",
      description: "Your delivery has been sent to the buyer for review.",
    });

    // Reset modal state
    setDeliveryModalOpen(false);
    setCurrentDeliveryOrderId(null);
    setDeliveryMessage("");
    setDeliveryFiles([]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setDeliveryFiles(Array.from(event.target.files));
    }
  };

  const handleRequestRevision = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "revision",
              revisions: order.revisions + 1,
            }
          : order
      )
    );
    toast({
      title: "Revision Requested",
      description: "You've requested a revision for this order.",
    });
  };

  const handleAcceptDelivery = (orderId: string) => {
    // Open review modal
    setCurrentOrderId(orderId);
    setReviewModalOpen(true);
  };

  const handleSubmitReview = () => {
    if (!currentOrderId) return;

    // Complete the order
    setOrders(
      orders.map((order) =>
        order.id === currentOrderId ? { ...order, status: "completed" } : order
      )
    );

    // Show success message
    toast({
      title: "Delivery Accepted",
      description:
        "You've accepted the delivery and the order is now complete.",
    });

    // If review was provided, show additional message
    if (reviewText.trim()) {
      toast({
        title: "Review Submitted",
        description: `Thank you for your ${rating}-star review!`,
      });
    }

    // Reset review state
    setReviewModalOpen(false);
    setCurrentOrderId(null);
    setReviewText("");
    setRating(5);
  };

  const handleCloseReviewModal = () => {
    // Complete the order without review
    if (currentOrderId) {
      setOrders(
        orders.map((order) =>
          order.id === currentOrderId
            ? { ...order, status: "completed" }
            : order
        )
      );

      toast({
        title: "Delivery Accepted",
        description:
          "You've accepted the delivery and the order is now complete.",
      });
    }

    // Reset review state
    setReviewModalOpen(false);
    setCurrentOrderId(null);
    setReviewText("");
    setRating(5);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-600">
            <Clock className="h-3 w-3" /> Pending
          </div>
        );
      case "in_progress":
        return (
          <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-600">
            <Clock className="h-3 w-3" /> In Progress
          </div>
        );
      case "delivered":
        return (
          <div className="flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-600">
            <FileText className="h-3 w-3" /> Delivered
          </div>
        );
      case "revision":
        return (
          <div className="flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-600">
            <ArrowUpRight className="h-3 w-3" /> Revision
          </div>
        );
      case "completed":
        return (
          <div className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-600">
            <CheckCircle className="h-3 w-3" /> Completed
          </div>
        );
      case "cancelled":
        return (
          <div className="flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-600">
            <XCircle className="h-3 w-3" /> Cancelled
          </div>
        );
      default:
        return null;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
        Orders
      </h1>
      <p className="mb-8 text-muted-foreground">
        {user.role === "buyer"
          ? "Manage your orders and track their progress"
          : "Manage orders from buyers and deliver your work"}
      </p>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="revision">Revision</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-6">
          <OrdersList
            orders={filteredOrders}
            userRole={user.role}
            onAcceptOrder={handleAcceptOrder}
            onDeliverOrder={handleOpenDeliveryModal}
            onRequestRevision={handleRequestRevision}
            onAcceptDelivery={handleAcceptDelivery}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          <OrdersList
            orders={filteredOrders}
            userRole={user.role}
            onAcceptOrder={handleAcceptOrder}
            onDeliverOrder={handleOpenDeliveryModal}
            onRequestRevision={handleRequestRevision}
            onAcceptDelivery={handleAcceptDelivery}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>

        <TabsContent value="delivered" className="space-y-6">
          <OrdersList
            orders={filteredOrders}
            userRole={user.role}
            onAcceptOrder={handleAcceptOrder}
            onDeliverOrder={handleOpenDeliveryModal}
            onRequestRevision={handleRequestRevision}
            onAcceptDelivery={handleAcceptDelivery}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <OrdersList
            orders={filteredOrders}
            userRole={user.role}
            onAcceptOrder={handleAcceptOrder}
            onDeliverOrder={handleOpenDeliveryModal}
            onRequestRevision={handleRequestRevision}
            onAcceptDelivery={handleAcceptDelivery}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>
      </Tabs>

      {/* Review Modal */}
      <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
            <DialogDescription>
              Share your experience with the seller. This helps other buyers
              make informed decisions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <div className="font-medium">Rating</div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Review</div>
              <Textarea
                placeholder="Share your experience with this seller..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseReviewModal}>
              Skip
            </Button>
            <Button onClick={handleSubmitReview}>Submit Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delivery Modal */}
      <Dialog open={deliveryModalOpen} onOpenChange={setDeliveryModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Deliver Order</DialogTitle>
            <DialogDescription>
              Provide a message and upload files to deliver the order to the
              buyer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <div className="font-medium">Message</div>
              <Textarea
                placeholder="Write a message to the buyer..."
                value={deliveryMessage}
                onChange={(e) => setDeliveryMessage(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <div className="font-medium">Files</div>
              <Input type="file" multiple onChange={handleFileChange} />
              {deliveryFiles.length > 0 && (
                <ul className="mt-2 space-y-1 text-sm">
                  {deliveryFiles.map((file, index) => (
                    <li key={index} className="text-muted-foreground">
                      {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeliveryModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitDelivery}>Deliver</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface OrdersListProps {
  orders: typeof mockOrders;
  userRole: string;
  onAcceptOrder: (orderId: string) => void;
  onDeliverOrder: (orderId: string) => void;
  onRequestRevision: (orderId: string) => void;
  onAcceptDelivery: (orderId: string) => void;
  getStatusBadge: (status: string) => React.ReactNode;
}

function OrdersList({
  orders,
  userRole,
  onAcceptOrder,
  onDeliverOrder,
  onRequestRevision,
  onAcceptDelivery,
  getStatusBadge,
}: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-muted p-6">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No Orders Found</h3>
          <p className="mt-2 text-muted-foreground">
            {userRole === "buyer"
              ? "You haven't placed any orders yet."
              : "You don't have any orders yet."}
          </p>
          {userRole === "buyer" && (
            <Button className="mt-4" asChild>
              <Link href="/projects">Browse Projects</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 md:flex-row">
              {/* Product Image */}
              <div className="h-20 w-30 overflow-hidden rounded-md border">
                <Image
                  src={order.product.image || "/placeholder.svg"}
                  alt={order.product.title}
                  width={120}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Order Details */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{order.product.title}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Order #{order.id} • Placed{" "}
                      {formatDistanceToNow(new Date(order.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                  <div className="text-right font-medium">
                    ${order.product.price.toFixed(2)}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">
                      {userRole === "buyer" ? "Seller:" : "Buyer:"}
                    </div>
                    <div className="flex items-center gap-1">
                      <img
                        src={
                          userRole === "buyer"
                            ? order.seller.avatar
                            : order.buyer.avatar
                        }
                        alt="Avatar"
                        className="h-5 w-5 rounded-full"
                      />
                      <span>
                        {userRole === "buyer"
                          ? order.seller.name
                          : order.buyer.name}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Deadline:</span>{" "}
                    {new Date(order.deadline).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Messages:</span>{" "}
                    {order.messages}
                  </div>
                  {order.revisions > 0 && (
                    <div>
                      <span className="font-medium">Revisions:</span>{" "}
                      {order.revisions}
                    </div>
                  )}
                </div>

                {order.deliveryFiles.length > 0 && (
                  <div className="space-y-2">
                    <div className="font-medium text-sm">Delivery Files:</div>
                    <div className="space-y-2">
                      {order.deliveryFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between rounded-md border p-2"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({file.size})
                            </span>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Link href={`/messages?order=${order.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <MessageSquare className="h-4 w-4" /> Messages
                    </Button>
                  </Link>

                  {userRole === "seller" && order.status === "pending" && (
                    <Button size="sm" onClick={() => onAcceptOrder(order.id)}>
                      Accept Order
                    </Button>
                  )}

                  {userRole === "seller" &&
                    (order.status === "in_progress" ||
                      order.status === "revision") && (
                      <Button
                        size="sm"
                        onClick={() => onDeliverOrder(order.id)}
                      >
                        Deliver Order
                      </Button>
                    )}

                  {userRole === "buyer" && order.status === "delivered" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => onAcceptDelivery(order.id)}
                      >
                        Accept Delivery
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRequestRevision(order.id)}
                      >
                        Request Revision
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
