"use client";

import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import debounce from "lodash/debounce";

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    category: string;
}

interface ProductsResponse {
    data: Product[];
    meta: {
        totalPages: number;
        currentPage: number;
        totalItems: number;
        pageSize: number;
    };
}

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/products";

export default function useProducts() {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchProducts = async ({
        queryKey,
    }: QueryFunctionContext<
        [string, number, number, string]
    >): Promise<ProductsResponse> => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, page, itemsPerPage, search] = queryKey;
        const url = new URL(API_URL);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("limit", itemsPerPage.toString());
        if (search) url.searchParams.append("search", search);

        const res = await fetch(url.toString());
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    };

    const { data, isLoading, isError } = useQuery<
        ProductsResponse,
        Error,
        ProductsResponse,
        [string, number, number, string]
    >({
        queryKey: ["products", page, itemsPerPage, searchTerm],
        queryFn: fetchProducts,
    });

    const debouncedSetSearchTerm = useCallback(
        debounce((value: string) => setSearchTerm(value), 300),
        []
    );

    return {
        products: data?.data ?? [],
        totalPages: data?.meta.totalPages ?? 0,
        currentPage: data?.meta.currentPage ?? 1,
        totalItems: data?.meta.totalItems ?? 0,
        pageSize: data?.meta.pageSize ?? itemsPerPage,
        setPage,
        setItemsPerPage,
        setSearchTerm: debouncedSetSearchTerm,
        isLoading,
        isError,
    };
}
