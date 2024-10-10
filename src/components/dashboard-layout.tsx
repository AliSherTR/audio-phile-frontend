"use client";

import Header from "@/components/header";
import SideBar from "@/components/side-bar";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);

    return (
        <div className="h-screen flex flex-col md:grid md:grid-rows-[auto_1fr] md:grid-cols-12 overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden">
                <Header />
                <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute  ${
                        sideBarOpen ? " top-0" : "top-4"
                    }  z-50`}
                    onClick={() => setSideBarOpen(!sideBarOpen)}
                >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle sidebar</span>
                </Button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 transform ${
                    sideBarOpen ? "translate-x-0" : "-translate-x-full"
                } md:relative md:translate-x-0 transition-all duration-300 ease-in-out z-30 
        ${
            sideBarOpen
                ? "md:col-span-3 lg:col-span-2 xl:col-span-2"
                : "md:col-span-1 lg:col-span-1 xl:col-span-1"
        } md:row-span-full`}
            >
                <SideBar
                    sideBarOpen={sideBarOpen}
                    setSideBarOpen={setSideBarOpen}
                />
            </div>

            {/* Main Content Area */}
            <div
                className={`flex flex-col ${
                    sideBarOpen
                        ? "md:col-span-9 lg:col-span-10 xl:col-span-10"
                        : "md:col-span-11 lg:col-span-11 xl:col-span-11"
                } md:row-span-full w-full transition-all duration-300 ease-in-out`}
            >
                {/* Desktop Header */}
                <div className="hidden md:block">
                    <Header />
                </div>

                {/* Main Content */}
                <main className="flex-grow overflow-auto custom-scrollbar px-4 py-6 md:px-8 md:py-12">
                    {children}
                </main>
            </div>

            {/* Overlay for mobile when sidebar is open */}
            {sideBarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setSideBarOpen(false)}
                />
            )}
        </div>
    );
}
