"use client";

import { useState } from "react";
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
import { Eye, Pencil, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

// Sample data for the events
const allEvents = [
    {
        id: "EVT001",
        name: "Summer Music Festival",
        date: "2023-07-15",
        time: "18:00",
        status: "Upcoming",
        attendees: 500,
    },
    {
        id: "EVT002",
        name: "Tech Conference 2023",
        date: "2023-08-10",
        time: "09:00",
        status: "Open",
        attendees: 1000,
    },
    {
        id: "EVT003",
        name: "Charity Gala Dinner",
        date: "2023-09-05",
        time: "19:30",
        status: "Sold Out",
        attendees: 250,
    },
    {
        id: "EVT004",
        name: "Local Art Exhibition",
        date: "2023-07-22",
        time: "10:00",
        status: "Upcoming",
        attendees: 300,
    },
    {
        id: "EVT005",
        name: "Marathon for a Cause",
        date: "2023-10-01",
        time: "07:00",
        status: "Open",
        attendees: 2000,
    },
    {
        id: "EVT006",
        name: "Food and Wine Festival",
        date: "2023-08-20",
        time: "12:00",
        status: "Upcoming",
        attendees: 1500,
    },
    {
        id: "EVT007",
        name: "Business Networking Mixer",
        date: "2023-09-15",
        time: "18:30",
        status: "Open",
        attendees: 150,
    },
    {
        id: "EVT008",
        name: "Children's Book Fair",
        date: "2023-07-29",
        time: "10:00",
        status: "Upcoming",
        attendees: 400,
    },
    {
        id: "EVT009",
        name: "Yoga and Wellness Retreat",
        date: "2023-08-05",
        time: "08:00",
        status: "Sold Out",
        attendees: 100,
    },
    {
        id: "EVT010",
        name: "Classic Car Show",
        date: "2023-09-23",
        time: "11:00",
        status: "Open",
        attendees: 800,
    },
];

export default function EventsTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const eventsPerPage = 5;

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "upcoming":
                return "bg-blue-100 text-blue-800";
            case "open":
                return "bg-green-100 text-green-800";
            case "sold out":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const filteredEvents = allEvents.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(
        indexOfFirstEvent,
        indexOfLastEvent
    );

    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Events</h1>
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Search events by name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="max-w-sm"
                />
            </div>
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Event Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Attendees</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentEvents.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell className="font-medium">
                                    {event.name}
                                </TableCell>
                                <TableCell>{event.date}</TableCell>
                                <TableCell>{event.time}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={`${getStatusColor(
                                            event.status
                                        )} font-semibold`}
                                    >
                                        {event.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{event.attendees}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4 mr-1" />
                                            View
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Pencil className="h-4 w-4 mr-1" />
                                            Edit
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            Schedule
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                    Showing {indexOfFirstEvent + 1} to{" "}
                    {Math.min(indexOfLastEvent, filteredEvents.length)} of{" "}
                    {filteredEvents.length} events
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
