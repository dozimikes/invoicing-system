"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

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

    const handleStatusUpdate = async (id: number, status: string) => {
        try {
            await api.patch(`/invoices/${id}`, { status });
            fetchData();
            if (selectedInvoice && selectedInvoice.id === id) {
                setSelectedInvoice({ ...selectedInvoice, status });
            }
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status.toUpperCase()) {
            case "PAID": return "bg-green-100 text-green-700";
            case "DRAFT": return "bg-gray-100 text-gray-700";
            case "SENT": return "bg-blue-100 text-blue-700";
            case "CANCELLED": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Invoices</h1>
                    <p className="text-gray-500 mt-1 text-sm">Create and track invoices for your clients in Naira (₦).</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] no-print"
                >
                    {showForm ? "Cancel" : "+ Create Invoice"}
                </button>
            </div>

            {showForm && (
                <div className="rounded-3xl border border-blue-100 bg-blue-50/30 p-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300 no-print">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Client</label>
                            <div className="relative">
                                <select
                                    required
                                    value={clientId}
                                    onChange={(e) => setClientId(e.target.value)}
                                    className="block w-full rounded-xl border-gray-200 py-3 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border appearance-none bg-white"
                                >
                                    <option value="">Choose a client...</option>
                                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
                                <input
                                    type="number"
                                    required
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="block w-full rounded-xl border-gray-200 py-3 pl-10 pr-4 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border"
                                />
                            </div>
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

            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm no-print">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-5 text-sm font-semibold text-gray-900">ID</th>
                            <th className="px-8 py-5 text-sm font-semibold text-gray-900">Client</th>
                            <th className="px-8 py-5 text-sm font-semibold text-gray-900">Amount</th>
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
                            <tr key={invoice.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-8 py-5 text-sm font-bold text-gray-400 group-hover:text-blue-600 transition-colors">#{invoice.id.toString().padStart(4, '0')}</td>
                                <td className="px-8 py-5 text-sm font-medium text-gray-900">{invoice.client?.name || "Unknown Client"}</td>
                                <td className="px-8 py-5 text-sm font-semibold text-gray-900 text-lg">₦{invoice.amount.toLocaleString()}</td>
                                <td className="px-8 py-5 text-sm">
                                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(invoice.status)}`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <button
                                        onClick={() => setSelectedInvoice(invoice)}
                                        className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center justify-end w-full"
                                    >
                                        <span className="mr-1">View</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Professional Invoice Modal */}
            {selectedInvoice && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 no-print"
                    onClick={() => setSelectedInvoice(null)}
                >
                    <div
                        id="printable-invoice"
                        className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="bg-blue-600 p-8 text-white relative">
                            <button
                                onClick={() => setSelectedInvoice(null)}
                                className="absolute right-6 top-6 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors no-print"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-3xl font-bold">INVOICE</h2>
                                    <p className="text-blue-100 mt-1 uppercase tracking-widest text-xs font-semibold">#{selectedInvoice.id.toString().padStart(6, '0')}</p>
                                </div>
                                <div className="text-right">
                                    <div className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold ring-1 ring-white/20 ${getStatusStyle(selectedInvoice.status)}`}>
                                        {selectedInvoice.status}
                                    </div>
                                    <p className="text-blue-100 mt-3 text-xs">{new Date(selectedInvoice.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 space-y-10">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Billed To</p>
                                    <h3 className="text-xl font-bold text-gray-900">{selectedInvoice.client?.name}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{selectedInvoice.client?.email}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Total Amount</p>
                                    <h3 className="text-3xl font-black text-gray-900">₦{selectedInvoice.amount.toLocaleString()}</h3>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6">
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 text-center">Payment Details</p>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600 font-medium">{selectedInvoice.description}</span>
                                    <span className="text-gray-900 font-bold">₦{selectedInvoice.amount.toLocaleString()}</span>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center font-black">
                                    <span className="text-gray-900">Balance Due</span>
                                    <span className="text-2xl text-blue-600">₦{selectedInvoice.amount.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 no-print">
                                {[
                                    { label: "Mark as Draft", status: "DRAFT", color: "hover:bg-gray-100 text-gray-600" },
                                    { label: "Mark as Sent", status: "SENT", color: "hover:bg-blue-50 text-blue-600" },
                                    { label: "Mark as Paid", status: "PAID", color: "hover:bg-green-50 text-green-600" },
                                    { label: "Cancel", status: "CANCELLED", color: "hover:bg-red-50 text-red-600" }
                                ].map((btn) => (
                                    <button
                                        key={btn.status}
                                        onClick={() => handleStatusUpdate(selectedInvoice.id, btn.status)}
                                        className={`px-4 py-3 rounded-xl border border-gray-100 text-[10px] font-black uppercase tracking-widest transition-all ${btn.color} ${selectedInvoice.status === btn.status ? 'ring-2 ring-inset ring-current opacity-50' : ''}`}
                                        disabled={selectedInvoice.status === btn.status}
                                    >
                                        {btn.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-between items-center gap-4">
                            <p className="text-[10px] text-gray-400 max-w-[200px]">Thank you for using our invoicing system. Please ensure payments are made on time.</p>
                            <div className="flex gap-3 no-print">
                                <button
                                    onClick={() => setSelectedInvoice(null)}
                                    className="rounded-xl bg-white border border-gray-200 px-6 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-gray-800 transition-all flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                    </svg>
                                    Print PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
