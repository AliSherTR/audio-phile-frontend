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
import {
    ChevronLeft,
    ChevronRight,
    Trash2,
    Search,
    LoaderCircle,
} from "lucide-react";
import useUsers from "../api/useUsers";

export default function UsersTable() {
    const {
        users,
        totalPages,
        currentPage,
        setPage,
        setSearchTerm,
        isLoading,
        isError,
    } = useUsers();
    const [inputValue, setInputValue] = useState("");

    const handleDelete = (id: number) => {
        console.log(`Delete user ${id}`);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setSearchTerm(value);
    };

    useEffect(() => {
        if (inputValue === "") {
            setSearchTerm("");
        }
    }, [inputValue, setSearchTerm]);

    const renderContent = () => {
        if (isError) {
            return (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-red-500">
                        Something went wrong. Please try again later.
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

        if (!users.length) {
            return (
                <div className="flex-grow flex items-center justify-center">
                    No Users Found
                </div>
            );
        }

        return (
            <>
                <div className="overflow-x-auto">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[10%]">ID</TableHead>
                                <TableHead className="w-[25%]">Name</TableHead>
                                <TableHead className="w-[25%]">Email</TableHead>
                                <TableHead className="w-[25%]">Role</TableHead>
                                <TableHead className="w-[15%]">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-4">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    handleDelete(user.id)
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
                        placeholder="Search by email..."
                        value={inputValue}
                        onChange={handleSearchChange}
                        className="px-8 py-2 w-full block"
                    />
                </div>
            </div>
            {renderContent()}
        </div>
    );
}
