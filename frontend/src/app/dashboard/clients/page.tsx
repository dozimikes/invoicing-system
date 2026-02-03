"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ClientsPage() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const fetchClients = async () => {
        try {
            const response = await api.get("/clients");
            setClients(response.data);
        } catch (err) {
            console.error("Failed to fetch clients", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await api.post("/clients", { name, email });
            setName("");
            setEmail("");
            setShowForm(false);
            fetchClients();
        } catch (err: any) {
            const errorMessage = err.response?.data?.message ||
                err.response?.data?.error ||
                "Failed to create client. Please try again.";
            setError(errorMessage);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this client?")) return;
        try {
            await api.delete(`/clients/${id}`);
            fetchClients();
        } catch (err) {
            alert("Failed to delete client");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Clients</h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage your relationships and view client history.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-500 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    {showForm ? "Cancel" : "+ Add New Client"}
                </button>
            </div>

            {showForm && (
                <div className="rounded-3xl border border-blue-100 bg-blue-50/30 p-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    {error && (
                        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 rounded-xl">
                            <div className="flex">
                                <div className="flex-shrink-0 text-red-400">⚠️</div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Acme Corp"
                                className="block w-full rounded-xl border-gray-200 py-3 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g. contact@acme.com"
                                className="block w-full rounded-xl border-gray-200 py-3 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border"
                            />
                        </div>
                        <button type="submit" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-all h-[46px]">
                            Confirm Client
                        </button>
                    </form>
                </div>
            )}

            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-5 text-sm font-semibold text-gray-900">Name</th>
                            <th className="px-8 py-5 text-sm font-semibold text-gray-900">Email</th>
                            <th className="px-8 py-5 text-sm font-semibold text-gray-900 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={3} className="px-8 py-10 text-center text-gray-400">Loading clients...</td>
                            </tr>
                        ) : clients.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-8 py-10 text-center text-gray-400">No clients found. Add one to get started!</td>
                            </tr>
                        ) : clients.map((client) => (
                            <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-5 text-sm font-medium text-gray-900">{client.name}</td>
                                <td className="px-8 py-5 text-sm text-gray-500">{client.email}</td>
                                <td className="px-8 py-5 text-right whitespace-nowrap">
                                    <button className="text-gray-400 hover:text-blue-600 transition-colors mr-4">Edit</button>
                                    <button
                                        onClick={() => handleDelete(client.id)}
                                        className="text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
