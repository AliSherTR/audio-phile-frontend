import { useUser } from "@/context/UserProvider";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    accessories: string[];
    isFeatured: boolean;
    image: string;
    features: string;
    isPromoted: boolean;
}

export interface Events {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    image: string;
    product: Product | null;
    productId: string;
    discount: string;
}

interface EventsResponse {
    status: string;
    data: Events[];
}

interface UpdateEventParams {
    id: number;
    data: FormData;
}

export const useEvents = () => {
    const API_URL = "http://localhost:8000/events";
    const { user } = useUser();
    const { token } = user;

    const { toast } = useToast();
    const queryClient = useQueryClient();

    const fetchEvents = async (): Promise<EventsResponse> => {
        const res = await fetch(`${API_URL}/all-admin`);
        const apiResponse = await res.json();
        if (!res.ok) {
            throw new Error(apiResponse.error.message);
        }

        return apiResponse;
    };

    const createEvent = async (data: FormData) => {
        const res = await fetch(`${API_URL}`, {
            method: "POST",
            body: data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const apiResponse = await res.json();

        if (!res.ok) {
            throw new Error(apiResponse.error.message);
        }

        return apiResponse;
    };

    const deleteEvent = async (id: string) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        return data;
    };

    const updateEvent = async ({ id, data }: UpdateEventParams) => {

        console.log(data)
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            body: data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const apiResponse = await res.json();

       
        if (!res.ok) {
            throw new Error(apiResponse.message);
        }

        return apiResponse;
    };

    const {
        data: events,
        isLoading: eventsLoading,
        isError: eventsError,
    } = useQuery<EventsResponse>({
        queryKey: ["events"],
        queryFn: fetchEvents,
    });

    const { mutate: createEventMutation, isPending: creatingEvent } =
        useMutation({
            mutationFn: createEvent,
            onSuccess: () => {
                toast({
                    title: "Created Event",
                    description: "Event Created Successfully",
                });

                queryClient.invalidateQueries({ queryKey: ["events"] });
            },
            onError: (error) => {
                toast({
                    title: "Error",
                    description:
                        "Failed to create event. Please try again." +
                        error.message,
                    variant: "destructive",
                });
            },
        });

    const { mutate: deleteEventMutation, isPending: isDeleting } = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            toast({
                title: "Deleted Event",
                description: "Event Deleted Successfully",
            });

            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description:
                    "Failed to Delete event. Please try again." + error.message,
                variant: "destructive",
            });
        },
    });

    const {
        mutate: updateEventMutation,
        isPending: isUpdating,
        isSuccess: isUpdated,
    } = useMutation({
        mutationFn: updateEvent,
        onSuccess: () => {
            toast({
                title: "Updated Event",
                description: "Event Updated Successfully",
            });

            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description:
                    "Failed to Update event. Please try again." + error.message,
                variant: "destructive",
            });
        },
    });

    return {
        events: events?.data ?? [],
        eventsError,
        eventsLoading,
        createEventMutation,
        creatingEvent,
        deleteEventMutation,
        isDeleting,
        updateEventMutation,
        isUpdating,
        isUpdated,
    };
};
