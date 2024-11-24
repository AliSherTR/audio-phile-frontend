import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Props {
    heading: string;
    content: string;
    footer: string;
    icon?: React.ReactElement;
}

export default function DashBoardCard({
    heading,
    content,
    footer,
    icon,
}: Props) {
    return (
        <Card className=" w-full">
            <CardHeader>
                <CardDescription>{heading}</CardDescription>
            </CardHeader>
            <CardContent className=" flex gap-2 items-center">
                {icon}
                <CardTitle>{content}</CardTitle>
            </CardContent>
            <CardFooter>{footer}</CardFooter>
        </Card>
    );
}
