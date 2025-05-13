"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/context/auth-context"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, CreditCard, DollarSign, Wallet, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function WithdrawPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [balance, setBalance] = useState(1250.75)
  const [amount, setAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("bank")
  const [isProcessing, setIsProcessing] = useState(false)
  const [bankAccount, setBankAccount] = useState({
    accountName: "Jane Seller",
    accountNumber: "****4567",
    bankName: "Chase Bank",
    routingNumber: "****1234",
  })
  const [paypalEmail, setPaypalEmail] = useState("seller@example.com")

  const [transactions, setTransactions] = useState([
    {
      id: "w1",
      type: "withdrawal",
      amount: 500,
      method: "Bank Transfer",
      status: "completed",
      date: "2023-05-15T00:00:00Z",
    },
    {
      id: "e1",
      type: "earning",
      amount: 129.99,
      productName: "Modern Dashboard UI Kit",
      status: "completed",
      date: "2023-05-10T00:00:00Z",
    },
    {
      id: "e2",
      type: "earning",
      amount: 79.99,
      productName: "E-commerce Template",
      status: "completed",
      date: "2023-05-05T00:00:00Z",
    },
  ])

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    } else if (user.role !== "seller") {
      router.push(`/${user.role}-dashboard`)
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleWithdraw = () => {
    const withdrawAmount = Number.parseFloat(amount)

    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount.",
        variant: "destructive",
      })
      return
    }

    if (withdrawAmount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "Your withdrawal amount exceeds your available balance.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      // Update balance
      setBalance((prevBalance) => prevBalance - withdrawAmount)

      // Add transaction
      const newTransaction = {
        id: `w${Math.floor(Math.random() * 1000)}`,
        type: "withdrawal",
        amount: withdrawAmount,
        method: withdrawMethod === "bank" ? "Bank Transfer" : "PayPal",
        status: "pending",
        date: new Date().toISOString(),
      }

      setTransactions([newTransaction, ...transactions])

      // Reset form
      setAmount("")

      toast({
        title: "Withdrawal Initiated",
        description: `Your withdrawal of $${withdrawAmount.toFixed(2)} has been initiated and is being processed.`,
      })

      setIsProcessing(false)
    }, 1500)
  }

  return (
    <div className="container py-8 md:py-12">
      <Link
        href="/seller-dashboard"
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Withdraw Funds</h1>
      <p className="mb-8 text-muted-foreground">Withdraw your earnings to your bank account or PayPal</p>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Withdraw Funds</CardTitle>
              <CardDescription>Enter the amount you want to withdraw</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    step="0.01"
                    className="pl-8"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <p className="text-sm text-muted-foreground">Minimum withdrawal amount: $50.00</p>
              </div>

              <div className="space-y-2">
                <Label>Withdrawal Method</Label>
                <RadioGroup value={withdrawMethod} onValueChange={setWithdrawMethod} className="space-y-4">
                  <div className="flex items-start space-x-3 rounded-md border p-4">
                    <RadioGroupItem value="bank" id="bank" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="bank" className="flex items-center gap-2 font-medium">
                        <CreditCard className="h-4 w-4" /> Bank Account
                      </Label>
                      {withdrawMethod === "bank" && (
                        <div className="mt-3 space-y-3">
                          <div className="rounded-md bg-muted p-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Account Name:</span>
                                <div>{bankAccount.accountName}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Account Number:</span>
                                <div>{bankAccount.accountNumber}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Bank Name:</span>
                                <div>{bankAccount.bankName}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Routing Number:</span>
                                <div>{bankAccount.routingNumber}</div>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            Update Bank Details
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 rounded-md border p-4">
                    <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="paypal" className="flex items-center gap-2 font-medium">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                      {withdrawMethod === "paypal" && (
                        <div className="mt-3 space-y-3">
                          <div className="rounded-md bg-muted p-3">
                            <div className="text-sm">
                              <span className="text-muted-foreground">PayPal Email:</span>
                              <div>{paypalEmail}</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            Update PayPal Email
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Processing Time</AlertTitle>
                <AlertDescription>
                  Withdrawals typically take 1-3 business days to process. Bank transfers may take an additional 2-5
                  business days to appear in your account.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleWithdraw}
                disabled={
                  isProcessing || !amount || Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > balance
                }
                className="w-full"
                size="lg"
              >
                {isProcessing ? "Processing..." : "Withdraw Funds"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View your recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-full p-2 ${
                          transaction.type === "withdrawal"
                            ? "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
                            : "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                        }`}
                      >
                        {transaction.type === "withdrawal" ? (
                          <Wallet className="h-5 w-5" />
                        ) : (
                          <DollarSign className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {transaction.type === "withdrawal"
                            ? `Withdrawal (${transaction.method})`
                            : `Sale: ${transaction.productName}`}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(transaction.date)} •
                          <span
                            className={`ml-1 ${
                              transaction.status === "completed"
                                ? "text-green-600 dark:text-green-400"
                                : "text-orange-600 dark:text-orange-400"
                            }`}
                          >
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`font-medium ${
                        transaction.type === "withdrawal"
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {transaction.type === "withdrawal" ? "-" : "+"}${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Balance Summary</CardTitle>
              <CardDescription>Your current balance and pending withdrawals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Available Balance</div>
                  <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pending Withdrawals</span>
                  <span>
                    $
                    {transactions
                      .filter((t) => t.type === "withdrawal" && t.status === "pending")
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Withdrawn (This Month)</span>
                  <span>
                    $
                    {transactions
                      .filter((t) => t.type === "withdrawal" && t.status === "completed")
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Earnings (This Month)</span>
                  <span>
                    $
                    {transactions
                      .filter((t) => t.type === "earning")
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD - US Dollar</SelectItem>
                    <SelectItem value="eur">EUR - Euro</SelectItem>
                    <SelectItem value="gbp">GBP - British Pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
