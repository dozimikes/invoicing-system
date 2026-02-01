"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClientsPage;
const react_1 = __importStar(require("react"));
const api_1 = __importDefault(require("@/lib/api"));
function ClientsPage() {
    const [clients, setClients] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [showForm, setShowForm] = (0, react_1.useState)(false);
    const [name, setName] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const fetchClients = async () => {
        try {
            const response = await api_1.default.get("/clients");
            setClients(response.data);
        }
        catch (err) {
            console.error("Failed to fetch clients", err);
        }
        finally {
            setLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchClients();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api_1.default.post("/clients", { name, email });
            setName("");
            setEmail("");
            setShowForm(false);
            fetchClients();
        }
        catch (err) {
            alert("Failed to create client");
        }
    };
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this client?"))
            return;
        try {
            await api_1.default.delete(`/clients/${id}`);
            fetchClients();
        }
        catch (err) {
            alert("Failed to delete client");
        }
    };
    return (<div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Clients</h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage your relationships and view client history.</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-500 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                    {showForm ? "Cancel" : "+ Add New Client"}
                </button>
            </div>

            {showForm && (<div className="rounded-3xl border border-blue-100 bg-blue-50/30 p-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Acme Corp" className="block w-full rounded-xl border-gray-200 py-3 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. contact@acme.com" className="block w-full rounded-xl border-gray-200 py-3 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border"/>
                        </div>
                        <button type="submit" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-all h-[46px]">
                            Confirm Client
                        </button>
                    </form>
                </div>)}

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
                        {loading ? (<tr>
                                <td colSpan={3} className="px-8 py-10 text-center text-gray-400">Loading clients...</td>
                            </tr>) : clients.length === 0 ? (<tr>
                                <td colSpan={3} className="px-8 py-10 text-center text-gray-400">No clients found. Add one to get started!</td>
                            </tr>) : clients.map((client) => (<tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-5 text-sm font-medium text-gray-900">{client.name}</td>
                                <td className="px-8 py-5 text-sm text-gray-500">{client.email}</td>
                                <td className="px-8 py-5 text-right whitespace-nowrap">
                                    <button className="text-gray-400 hover:text-blue-600 transition-colors mr-4">Edit</button>
                                    <button onClick={() => handleDelete(client.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                                        Delete
                                    </button>
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map