"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Breadcrumb } from "./breadCrumb";

import { LogOut, Settings, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useUser } from "@/context/UserProvider";

export default function Header() {
    const pathName = usePathname();
    const { logoutUser, user } = useUser();

    const profileImage = user.image;

    function getAvatarInitials(name: string) {
        if (!name) return "";

        const nameParts = name.trim().split(" ");
        if (nameParts.length === 1) {
            return nameParts[0][0].toUpperCase();
        }

        const firstNameInitial = nameParts[0][0].toUpperCase();
        const secondNameInitial = nameParts[1][0].toUpperCase();

        return `${firstNameInitial}${secondNameInitial}`;
    }
    return (
        <header className=" py-3 px-4  shadow-lg flex items-center gap-4">
            <Breadcrumb pathname={pathName} />

            <div className=" flex-1 flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger className=" outline-none relative">
                        <Avatar>
                            <AvatarImage
                                className=" hover:opacity-75 transition"
                                src={profileImage}
                            />
                            <AvatarFallback className="bg-sky-500 flex items-center text-xs w-full h-full justify-center text-white">
                                {getAvatarInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mr-6">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={logoutUser}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
