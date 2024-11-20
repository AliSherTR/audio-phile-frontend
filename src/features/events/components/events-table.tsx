"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Eye,
    Pencil,
    ChevronLeft,
    ChevronRight,
    Trash2,
    Loader,
} from "lucide-react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import EventForm from "./event-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Events, useEvents } from "../api/useEvents";
import { format } from "date-fns";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import DeleteEventModal from "./delete-event-modal";

export default function EventsTable() {
    const { events, isDeleting } = useEvents();

    const getEventStatus = (startDate: Date, endDate: Date) => {
        const currentDate = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (currentDate < start) {
            return "upcoming";
        }

        if (currentDate >= start && currentDate <= end) {
            return "open";
        }

        if (currentDate > end) {
            return "closed";
        }

        return "unknown"; // Fallback if something unexpected occurs
    };

    // Function to determine the status color
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "upcoming":
                return "bg-blue-100 text-blue-800";
            case "open":
                return "bg-green-100 text-green-800";
            case "closed":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Format the date in the desired format
    const formatDate = (date: Date) => {
        return format(new Date(date), "dd-MM-yy 'at' hh:mm a");
    };

    // Function to render content in the table
    const renderContent = () => {
        if (!events.length) {
            return (
                <>
                    <h1 className="text-red-500">No Active Events</h1>
                </>
            );
        }

        if (isDeleting) return <Loader className=" animate-spin" />;

        return (
            <>
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event Name</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event: Events) => {
                                const status = getEventStatus(
                                    event.startDate,
                                    event.endDate
                                );

                                return (
                                    <TableRow key={event.id}>
                                        <TableCell className="font-medium">
                                            {event.name}
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(event.startDate)}
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(event.endDate)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={`${getStatusColor(
                                                    status
                                                )} font-semibold`}
                                            >
                                                {status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    View
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Pencil className="h-4 w-4 mr-1" />
                                                    Edit
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="outline">
                                                            <Trash2 className="h4 w-4 mr-1" />
                                                            Delete
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <DeleteEventModal
                                                        id={JSON.stringify(
                                                            event.id
                                                        )}
                                                    />
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-500"></div>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                        </Button>
                        <Button variant="outline" size="sm">
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Events</h1>
            <div className="mb-4 flex items-center justify-between">
                <Input
                    type="text"
                    placeholder="Search events by name"
                    className="max-w-sm"
                />
                <Dialog>
                    <Button variant={"outline"}>
                        <DialogTrigger>Add New Event</DialogTrigger>{" "}
                    </Button>
                    <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[1200px]">
                        <ScrollArea className="h-[80vh] pr-4">
                            <DialogTitle>Create A New Event</DialogTitle>

                            <EventForm />
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>

            {renderContent()}
        </>
    );
}
