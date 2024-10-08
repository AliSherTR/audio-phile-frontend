import { Barchart } from "@/components/bar-chart";
import DashBoardCard from "@/components/dashboard-card";
import { Linechart } from "@/components/line-chart";
import React from "react";

export default function Dashboard() {
    return (
        <>
            <div className="flex gap-4">
                <DashBoardCard />
                <DashBoardCard />
                <DashBoardCard />
                <DashBoardCard />
            </div>

            <div className=" flex justify-between gap-4 mt-5 w-full">
                <Barchart />
                <Linechart />
            </div>
        </>
    );
}
