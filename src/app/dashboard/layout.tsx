"use client";
import Header from "@/components/header";
import SideBar from "@/components/side-bar";
import React, { useState } from "react";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);
    return (
        <div className="h-screen grid grid-rows-[auto_1fr] grid-cols-12 overflow-hidden">
            <div
                className={`h-full  ${
                    sideBarOpen ? "col-end-3" : "col-end-2"
                } col-start-1 col-end-3 row-span-full overflow-y-auto`}
            >
                <SideBar
                    sideBarOpen={sideBarOpen}
                    setSideBarOpen={setSideBarOpen}
                />
            </div>
            <div
                className={`${
                    sideBarOpen
                        ? "col-start-3 col-span-full"
                        : "col-start-2 col-span-full"
                } col-span-full"`}
            >
                <Header />
            </div>
            <main
                className={`${
                    sideBarOpen
                        ? "col-start-3 col-span-full"
                        : "col-start-2 col-span-full"
                }  overflow-auto bg-gray-100 px-8 py-12 `}
            >
                {children}
            </main>
        </div>
    );
}
