"use client";
import React from "react";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useSingleProduct from "../api/useSingleProduct";
import { useToast } from "@/hooks/use-toast";

interface Props {
    id: string;
}
export default function DeleteProductModal({ id }: Props) {
    const { deleteProduct } = useSingleProduct("");
    const { toast } = useToast();
    const handleDelete = (id: string) => {
        deleteProduct(id);
    };
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the product data from the server.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={() => {
                        toast({
                            title: "Product deleted",
                            description: "Successfully deleted the product",
                        });

                        handleDelete(id);
                    }}
                    className=" bg-red-500"
                >
                    Continue
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
}
