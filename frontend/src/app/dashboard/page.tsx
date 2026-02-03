"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";

export default function Dashboard() {
    const [stats, setStats] = useState([
        { name: "Total Revenue", value: "...", change: "...", trend: "up" },
        { name: "Pending Invoices", value: "...", change: "...", trend: "down" },
        { name: "Active Clients", value: "...", change: "...", trend: "up" },
        { name: "Avg. Payment Time", value: "...", change: "...", trend: "down" },
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const [clientsRes, invoicesRes] = await Promise.all([
                    api.get("/clients"),
                    api.get("/invoices"),
                ]);

                const clients = clientsRes.data;
                const invoices = invoicesRes.data;

                const totalRevenue = invoices
                    .filter((inv: any) => inv.status === "PAID")
                    .reduce((sum: number, inv: any) => sum + inv.amount, 0);

                const pendingCount = invoices.filter((inv: any) => inv.status === "DRAFT" || inv.status === "SENT").length;

                setStats([
                    {
                        name: "Total Revenue",
                        value: `₦${totalRevenue.toLocaleString()}`,
                        change: "+0%",
                        trend: "up"
                    },
                    {
                        name: "Pending Invoices",
                        value: pendingCount.toString(),
                        change: "0",
                        trend: "down"
                    },
                    {
                        name: "Active Clients",
                        value: clients.length.toString(),
                        change: "+0",
                        trend: "up"
                    },
                    {
                        name: "Avg. Payment Time",
                        value: "N/A",
                        change: "0",
                        trend: "down"
                    },
                ]);
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Good morning</h1>
                <p className="text-gray-500 mt-1 text-sm">Here's what's happening with your business today.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <p className="text-sm font-medium text-gray-500">{item.name}</p>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{item.value}</p>
                        <p className={`mt-2 text-sm font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-blue-600'}`}>
                            {item.change} <span className="text-gray-400 font-normal">from last month</span>
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100 h-96 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                        <span className="text-3xl">📈</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Revenue Over Time</h3>
                    <p className="text-gray-500 text-sm max-w-xs mt-2">Chart integration coming soon. This will display your monthly earnings.</p>
                </div>
                <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100 h-96 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                        <span className="text-3xl">📝</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                    <p className="text-gray-500 text-sm max-w-xs mt-2">A list of your most recent invoices and client interactions will appear here.</p>
                </div>
            </div>
        </div>
    );
}
