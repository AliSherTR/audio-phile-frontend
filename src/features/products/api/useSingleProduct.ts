import { useQuery } from "@tanstack/react-query";

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
    const fetchProduct = async (): Promise<Product> => {
        const url = new URL(`${API_URL}/${id}`);
        const res = await fetch(url.toString());
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: fetchProduct,
    });

    return {
        data: data?.data,
        isLoading,
        isError,
    };
}
