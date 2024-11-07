"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
    Eye,
    Pencil,
    Trash2,
    Search,
    LoaderCircle,
} from "lucide-react";
import useProducts from "../api/useProducts";
import useSingleProduct from "../api/useSingleProduct";
import DeleteProductModal from "./product-delete-modal";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import ProductForm from "./product-form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditProduct from "./update-product";

export default function ProductsTable() {
    const {
        products,
        totalPages,
        currentPage,
        setPage,
        setSearchTerm,
        isLoading,
        isError,
        productFetchError,
    } = useProducts();

    const { isDeleting } = useSingleProduct("");

    const [inputValue, setInputValue] = useState("");

    const handleEdit = (id: number) => {
        console.log(`Edit item ${id}`);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setSearchTerm(value);
    };

    const renderContent = () => {
        if (isError) {
            return (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-red-500">
                        {productFetchError?.message ??
                            "Something went wrong. Please try again later."}
                    </p>
                </div>
            );
        }

        if (isLoading) {
            return (
                <div className="flex-grow flex items-center justify-center">
                    <LoaderCircle className="animate-spin" />
                </div>
            );
        }

        if (isDeleting) {
            return (
                <div className="flex-grow flex items-center justify-center">
                    <LoaderCircle className="animate-spin" />
                </div>
            );
        }
        if (!products.length) {
            return (
                <div className="flex-grow flex items-center justify-center">
                    No Products Found
                </div>
            );
        }

        return (
            <>
                <div className="overflow-x-auto">
                    <div></div>
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[10%]">ID</TableHead>
                                <TableHead className="w-[25%]">Name</TableHead>
                                <TableHead className="w-[15%]">Price</TableHead>
                                <TableHead className="w-[15%]">Stock</TableHead>
                                <TableHead className="w-[20%]">
                                    Category
                                </TableHead>
                                <TableHead className="w-[15%]">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>${item.price}</TableCell>
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-4">
                                            <Link
                                                href={`/dashboard/products/${item.id}`}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            handleEdit(item.id)
                                                        }
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>

                                                <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[1200px]">
                                                    <DialogTitle className="text-2xl font-bold mb-6">
                                                        Update Product
                                                    </DialogTitle>
                                                    <ScrollArea className="h-[80vh] pr-4">
                                                        <EditProduct
                                                            product={item}
                                                        />
                                                    </ScrollArea>
                                                </DialogContent>
                                            </Dialog>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline">
                                                        <Trash2 className="h4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <DeleteProductModal
                                                    id={JSON.stringify(item.id)}
                                                />
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div>
                        Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            onClick={() => setPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="w-full space-y-6 flex flex-col min-h-screen">
            <div className="flex w-full items-center justify-between mb-10">
                <div className="relative w-64">
                    <Search
                        size={22}
                        className="absolute left-2 top-[0.5rem] text-gray-500"
                    />
                    <Input
                        type="text"
                        placeholder="Search by name..."
                        value={inputValue}
                        onChange={handleSearchChange}
                        className="px-8 py-2 w-full block"
                    />
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Add Product</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[1200px]">
                            <DialogTitle className="text-2xl font-bold mb-6">
                                Add New Product
                            </DialogTitle>
                            <ScrollArea className="h-[80vh] pr-4">
                                <ProductForm />
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            {renderContent()}
        </div>
    );
}
