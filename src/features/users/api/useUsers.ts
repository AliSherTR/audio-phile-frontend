"use client";

import { useUser } from "@/context/UserProvider";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface UserResponse {
    status: string;
    data: User[];
    meta: {
        totalPages: number;
        currentPage: number;
        totalItems: number;
        pageSize: number;
    };
}

export default function useUsers() {
    const API_URL = "http://localhost:8000/all-users";
    const { user } = useUser();
    const { token } = user;
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async ({
        queryKey,
    }: QueryFunctionContext<
        [string, number, number, string]
    >): Promise<UserResponse> => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, page, itemsPerPage, searchTerm] = queryKey;
        const url = new URL(API_URL);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("limit", itemsPerPage.toString());
        if (searchTerm) {
            url.searchParams.append("search", searchTerm);
        }

        const res = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    };

    const { data, isLoading, isError } = useQuery<
        UserResponse,
        Error,
        UserResponse,
        [string, number, number, string]
    >({
        queryKey: ["Users", page, itemsPerPage, searchTerm],
        queryFn: fetchUsers,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSetSearchTerm = useCallback(
        debounce((value: string) => setSearchTerm(value), 300),
        []
    );

    return {
        data,
        page,
        setPage,
        itemsPerPage,
        setItemsPerPage,
        users: data?.data || [],
        isLoading,
        isError,
        totalPages: data?.meta.totalPages,
        currentPage: data?.meta.currentPage ?? 1,
        searchTerm,
        setSearchTerm: debouncedSetSearchTerm,
    };
}
