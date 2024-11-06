import { useUser } from "@/context/UserProvider";
import { useToast } from "@/hooks/use-toast";

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
    const { toast } = useToast();
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
        error,
    } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            toast({
                title: "Created Product",
                description: "Product Created Successfully",
            });

            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: "Failed to create product. Please try again.",
                variant: "destructive",
            });
            console.error("Error creating product:", error);
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
        createProductError: error,
    };
}
