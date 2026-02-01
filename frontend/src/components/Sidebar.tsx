"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Clients", href: "/dashboard/clients", icon: "👥" },
    { name: "Invoices", href: "/dashboard/invoices", icon: "📄" },
    { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <div className="flex h-full w-64 flex-col bg-white border-r border-gray-100">
            <div className="flex h-20 items-center px-8">
                <span className="text-2xl font-bold text-gray-900">
                    Invoicing<span className="text-blue-600">.</span>
                </span>
            </div>
            <nav className="flex-1 space-y-1 px-4 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <span className="mr-3 text-lg">{item.icon}</span>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-gray-100 p-4">
                <button
                    onClick={logout}
                    className="flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                    <span className="mr-3 text-lg">🚪</span>
                    Logout
                </button>
            </div>
        </div>
    );
}
