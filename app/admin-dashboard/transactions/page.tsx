"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/auth-context";
import { ArrowLeft, Download, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const mockTransactions = [
  {
    id: "tx1",
    date: "2023-06-15T10:30:00Z",
    type: "sale",
    description: "Sale: Modern Dashboard UI Kit",
    buyer: "John Buyer",
    seller: "Jane Seller",
    amount: 49.99,
    status: "completed",
    fee: 5.0,
  },
  {
    id: "tx2",
    date: "2023-06-10T14:20:00Z",
    type: "withdrawal",
    description: "Withdrawal to Bank Account",
    buyer: "",
    seller: "Jane Seller",
    amount: 200.0,
    status: "completed",
    fee: 2.5,
  },
  {
    id: "tx3",
    date: "2023-06-05T09:15:00Z",
    type: "sale",
    description: "Sale: E-commerce Template",
    buyer: "Alice Johnson",
    seller: "John Developer",
    amount: 79.99,
    status: "completed",
    fee: 8.0,
  },
  {
    id: "tx4",
    date: "2023-05-28T16:45:00Z",
    type: "sale",
    description: "Sale: Analytics Dashboard Template",
    buyer: "Bob Smith",
    seller: "Jane Seller",
    amount: 69.99,
    status: "completed",
    fee: 7.0,
  },
  {
    id: "tx5",
    date: "2023-05-20T11:30:00Z",
    type: "withdrawal",
    description: "Withdrawal to PayPal",
    buyer: "",
    seller: "John Developer",
    amount: 150.0,
    status: "completed",
    fee: 1.75,
  },
  {
    id: "tx6",
    date: "2023-05-15T13:10:00Z",
    type: "deposit",
    description: "Deposit to Wallet",
    buyer: "Charlie Brown",
    seller: "",
    amount: 100.0,
    status: "completed",
    fee: 0,
  },
  {
    id: "tx7",
    date: "2023-05-10T09:45:00Z",
    type: "sale",
    description: "Sale: Premium Icon Set",
    buyer: "David Miller",
    seller: "Design Studio",
    amount: 29.99,
    status: "completed",
    fee: 3.0,
  },
  {
    id: "tx8",
    date: "2023-05-05T15:30:00Z",
    type: "refund",
    description: "Refund: Mobile App UI Kit",
    buyer: "Emma Wilson",
    seller: "Mobile Design Studio",
    amount: 89.99,
    status: "completed",
    fee: -9.0,
  },
  {
    id: "tx9",
    date: "2023-05-01T10:15:00Z",
    type: "sale",
    description: "Sale: Next.js Blog Template",
    buyer: "Frank Johnson",
    seller: "Next Experts",
    amount: 59.99,
    status: "completed",
    fee: 6.0,
  },
  {
    id: "tx10",
    date: "2023-04-25T14:20:00Z",
    type: "sale",
    description: "Sale: Authentication System",
    buyer: "Grace Lee",
    seller: "Security Pro",
    amount: 69.99,
    status: "completed",
    fee: 7.0,
  },
  {
    id: "tx11",
    date: "2023-04-20T11:30:00Z",
    type: "withdrawal",
    description: "Withdrawal to Bank Account",
    buyer: "",
    seller: "Next Experts",
    amount: 200.0,
    status: "pending",
    fee: 2.5,
  },
  {
    id: "tx12",
    date: "2023-04-15T09:45:00Z",
    type: "sale",
    description: "Sale: Tailwind CSS Components",
    buyer: "Henry Davis",
    seller: "Tailwind Masters",
    amount: 39.99,
    status: "completed",
    fee: 4.0,
  },
  {
    id: "tx13",
    date: "2023-04-10T16:30:00Z",
    type: "dispute",
    description: "Dispute: Landing Page Builder",
    buyer: "Ivy Martinez",
    seller: "Web Tools Inc",
    amount: 79.99,
    status: "pending",
    fee: 0,
  },
  {
    id: "tx14",
    date: "2023-04-05T13:15:00Z",
    type: "deposit",
    description: "Deposit to Wallet",
    buyer: "Jack Wilson",
    seller: "",
    amount: 200.0,
    status: "completed",
    fee: 0,
  },
  {
    id: "tx15",
    date: "2023-04-01T10:30:00Z",
    type: "sale",
    description: "Sale: React Component Library",
    buyer: "Kelly Brown",
    seller: "React Masters",
    amount: 39.99,
    status: "completed",
    fee: 4.0,
  },
];

export default function AdminTransactionsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState(mockTransactions);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    status: "all",
    dateFrom: "",
    dateTo: "",
  });

  const totalSales = transactions
    .filter((tx) => tx.type === "sale")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalFees = transactions.reduce((sum, tx) => sum + tx.fee, 0);

  const totalWithdrawals = transactions
    .filter((tx) => tx.type === "withdrawal")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalDeposits = transactions
    .filter((tx) => tx.type === "deposit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    } else if (user.role !== "admin") {
      router.push(`/${user.role}-dashboard`);
    }
  }, [user, router]);

  useEffect(() => {
    let result = transactions;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (tx) =>
          tx.description.toLowerCase().includes(searchLower) ||
          tx.buyer.toLowerCase().includes(searchLower) ||
          tx.seller.toLowerCase().includes(searchLower) ||
          tx.id.toLowerCase().includes(searchLower)
      );
    }

    if (filters.type !== "all") {
      result = result.filter((tx) => tx.type === filters.type);
    }

    if (filters.status !== "all") {
      result = result.filter((tx) => tx.status === filters.status);
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      result = result.filter((tx) => new Date(tx.date) >= fromDate);
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      result = result.filter((tx) => new Date(tx.date) <= toDate);
    }

    setFilteredTransactions(result);
  }, [filters, transactions]);

  if (!user) {
    return null;
  }

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Date",
      "Type",
      "Description",
      "Buyer",
      "Seller",
      "Amount",
      "Fee",
      "Status",
    ];
    const csvRows = [
      headers.join(","),
      ...filteredTransactions.map((tx) =>
        [
          tx.id,
          new Date(tx.date).toISOString().split("T")[0],
          tx.type,
          `"${tx.description}"`,
          `"${tx.buyer}"`,
          `"${tx.seller}"`,
          tx.amount.toFixed(2),
          tx.fee.toFixed(2),
          tx.status,
        ].join(",")
      ),
    ];
    const csvContent = csvRows.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `transactions-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container py-8 md:py-12">
      <Link
        href="/admin"
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
        Transaction History
      </h1>
      <p className="mb-8 text-muted-foreground">
        View and manage all platform transactions
      </p>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Total Sales
            </div>
            <div className="mt-1 text-2xl font-bold">
              ${totalSales.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Platform Fees
            </div>
            <div className="mt-1 text-2xl font-bold">
              ${totalFees.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Total Withdrawals
            </div>
            <div className="mt-1 text-2xl font-bold">
              ${totalWithdrawals.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Total Deposits
            </div>
            <div className="mt-1 text-2xl font-bold">
              ${totalDeposits.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View all transactions on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-8"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <div>
                  <Label htmlFor="filter-type" className="sr-only">
                    Type
                  </Label>
                  <Select
                    value={filters.type}
                    onValueChange={(value) =>
                      setFilters({ ...filters, type: value })
                    }
                  >
                    <SelectTrigger id="filter-type">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="sale">Sales</SelectItem>
                      <SelectItem value="withdrawal">Withdrawals</SelectItem>
                      <SelectItem value="deposit">Deposits</SelectItem>
                      <SelectItem value="refund">Refunds</SelectItem>
                      <SelectItem value="dispute">Disputes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="filter-status" className="sr-only">
                    Status
                  </Label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) =>
                      setFilters({ ...filters, status: value })
                    }
                  >
                    <SelectTrigger id="filter-status">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <div className="grid grid-cols-2 gap-4 md:w-1/2">
                <div>
                  <Label htmlFor="date-from">From Date</Label>
                  <Input
                    id="date-from"
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) =>
                      setFilters({ ...filters, dateFrom: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="date-to">To Date</Label>
                  <Input
                    id="date-to"
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) =>
                      setFilters({ ...filters, dateTo: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex items-end md:ml-auto">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleExportCSV}
                >
                  <Download className="h-4 w-4" /> Export CSV
                </Button>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Fee</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-6 text-muted-foreground"
                    >
                      No transactions found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                        <div className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleTimeString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="capitalize">{transaction.type}</div>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        {transaction.buyer || (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {transaction.seller || (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${transaction.fee.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : transaction.status === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {transaction.status}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
