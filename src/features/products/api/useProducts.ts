"use client";
import { useCallback, useEffect, useState } from "react";

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    category: string;
}

export default function useProducts() {
    const [products, setProducts] = useState<Product[]>();
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState<number>();
    const [isMounted, setIsMounted] = useState(false); // Check if component is mounted

    const getProducts = useCallback(async () => {
        try {
            const res = await fetch(
                `http://localhost:8000?page=${page}&limit=${itemsPerPage}`
            );
            const data = await res.json();

            setProducts(data.data);
            setTotalPages(data.meta.totalPages);
        } catch (error) {
            console.log(error);
        }
    }, [page, itemsPerPage]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            getProducts();
        }
    }, [page, itemsPerPage, getProducts, isMounted]);

    return { products, setPage, setItemsPerPage, totalPages, page };
}
