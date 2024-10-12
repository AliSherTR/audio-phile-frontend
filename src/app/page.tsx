"use client";
import { UserProvider } from "@/context/UserProvider";
import LoginForm from "@/features/auth/components/login-form";
import React from "react";

export default function Home() {
    return (
        <UserProvider>
            <LoginForm />
        </UserProvider>
    );
}
