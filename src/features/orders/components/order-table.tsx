"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

// Sample data for the orders
const allOrders = [
    {
        id: "ORD001",
        date: "2023-06-01",
        time: "14:30",
        status: "Delivered",
        amount: 150.0,
    },
    {
        id: "ORD002",
        date: "2023-06-02",
        time: "10:15",
        status: "Pending",
        amount: 75.5,
    },
    {
        id: "ORD003",
        date: "2023-06-03",
        time: "16:45",
        status: "Canceled",
        amount: 200.0,
    },
    {
        id: "ORD004",
        date: "2023-06-04",
        time: "09:00",
        status: "Delivered",
        amount: 120.75,
    },
    {
        id: "ORD005",
        date: "2023-06-05",
        time: "11:30",
        status: "Pending",
        amount: 90.25,
    },
    {
        id: "ORD006",
        date: "2023-06-06",
        time: "13:00",
        status: "Delivered",
        amount: 180.5,
    },
    {
        id: "ORD007",
        date: "2023-06-07",
        time: "15:45",
        status: "Pending",
        amount: 95.0,
    },
    {
        id: "ORD008",
        date: "2023-06-08",
        time: "10:30",
        status: "Canceled",
        amount: 220.25,
    },
    {
        id: "ORD009",
        date: "2023-06-09",
        time: "14:15",
        status: "Delivered",
        amount: 130.0,
    },
    {
        id: "ORD010",
        date: "2023-06-10",
        time: "11:00",
        status: "Pending",
        amount: 85.75,
    },
];

export default function OrderTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const ordersPerPage = 5;

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "delivered":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "canceled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const filteredOrders = allOrders.filter((order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(
        indexOfFirstOrder,
        indexOfLastOrder
    );

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Order Table</h1>
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Search by Order ID"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="max-w-sm"
                />
            </div>
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.time}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={`${getStatusColor(
                                            order.status
                                        )} font-semibold`}
                                    >
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    ${order.amount.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4 mr-1" />
                                            View
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Pencil className="h-4 w-4 mr-1" />
                                            Update
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                    Showing {indexOfFirstOrder + 1} to{" "}
                    {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
                    {filteredOrders.length} orders
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
