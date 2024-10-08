import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
export default function DashBoardCard() {
    return (
        <Card className=" w-full">
            <CardHeader>
                <CardDescription>Total Revenue</CardDescription>
            </CardHeader>
            <CardContent>
                <CardTitle>$45,231.89</CardTitle>
            </CardContent>
            <CardFooter>+20.1% from last month</CardFooter>
        </Card>
    );
}
