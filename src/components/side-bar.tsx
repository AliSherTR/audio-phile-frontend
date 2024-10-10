"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { sideBarLink } from "@/types";
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    Grid3X3,
    Settings,
    MoveLeft,
    MoveRight,
    Calendar,
} from "lucide-react";

import logo from "../../assets/logo.svg";
import Image from "next/image";
import { Button } from "./ui/button";

const sideBarLinks: sideBarLink[] = [
    {
        href: "/dashboard",
        name: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        href: "/dashboard/users",
        name: "Users",
        icon: Users,
    },
    {
        href: "/dashboard/products",
        name: "Products",
        icon: ShoppingCart,
    },
    {
        href: "/dashboard/orders",
        name: "Orders",
        icon: Grid3X3,
    },

    {
        href: "/dashboard/events",
        name: "Events",
        icon: Calendar,
    },
    {
        href: "/dashboard/settings",
        name: "Settings",
        icon: Settings,
    },
];

interface sideBarProps {
    sideBarOpen: boolean;
    setSideBarOpen: (sidebar: boolean) => void;
}

export default function SideBar({ sideBarOpen, setSideBarOpen }: sideBarProps) {
    const pathname = usePathname();

    return (
        <aside className="h-full flex flex-col px-4 py-6 bg-white">
            <div className="mb-10 px-3 py-2">
                <Link href="/">
                    <Image
                        src={logo}
                        color="grey"
                        alt="Audio Phile"
                        width={150}
                        height={100}
                        className=" m-auto"
                    />
                </Link>
            </div>
            <div className="flex-1 w-full ">
                <h1
                    className={`mb-5 font-semibold px-3 py-2 ${
                        sideBarOpen ? "text-base" : "text-xs"
                    }`}
                >
                    Main Dashboard
                </h1>
                <ul>
                    {sideBarLinks.map((link, index) => (
                        <li className="mb-5 " key={index}>
                            <Link
                                href={link.href}
                                className={`w-full px-3 py-2 rounded-md flex items-center ${
                                    sideBarOpen ? "" : "justify-center"
                                } gap-2 ${
                                    pathname === link.href
                                        ? "bg-blue-300 text-white "
                                        : ""
                                } `}
                            >
                                <link.icon size={18} className="inline-block" />
                                {sideBarOpen && link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className=" w-full px-3 py-2">
                <Button
                    variant={"secondary"}
                    className="w-full space-x-3"
                    onClick={() => setSideBarOpen(!sideBarOpen)}
                >
                    {sideBarOpen ? <MoveLeft /> : <MoveRight />}
                    <span className=" font-semibold">
                        {sideBarOpen ? "Close" : "Open"}
                    </span>
                </Button>
            </div>
        </aside>
    );
}
