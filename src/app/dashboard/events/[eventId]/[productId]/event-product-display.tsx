/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface EventProductDisplayProps {
    event: {
        name: string;
        image: string;
        endDate: string;
        discount: number;
    };
    product: {
        name: string;
        discountedPrice: number;
        category: string;
        image: string;
    };
    productId: string;
}

export default function EventProductDisplay({
    event,
    product,
    productId,
}: EventProductDisplayProps) {
    const endDate = new Date(event.endDate);

    return (
        <div className="container mx-auto p-4 space-y-6">
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className=" object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6 text-white">
                        <h1 className="text-3xl font-bold mb-2">
                            {event.name}
                        </h1>
                        <p className="flex items-center text-sm">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            Ends on {endDate.toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            <Card className="w-full max-w-xl mx-auto overflow-hidden">
                <div className="relative aspect-[4/3] w-full">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold line-clamp-2">
                        {product.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="text-sm">
                            {product.category}
                        </Badge>
                        {event.discount > 0 && (
                            <Badge
                                variant="secondary"
                                className="bg-green-500 text-white"
                            >
                                Save {event.discount}%
                            </Badge>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-primary">
                            ${product.discountedPrice.toFixed(2)}
                        </p>
                        <Button asChild size="sm">
                            <Link
                                href={`/dashboard/products/${productId}`}
                                className="flex items-center"
                            >
                                View Product{" "}
                                <ExternalLinkIcon className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
