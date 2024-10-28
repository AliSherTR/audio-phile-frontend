import { useUser } from "@/context/UserProvider";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Product {
    data: {
        id: number;
        name: string;
        price: number;
        description: string;
        accessories: string[];
        category: string;
        isFeatured: boolean;
        image: string;
        features: string;
        stock: number;
        isPromoted: boolean;
    };
    status: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/";

export default function useSingleProduct(id: string | string[]) {
    const queryClient = useQueryClient();
    const { user } = useUser();
    const { token } = user;
    const fetchProduct = async (): Promise<Product> => {
        const url = new URL(`${API_URL}/${id}`);
        const res = await fetch(url.toString());
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    };

    const deleteProduct = async (id: string) => {
        const url = new URL(`${API_URL}/${id}`);
        const res = await fetch(url.toString(), {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
    };

    const createProduct = async (data: FormData) => {
        const res = await fetch(`${API_URL}`, {
            method: "POST",
            body: data,
            headers: {
                Authorization: `Bearer ${token}`,
                // Don't set Content-Type header, let the browser set it automatically for FormData
            },
        });
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: fetchProduct,
    });

    const {
        mutate: deleteProductMutation,
        isPending: isDeleting,
        isSuccess: isDeleted,
    } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const {
        mutate: createProductMutation,
        isPending: isCreating,
        isSuccess: isCreated,
    } = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    return {
        data: data?.data,
        isLoading,
        isError,
        isDeleting,
        isDeleted,
        deleteProduct: deleteProductMutation,
        isCreating,
        isCreated,
        createProductMutation,
    };
}
