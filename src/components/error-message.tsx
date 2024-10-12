import { TriangleAlert } from "lucide-react";
import React from "react";

interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className="flex w-full items-center gap-3 bg-red-700/30 text-red-950 px-4 py-2 rounded-md">
            <TriangleAlert className="text-red-950" width={20} height={40} />
            <p>{message}</p>
        </div>
    );
}
