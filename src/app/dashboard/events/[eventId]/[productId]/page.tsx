import { notFound } from "next/navigation";
import EventProductDisplay from "./event-product-display";

interface PageProps {
    params: {
        eventId: string;
        productId: string;
    };
}

async function getEventAndProduct(eventId: string, productId: string) {
    const res = await fetch(
        `http://localhost:8000/events/${eventId}/${productId}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch event and product data");
    }

    return res.json();
}

export default async function EventProductPage({ params }: PageProps) {
    const { eventId, productId } = params;

    try {
        const data = await getEventAndProduct(eventId, productId);

        if (!data || !data.data) {
            notFound();
        }

        return (
            <EventProductDisplay
                event={data.data.event}
                product={data.data.product}
                productId={productId}
            />
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
