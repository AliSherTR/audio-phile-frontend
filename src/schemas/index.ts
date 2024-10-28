import * as z from "zod";

export const LoginSchema = z.object({
    email: z
        .string({
            message: "Email is required",
        })
        .email({
            message: "Invalid Email",
        }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const productSchema = z.object({
    name: z.string().min(2, "Product name must be at least 2 characters"),
    stock: z
        .string()
        .min(1, {
            message: "Stock is requried",
        })
        .refine((val) => !isNaN(Number(val)), {
            message: "Stock must be a valid number",
        }),
    price: z
        .string()
        .min(1, {
            message: "Price is requried",
        })
        .refine((val) => !isNaN(Number(val)), {
            message: "Price must be a valid number",
        }),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
    features: z.string().min(10, "Description must be at least 10 characters"),
    category: z.string().min(1, "Please select a category"),
    isPromoted: z.boolean(),
    isFeatured: z.boolean(),
    accessories: z
        .array(z.string())
        .min(1, "At least one box item is required"),
    image: z
        .any()
        .refine((files) => files?.length == 1, "Image is required.")
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            `Max file size is 5MB.`
        )
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
        ),
});
