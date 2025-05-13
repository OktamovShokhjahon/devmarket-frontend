"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/context/auth-context"
import { ArrowRight, CreditCard, Plus, Save, Trash2, Upload } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "1",
      type: "card",
      name: "Visa ending in 4242",
      expiry: "12/24",
      default: true,
    },
  ])

  // New payment method state
  const [showAddPayment, setShowAddPayment] = useState(false)
  const [newPayment, setNewPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  })

  // Seller profile state
  const [sellerProfile, setSellerProfile] = useState({
    name: "Jane Seller",
    email: "seller@example.com",
    bio: "UI/UX designer specializing in dashboard interfaces and design systems.",
    location: "New York, USA",
    website: "https://janedesigner.com",
    skills: ["UI Design", "UX Research", "Design Systems", "Figma", "Adobe XD", "Prototyping"],
    hourlyRate: "65",
    availability: "part-time",
    languages: ["English", "Spanish"],
  })

  // New skill state
  const [newSkill, setNewSkill] = useState("")

  // Work history state
  const [workHistory, setWorkHistory] = useState([
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
  ])

  // New work history item
  const [newWorkItem, setNewWorkItem] = useState({
    title: "",
    company: "",
    period: "",
    description: "",
  })

  // Portfolio state
  const [portfolio, setPortfolio] = useState([
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
  ])

  // New portfolio item
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: "",
    image: "/placeholder.svg?height=200&width=300",
    description: "",
  })

  // Wallet state
  const [wallet, setWallet] = useState({
    balance: 1250.75,
    pendingBalance: 450.0,
    transactions: [
      {
        id: "tx1",
        date: "2023-06-15T10:30:00Z",
        type: "sale",
        description: "Sale: Modern Dashboard UI Kit",
        amount: 49.99,
      },
      {
        id: "tx2",
        date: "2023-06-10T14:20:00Z",
        type: "withdrawal",
        description: "Withdrawal to Bank Account",
        amount: -200.0,
      },
      {
        id: "tx3",
        date: "2023-06-05T09:15:00Z",
        type: "sale",
        description: "Sale: E-commerce Template",
        amount: 79.99,
      },
      {
        id: "tx4",
        date: "2023-05-28T16:45:00Z",
        type: "sale",
        description: "Sale: Analytics Dashboard Template",
        amount: 69.99,
      },
      {
        id: "tx5",
        date: "2023-05-20T11:30:00Z",
        type: "withdrawal",
        description: "Withdrawal to PayPal",
        amount: -150.0,
      },
    ],
  })

  // Deposit state
  const [depositAmount, setDepositAmount] = useState("")
  const [showDepositForm, setShowDepositForm] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    }

    // Set active tab from URL if present
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [user, router, searchParams])

  if (!user) {
    return null
  }

  const handleAddPaymentMethod = () => {
    // Validate form
    if (!newPayment.cardNumber || !newPayment.cardName || !newPayment.expiry || !newPayment.cvc) {
      toast({
        title: "Missing Information",
        description: "Please fill in all card details.",
        variant: "destructive",
      })
      return
    }

    // Add new payment method
    const newMethod = {
      id: `card-${Date.now()}`,
      type: "card",
      name: `Card ending in ${newPayment.cardNumber.slice(-4)}`,
      expiry: newPayment.expiry,
      default: paymentMethods.length === 0,
    }

    setPaymentMethods([...paymentMethods, newMethod])
    setNewPayment({
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvc: "",
    })
    setShowAddPayment(false)

    toast({
      title: "Payment Method Added",
      description: "Your new payment method has been added successfully.",
    })
  }

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
    toast({
      title: "Payment Method Removed",
      description: "Your payment method has been removed.",
    })
  }

  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        default: method.id === id,
      })),
    )
    toast({
      title: "Default Payment Method Updated",
      description: "Your default payment method has been updated.",
    })
  }

  const handleDeposit = () => {
    const amount = Number.parseFloat(depositAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount.",
        variant: "destructive",
      })
      return
    }

    // Update wallet balance
    setWallet({
      ...wallet,
      balance: wallet.balance + amount,
      transactions: [
        {
          id: `tx-${Date.now()}`,
          date: new Date().toISOString(),
          type: "deposit",
          description: "Deposit to Wallet",
          amount: amount,
        },
        ...wallet.transactions,
      ],
    })

    setDepositAmount("")
    setShowDepositForm(false)

    toast({
      title: "Deposit Successful",
      description: `$${amount.toFixed(2)} has been added to your wallet.`,
    })
  }

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSellerProfile({
        ...sellerProfile,
        skills: [...sellerProfile.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (index: number) => {
    setSellerProfile({
      ...sellerProfile,
      skills: sellerProfile.skills.filter((_, i) => i !== index),
    })
  }

  const handleAddWorkHistory = () => {
    if (newWorkItem.title && newWorkItem.company) {
      setWorkHistory([...workHistory, newWorkItem])
      setNewWorkItem({
        title: "",
        company: "",
        period: "",
        description: "",
      })
    }
  }

  const handleRemoveWorkHistory = (index: number) => {
    setWorkHistory(workHistory.filter((_, i) => i !== index))
  }

  const handleAddPortfolio = () => {
    if (newPortfolioItem.title) {
      setPortfolio([...portfolio, newPortfolioItem])
      setNewPortfolioItem({
        title: "",
        image: "/placeholder.svg?height=200&width=300",
        description: "",
      })
    }
  }

  const handleRemovePortfolio = (index: number) => {
    setPortfolio(portfolio.filter((_, i) => i !== index))
  }

  const handleSaveSellerProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your seller profile has been updated successfully.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12 2xl:max-w-7xl">
      <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Profile Settings</h1>
      <p className="mb-8 text-muted-foreground">Manage your account settings and preferences</p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 gap-1 p-1 md:grid-cols-3 lg:grid-cols-6 bg-muted/50 rounded-lg overflow-x-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          {user.role === "seller" && <TabsTrigger value="seller-profile">Seller Profile</TabsTrigger>}
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center relative overflow-hidden">
                  <img
                    src="/placeholder.svg?height=128&width=128"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary" className="gap-1">
                      <Upload className="h-4 w-4" /> Change
                    </Button>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} readOnly />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter your phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="City, Country" />
                    </div>
                  </div>
                  {user.role !== "buyer" && (
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" placeholder="Tell us about yourself" className="min-h-[100px]" />
                    </div>
                  )}
                  {user.role !== "buyer" && (
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" placeholder="https://yourwebsite.com" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">
                    Secure your account with two-factor authentication
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {paymentMethods.length === 0 ? (
                <div className="text-center py-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <CreditCard className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Payment Methods</h3>
                  <p className="text-muted-foreground mb-4">You haven&apos;t added any payment methods yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="rounded-md bg-muted p-2">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Expires {method.expiry}
                            {method.default && (
                              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!method.default && (
                          <Button variant="outline" size="sm" onClick={() => handleSetDefaultPaymentMethod(method.id)}>
                            Set Default
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => handleRemovePaymentMethod(method.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showAddPayment ? (
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium">Add Payment Method</h3>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={newPayment.cardNumber}
                          onChange={(e) => setNewPayment({ ...newPayment, cardNumber: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Name on Card</Label>
                        <Input
                          id="card-name"
                          placeholder="John Doe"
                          value={newPayment.cardName}
                          onChange={(e) => setNewPayment({ ...newPayment, cardName: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="card-expiry">Expiry Date</Label>
                        <Input
                          id="card-expiry"
                          placeholder="MM/YY"
                          value={newPayment.expiry}
                          onChange={(e) => setNewPayment({ ...newPayment, expiry: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-cvc">CVC</Label>
                        <Input
                          id="card-cvc"
                          placeholder="123"
                          value={newPayment.cvc}
                          onChange={(e) => setNewPayment({ ...newPayment, cvc: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowAddPayment(false)
                          setNewPayment({
                            cardNumber: "",
                            cardName: "",
                            expiry: "",
                            cvc: "",
                          })
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddPaymentMethod}>Add Payment Method</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <Button variant="outline" className="gap-2" onClick={() => setShowAddPayment(true)}>
                  <Plus className="h-4 w-4" /> Add Payment Method
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your billing details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="billing-name">Name</Label>
                  <Input id="billing-name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-address">Address</Label>
                  <Textarea id="billing-address" placeholder="Enter your billing address" />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="billing-city">City</Label>
                    <Input id="billing-city" placeholder="City" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billing-state">State / Province</Label>
                    <Input id="billing-state" placeholder="State" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billing-zip">ZIP / Postal Code</Label>
                    <Input id="billing-zip" placeholder="ZIP" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-country">Country</Label>
                  <Select>
                    <SelectTrigger id="billing-country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Billing Information</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive email notifications about your account activity
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Order Updates</div>
                    <div className="text-sm text-muted-foreground">Receive notifications about your orders</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Marketing Emails</div>
                    <div className="text-sm text-muted-foreground">
                      Receive emails about new products and promotions
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">New Message Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive notifications when you get new messages</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Balance</CardTitle>
              <CardDescription>Manage your wallet and transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground mb-1">Available Balance</div>
                  <div className="text-3xl font-bold">${wallet.balance.toFixed(2)}</div>
                </div>
                {user.role === "seller" && (
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground mb-1">Pending Balance</div>
                    <div className="text-3xl font-bold">${wallet.pendingBalance.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Funds that will be available after order completion
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {user.role === "buyer" && (
                  <Button variant="outline" className="gap-2" onClick={() => setShowDepositForm(true)}>
                    <Plus className="h-4 w-4" /> Deposit Funds
                  </Button>
                )}
                {user.role === "seller" && (
                  <Button variant="outline" className="gap-2" onClick={() => router.push("/seller-dashboard/withdraw")}>
                    <ArrowRight className="h-4 w-4" /> Withdraw Funds
                  </Button>
                )}
              </div>

              {showDepositForm && (
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium">Deposit Funds</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="deposit-amount">Amount</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                        <Input
                          id="deposit-amount"
                          className="pl-7"
                          placeholder="0.00"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deposit-method">Payment Method</Label>
                      <Select defaultValue={paymentMethods[0]?.id}>
                        <SelectTrigger id="deposit-method">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethods.map((method) => (
                            <SelectItem key={method.id} value={method.id}>
                              {method.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowDepositForm(false)
                          setDepositAmount("")
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleDeposit}>Deposit</Button>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-medium mb-4">Transaction History</h3>
                <div className="space-y-4">
                  {wallet.transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()} at{" "}
                          {new Date(transaction.date).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {user.role === "seller" && (
          <TabsContent value="seller-profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seller Profile</CardTitle>
                <CardDescription>Manage your public seller profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seller-bio">Professional Bio</Label>
                    <Textarea
                      id="seller-bio"
                      rows={4}
                      value={sellerProfile.bio}
                      onChange={(e) => setSellerProfile({ ...sellerProfile, bio: e.target.value })}
                      placeholder="Tell potential buyers about yourself and your expertise"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="seller-location">Location</Label>
                      <Input
                        id="seller-location"
                        placeholder="City, Country"
                        value={sellerProfile.location}
                        onChange={(e) => setSellerProfile({ ...sellerProfile, location: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seller-website">Website</Label>
                      <Input
                        id="seller-website"
                        placeholder="https://yourwebsite.com"
                        value={sellerProfile.website}
                        onChange={(e) => setSellerProfile({ ...sellerProfile, website: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="seller-rate">Hourly Rate ($)</Label>
                      <Input
                        id="seller-rate"
                        type="number"
                        value={sellerProfile.hourlyRate}
                        onChange={(e) => setSellerProfile({ ...sellerProfile, hourlyRate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seller-availability">Availability</Label>
                      <Select
                        value={sellerProfile.availability}
                        onValueChange={(value) => setSellerProfile({ ...sellerProfile, availability: value })}
                      >
                        <SelectTrigger id="seller-availability">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="not-available">Not Available</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {sellerProfile.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary flex items-center gap-1"
                      >
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(index)}
                          className="ml-1 rounded-full hover:bg-primary/20 h-4 w-4 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                    />
                    <Button onClick={handleAddSkill}>Add</Button>
                  </div>
                </div>

                {/* Work History */}
                <div className="space-y-4">
                  <Label>Work History</Label>
                  {workHistory.map((work, index) => (
                    <div key={index} className="rounded-lg border p-4 relative">
                      <button
                        onClick={() => handleRemoveWorkHistory(index)}
                        className="absolute top-2 right-2 rounded-full hover:bg-muted h-6 w-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label className="text-sm text-muted-foreground">Title</Label>
                          <div className="font-medium">{work.title}</div>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Period</Label>
                          <div className="font-medium">{work.period}</div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Label className="text-sm text-muted-foreground">Company</Label>
                        <div className="font-medium">{work.company}</div>
                      </div>
                      <div className="mt-2">
                        <Label className="text-sm text-muted-foreground">Description</Label>
                        <div className="text-sm text-muted-foreground">{work.description}</div>
                      </div>
                    </div>
                  ))}

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-4">Add New Work Experience</h3>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="work-title">Title</Label>
                          <Input
                            id="work-title"
                            placeholder="Job Title"
                            value={newWorkItem.title}
                            onChange={(e) => setNewWorkItem({ ...newWorkItem, title: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="work-period">Period</Label>
                          <Input
                            id="work-period"
                            placeholder="2020 - Present"
                            value={newWorkItem.period}
                            onChange={(e) => setNewWorkItem({ ...newWorkItem, period: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="work-company">Company</Label>
                        <Input
                          id="work-company"
                          placeholder="Company Name"
                          value={newWorkItem.company}
                          onChange={(e) => setNewWorkItem({ ...newWorkItem, company: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="work-description">Description</Label>
                        <Textarea
                          id="work-description"
                          placeholder="Describe your responsibilities and achievements"
                          value={newWorkItem.description}
                          onChange={(e) => setNewWorkItem({ ...newWorkItem, description: e.target.value })}
                        />
                      </div>
                      <Button onClick={handleAddWorkHistory} className="gap-1">
                        <Plus className="h-4 w-4" /> Add Work Experience
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Portfolio */}
                <div className="space-y-4">
                  <Label>Portfolio</Label>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {portfolio.map((item, index) => (
                      <div key={index} className="rounded-lg border overflow-hidden relative group">
                        <button
                          onClick={() => handleRemovePortfolio(index)}
                          className="absolute top-2 right-2 rounded-full bg-background/80 hover:bg-background h-6 w-6 flex items-center justify-center z-10"
                        >
                          ×
                        </button>
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}

                    <div className="rounded-lg border border-dashed p-6 flex flex-col items-center justify-center text-center">
                      <div className="mb-4 rounded-full bg-muted/50 p-3">
                        <Plus className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium mb-2">Add Portfolio Item</h3>
                      <p className="text-sm text-muted-foreground mb-4">Showcase your work to potential buyers</p>
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("portfolio-dialog")?.showModal()}
                      >
                        Add Item
                      </Button>
                    </div>
                  </div>

                  {/* Portfolio Dialog */}
                  <dialog
                    id="portfolio-dialog"
                    className="modal p-6 rounded-lg border shadow-lg bg-background max-w-md w-full"
                  >
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Add Portfolio Item</h3>
                      <div className="space-y-2">
                        <Label htmlFor="portfolio-title">Title</Label>
                        <Input
                          id="portfolio-title"
                          placeholder="Project Title"
                          value={newPortfolioItem.title}
                          onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="portfolio-image">Image</Label>
                        <div className="border rounded-md p-4 text-center">
                          <div className="aspect-video overflow-hidden mb-4 bg-muted flex items-center justify-center">
                            <img
                              src={newPortfolioItem.image || "/placeholder.svg"}
                              alt="Preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Upload className="h-4 w-4" /> Upload Image
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="portfolio-description">Description</Label>
                        <Textarea
                          id="portfolio-description"
                          placeholder="Describe your project"
                          value={newPortfolioItem.description}
                          onChange={(e) =>
                            setNewPortfolioItem({
                              ...newPortfolioItem,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => document.getElementById("portfolio-dialog")?.close()}>
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            handleAddPortfolio()
                            document.getElementById("portfolio-dialog")?.close()
                          }}
                        >
                          Add Item
                        </Button>
                      </div>
                    </div>
                  </dialog>
                </div>

                <div className="flex justify-end">
                  <Button size="lg" onClick={handleSaveSellerProfile} className="gap-2">
                    <Save className="h-4 w-4" /> Save Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
