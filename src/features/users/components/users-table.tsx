"use client";

import React, { useState, useEffect } from "react";
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
import { ChevronLeft, ChevronRight, Trash2, Search } from "lucide-react";

// Mock data (assuming you have this defined elsewhere)
const items = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: "example@email.com",
}));

export default function UsersTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState(items);
    const itemsPerPage = 10;

    useEffect(() => {
        const results = items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(results);
        setCurrentPage(1);
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, endIndex);

    const nextPage = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    const handleDelete = (id: number) => {
        console.log(`Delete item ${id}`);
    };

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
                            <TableHead className="w-[15%]">Email</TableHead>

                            <TableHead className="w-[15%]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>

                                <TableCell>
                                    <div className="flex space-x-4">
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
                    Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-4">
                    <Button
                        variant="outline"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>
                    <Button
                        variant="outline"
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
