"use client";

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ChevronLeft,
    ChevronRight,
    Eye,
    Pencil,
    Trash2,
    Search,
} from "lucide-react";
import useProducts from "../api/useProducts";

export default function ProductsTable() {
    const { products, totalPages, page, setPage } = useProducts();
    console.log(products);
    const [searchTerm, setSearchTerm] = useState("");

    const handleView = (id: number) => {
        console.log(`View item ${id}`);
    };

    const handleEdit = (id: number) => {
        console.log(`Edit item ${id}`);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete item ${id}`);
    };

    if (!products?.length)
        return (
            <div className="min-h-screen flex items-center justify-center">
                No Products Found
            </div>
        );

    return (
        <div className="w-full space-y-6">
            <div className="flex w-full items-center mb-10">
                <div className="relative w-64">
                    <Search
                        size={22}
                        className="absolute left-2  top-[0.5rem]   text-gray-500"
                    />
                    <Input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-8 py-2 w-full block"
                    />
                </div>
            </div>
            <div className="">
                <Table className=" w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[10%]">ID</TableHead>
                            <TableHead className="w-[25%]">Name</TableHead>
                            <TableHead className="w-[15%]">Price</TableHead>
                            <TableHead className="w-[15%]">Stock</TableHead>
                            <TableHead className="w-[20%]">Category</TableHead>
                            <TableHead className="w-[15%]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products &&
                            products.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>${item.price}</TableCell>
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-4">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    handleView(item.id)
                                                }
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    handleEdit(item.id)
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div>
                    Page {page} of {totalPages}
                </div>
                <div className="flex items-center space-x-4">
                    <Button
                        variant="outline"
                        onClick={() => setPage(() => page - 1)}
                        disabled={page === 1}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setPage(() => page + 1)}
                        disabled={page === totalPages}
                    >
                        Next <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
