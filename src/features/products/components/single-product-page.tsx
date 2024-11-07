"use client";
import { useParams } from "next/navigation";
import React from "react";
import useSingleProduct from "../api/useSingleProduct";
import { ArrowLeftIcon, LoaderCircle, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SingleProductPage() {
    const { id } = useParams();

    const { data, isLoading, isError } = useSingleProduct(id);

    const imagePath = data?.image.split("\\").pop();

    if (isLoading) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <LoaderCircle className="animate-spin" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <p className="text-red-500">
                    Something went wrong. Please try again later.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Button className=" flex space-x-3 mb-5 items-center">
                <ArrowLeftIcon size={18} />
                <Link href={"/dashboard/products"}>Go Back</Link>
            </Button>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_PATH_PREFIX}/${imagePath}`}
                        alt={data?.name || ""}
                        className="w-full h-auto object-cover rounded-lg shadow-lg p-4"
                    />
                    <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{data?.category}</Badge>
                        {data?.isFeatured && (
                            <Badge variant="outline">Featured</Badge>
                        )}
                        {data?.isPromoted && (
                            <Badge variant="destructive">Promoted</Badge>
                        )}
                    </div>
                </div>
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold">{data?.name}</h1>

                    <p className="text-2xl font-semibold text-gray-700">
                        ${data?.price}
                    </p>
                    <p className="text-muted-foreground">{data?.description}</p>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">
                            <Package className="w-4 h-4 inline mr-1" />
                            {data?.stock} in stock
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-12 grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Features</h2>
                    <p className="text-muted-foreground">{data?.features}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">
                        What is in the box
                    </h2>
                    <ul className="list-disc list-inside space-y-2">
                        {data?.accessories.map((accessory, index) => (
                            <li key={index} className="text-muted-foreground">
                                {accessory}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
