"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X, Upload, LoaderIcon } from "lucide-react";
import { productSchema } from "@/schemas";
import useSingleProduct from "../api/useSingleProduct";

interface Product {
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
}

type FormValues = z.infer<typeof productSchema>;

export default function EditProduct({
    product = {
        id: 0,
        name: "",
        price: 0,
        description: "",
        accessories: [],
        category: "",
        isFeatured: false,
        image: "",
        features: "",
        stock: 0,
        isPromoted: false,
    },
}: {
    product?: Product;
}) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { isCreating, createProductError } = useSingleProduct("");

    const form = useForm<FormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product.name || "Sample Product",
            price: JSON.stringify(product.price) || "99.99",
            description:
                product.description || "This is a sample product description.",
            features: product.features || "Feature 1\nFeature 2\nFeature 3",
            category: product.category || "Headphones",
            isPromoted: product.isPromoted || false,
            isFeatured: product.isFeatured || false,
            accessories: product.accessories || ["Accessory 1", "Accessory 2"],
            image: product.image || "",
            stock: JSON.stringify(product.stock) || "100",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "accessories",
    });

    async function onSubmit(values: FormValues) {
        // Your existing onSubmit logic here
    }
    const imagePath = product?.image.split("\\").pop();
    useEffect(() => {
        setImagePreview(
            `${process.env.NEXT_PUBLIC_IMAGE_PATH_PREFIX}/${imagePath}`
        );
    }, []);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    if (isCreating) {
        return (
            <div className="h-screen flex items-center justify-center">
                <LoaderIcon className="animate-spin" />
            </div>
        );
    }

    if (createProductError) {
        return (
            <div className="h-screen flex items-center justify-center">
                {createProductError.message}
            </div>
        );
    }

    return (
        <div className="p-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                    encType="multipart/form-data"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter product name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter price"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter stock"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter product description"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="features"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Features</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter product features"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Headphones">
                                            Headphones
                                        </SelectItem>
                                        <SelectItem value="Earphones">
                                            Earphones
                                        </SelectItem>
                                        <SelectItem value="Speakers">
                                            Speakers
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex space-x-4">
                        <FormField
                            control={form.control}
                            name="isPromoted"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Promoted</FormLabel>
                                        <FormDescription>
                                            This product will appear in promoted
                                            sections
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Featured</FormLabel>
                                        <FormDescription>
                                            This product will be featured on the
                                            homepage
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">
                            Box Items
                        </h3>
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="flex items-end space-x-4 mb-4"
                            >
                                <FormField
                                    control={form.control}
                                    name={`accessories.${index}`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Item Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter item name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => remove(index)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => append("")}
                        >
                            Add Box Item
                        </Button>
                    </div>

                    <FormField
                        control={form.control}
                        name="image"
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        render={({ field: { value, onChange, ...field } }) => (
                            <FormItem>
                                <FormLabel>Product Image</FormLabel>
                                <FormControl>
                                    <div className="flex flex-col items-center justify-center w-full">
                                        <Label
                                            htmlFor="dropzone-file"
                                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        >
                                            {imagePreview ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={
                                                        imagePreview ||
                                                        (product.image
                                                            ? `${process.env.NEXT_PUBLIC_IMAGE_PATH_PREFIX}/${imagePath}`
                                                            : "")
                                                    }
                                                    alt="Preview"
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold">
                                                            Click to upload
                                                        </span>{" "}
                                                        or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        SVG, PNG, JPG or GIF
                                                        (MAX. 800x400px)
                                                    </p>
                                                </div>
                                            )}
                                            <Input
                                                id="dropzone-file"
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => {
                                                    onChange(e.target.files);
                                                    handleImageChange(e);
                                                }}
                                                {...field}
                                            />
                                        </Label>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isCreating}
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
