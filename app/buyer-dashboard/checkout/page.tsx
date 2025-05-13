"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, Car, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function BuyerCheckoutPage() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [useWallet, setUseWallet] = useState(false);
  const [walletBalance] = useState(100); // Mock wallet balance

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    } else if (user.role !== "buyer") {
      router.push(`/${user.role}-dashboard`);
    }

    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [user, router, cart]);

  if (!user || cart.length === 0) {
    return null;
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      toast({
        title: "Order Completed",
        description: "Your order has been successfully placed!",
      });
      router.push("/buyer-dashboard");
    }, 1500);
  };

  return (
    <div className="container py-8 md:py-12">
      <Link
        href="/buyer-dashboard"
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
        Checkout
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Billing Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>
                    Enter your billing details below
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        placeholder="John"
                        defaultValue={user.name?.split(" ")[0] || ""}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        placeholder="Doe"
                        defaultValue={user.name?.split(" ")[1] || ""}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      defaultValue={user.email}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St" required />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="NY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="10001" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>Choose your payment method</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="credit-card"
                        name="payment-method"
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                        checked={paymentMethod === "credit-card"}
                        onChange={() => setPaymentMethod("credit-card")}
                      />
                      <Label
                        htmlFor="credit-card"
                        className="flex items-center gap-2"
                      >
                        <CreditCard className="h-4 w-4" /> Credit Card
                      </Label>
                    </div>

                    {paymentMethod === "credit-card" && (
                      <div className="space-y-4 rounded-md border p-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="4242 4242 4242 4242"
                            required
                          />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                          <div className="space-y-2">
                            <Label htmlFor="expiry-month">Expiry Month</Label>
                            <Select defaultValue="01">
                              <SelectTrigger id="expiry-month">
                                <SelectValue placeholder="Month" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 12 }, (_, i) => {
                                  const month = (i + 1)
                                    .toString()
                                    .padStart(2, "0");
                                  return (
                                    <SelectItem key={month} value={month}>
                                      {month}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expiry-year">Expiry Year</Label>
                            <Select defaultValue="2024">
                              <SelectTrigger id="expiry-year">
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 10 }, (_, i) => {
                                  const year = (2024 + i).toString();
                                  return (
                                    <SelectItem key={year} value={year}>
                                      {year}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="paypal"
                        name="payment-method"
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                      />
                      <Label
                        htmlFor="paypal"
                        className="flex items-center gap-2"
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.067 7.301C19.567 10.12 17.794 14.263 14.244 14.263H12.506L11.511 20.4H8.506L8.673 19.301H6.667L7.662 13.164H9.668L9.501 14.263H11.239C13.789 14.263 15.128 11.326 15.461 9.6H10.673L9.678 15.736H7.673L9.662 3.6H17.673C18.673 3.6 19.673 4.2 20.067 5.1C20.233 5.7 20.233 6.5 20.067 7.301Z"
                            fill="#00457C"
                          />
                          <path
                            d="M4.5 9.6H9.288C9.622 7.874 8.283 4.937 5.733 4.937H3.995L2 20.4H4.005L4.839 15.736H6.844L7.839 9.6H5.833L5.666 10.699H4.5V9.6Z"
                            fill="#0079C1"
                          />
                        </svg>
                        PayPal
                      </Label>
                    </div>

                    {walletBalance > 0 && (
                      <div className="mt-4 rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="use-wallet"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              checked={useWallet}
                              onChange={(e) => setUseWallet(e.target.checked)}
                            />
                            <Label htmlFor="use-wallet">
                              Use Wallet Balance
                            </Label>
                          </div>
                          <div className="text-sm font-medium">
                            Available: {formatPrice(walletBalance)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Processing..."
                      : `Pay ${formatPrice(total)}`}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                {cart.length} {cart.length === 1 ? "item" : "items"} in your
                cart
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div>{formatPrice(item.price * item.quantity)}</div>
                </div>
              ))}
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                {useWallet && walletBalance > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Wallet Credit</span>
                    <span>-{formatPrice(Math.min(walletBalance, total))}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    {useWallet
                      ? formatPrice(Math.max(0, total - walletBalance))
                      : formatPrice(total)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
