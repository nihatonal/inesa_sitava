import React from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut } from 'lucide-react';
import { Button } from "./ui/Button";
export default function LogoutButton({ redirectTo = "/admin/login" }) {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = redirectTo;
    };

    return (
        <Button variant={"ghost"} onClick={handleLogout} className="cursor-pointer bg-transparent 
        text-gray-400 border border-gray-300 hover:bg-gray-200 hover:text-gray-600 flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Выйти

        </Button>
    );
}
