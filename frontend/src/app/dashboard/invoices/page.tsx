"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const [clientId, setClientId] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    const fetchData = async () => {
        try {
            const [invRes, cliRes] = await Promise.all([
                api.get("/invoices"),
                api.get("/clients")
            ]);
            setInvoices(invRes.data);
            setClients(cliRes.data);
        } catch (err) {
            console.error("Failed to fetch data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/invoices", {
                clientId: Number(clientId),
                amount: Number(amount),
                description
            });
            setClientId("");
            setAmount("");
            setDescription("");
            setShowForm(false);
            fetchData();
        } catch (err) {
            alert("Failed to create invoice");
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status.toUpperCase()) {
            case "PAID": return "bg-green-100 text-green-700";
            case "DRAFT": return "bg-gray-100 text-gray-700";
            case "SENT": return "bg-blue-100 text-blue-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Invoices</h1>
                    <p className="text-gray-500 mt-1 text-sm">Create and track invoices for your clients.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-500 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    {showForm ? "Cancel" : "+ Create Invoice"}
                </button>
            </div>

            {showForm && (
                <div className="rounded-3xl border border-blue-100 bg-blue-50/30 p-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Client</label>
                            <select
                                required
                                value={clientId}
                                onChange={(e) => setClientId(e.target.value)}
                                className="block w-full rounded-xl border-gray-200 py-3 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border appearance-none"
                            >
                                <option value="">Choose a client...</option>
                                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
                            <input
                                type="number"
                                required
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="block w-full rounded-xl border-gray-200 py-3 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <input
                                type="text"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Services rendered..."
                                className="block w-full rounded-xl border-gray-200 py-3 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border"
                            />
                        </div>
                        <button type="submit" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-all h-[46px]">
                            Generate Invoice
                        </button>
                    </form>
                </div>
            )}

            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-5 text-sm font-semibold text-gray-900">ID</th>
                            <th className="px-8 py-5 text-sm font-semibold text-gray-900">Amount</th>
                            <th className="px-8 py-5 text-sm font-semibold text-gray-900">Description</th>
                            <th className="px-8 py-5 text-sm font-semibold text-gray-900">Status</th>
                            <th className="px-8 py-5 text-sm font-semibold text-gray-900 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-10 text-center text-gray-400">Loading invoices...</td>
                            </tr>
                        ) : invoices.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-10 text-center text-gray-400">No invoices found.</td>
                            </tr>
                        ) : invoices.map((invoice) => (
                            <tr key={invoice.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-5 text-sm font-bold text-blue-600">#{invoice.id}</td>
                                <td className="px-8 py-5 text-sm font-semibold text-gray-900">${invoice.amount.toLocaleString()}</td>
                                <td className="px-8 py-5 text-sm text-gray-500 max-w-xs truncate">{invoice.description}</td>
                                <td className="px-8 py-5 text-sm">
                                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(invoice.status)}`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <button className="text-gray-400 hover:text-blue-600 transition-colors">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
