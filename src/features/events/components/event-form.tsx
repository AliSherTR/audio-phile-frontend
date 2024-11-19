"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEvents } from "../api/useEvents";

const eventSchema = z.object({
    name: z.string().min(1, "Event name is required"),
    startDate: z.date({
        required_error: "Start date is required",
    }),
    endDate: z.date({
        required_error: "End date is required",
    }),
    productId: z.string().min(1, "Product ID is required"),
    image: z.instanceof(File).optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function EventForm() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {createEventMutation , creatingEvent} = useEvents()

    const form = useForm<EventFormData>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            name: "",
            productId: "",
            startDate: new Date,
            endDate: new Date,
            image: "",
        },
    });

    const onSubmit = (data: EventFormData) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "accessories") {
                formData.append(key, JSON.stringify(value));
            } else if (key === "image" && value instanceof FileList) {
                formData.append(key, value[0]);
            } else {
                formData.append(key, value?.toString() ?? "");
            }
        });
        const dataToSend = {...formData , discount: 20}
        createEventMutation(dataToSend)
    };

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <div className="p-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 "
                >
                    <div className="">
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem className="col-span-full">
                                    <FormLabel className="text-lg font-semibold">
                                        Event Image
                                    </FormLabel>
                                    <FormControl>
                                        <div className="flex items-center justify-center h-80 bg-muted rounded-lg overflow-hidden border-2 border-dashed border-gray-300 transition-all duration-200 ease-in-out hover:border-primary">
                                            {imagePreview ? (
                                                <div className="relative w-full h-full">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Event preview"
                                                        className="object-contain w-full h-full"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute top-2 right-2"
                                                        onClick={() => {
                                                            setImagePreview(
                                                                null
                                                            );
                                                            field.onChange(
                                                                null
                                                            );
                                                        }}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Label
                                                    htmlFor="event-image-upload"
                                                    className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
                                                >
                                                    <Upload className="w-16 h-16 text-muted-foreground mb-4" />
                                                    <span className="text-lg font-medium text-muted-foreground">
                                                        Click to upload image
                                                    </span>
                                                    <span className="text-sm text-muted-foreground mt-2">
                                                        or drag and drop
                                                    </span>
                                                </Label>
                                            )}
                                            <Input
                                                id="event-image-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0];
                                                    if (file) {
                                                        field.onChange(file);
                                                        setImagePreview(
                                                            URL.createObjectURL(
                                                                file
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter event name"
                                                {...field}
                                                className=""
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Start Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date() ||
                                                        date <
                                                            new Date(
                                                                "1900-01-01"
                                                            )
                                                    }
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>End Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date() ||
                                                        date <
                                                            new Date(
                                                                "1900-01-01"
                                                            )
                                                    }
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="productId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter product ID"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full text-lg py-6">
                        Create Event
                    </Button>
                </form>
            </Form>
        </div>
    );
}
