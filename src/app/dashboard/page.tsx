import { Barchart } from "@/components/bar-chart";
import DashBoardCard from "@/components/dashboard-card";
import { Linechart } from "@/components/line-chart";
import { DollarSign, ShoppingBag, ShoppingCart, User2 } from "lucide-react";
import React from "react";

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <DashBoardCard
                    heading="Total Revenue"
                    content="2000"
                    icon={<DollarSign />}
                    footer="20.1% rise from last month"
                />
                <DashBoardCard
                    heading="Total Users"
                    icon={<User2 />}
                    content="33"
                    footer="Total number of active users"
                />
                <DashBoardCard
                    heading="Total Products"
                    icon={<ShoppingCart />}
                    content="55"
                    footer="Total products in the store"
                />
                <DashBoardCard
                    heading="Total Orders"
                    icon={<ShoppingBag />}
                    content="44"
                    footer="Total orders placed from store"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Barchart />
                <Linechart />
            </div>
        </div>
    );
}
