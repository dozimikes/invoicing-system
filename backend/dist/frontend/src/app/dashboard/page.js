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
exports.default = Dashboard;
const react_1 = __importStar(require("react"));
const api_1 = __importDefault(require("@/lib/api"));
function Dashboard() {
    const [stats, setStats] = (0, react_1.useState)([
        { name: "Total Revenue", value: "...", change: "...", trend: "up" },
        { name: "Pending Invoices", value: "...", change: "...", trend: "down" },
        { name: "Active Clients", value: "...", change: "...", trend: "up" },
        { name: "Avg. Payment Time", value: "...", change: "...", trend: "down" },
    ]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        async function fetchStats() {
            try {
                const [clientsRes, invoicesRes] = await Promise.all([
                    api_1.default.get("/clients"),
                    api_1.default.get("/invoices"),
                ]);
                const clients = clientsRes.data;
                const invoices = invoicesRes.data;
                const totalRevenue = invoices
                    .filter((inv) => inv.status === "PAID")
                    .reduce((sum, inv) => sum + inv.amount, 0);
                const pendingCount = invoices.filter((inv) => inv.status === "DRAFT" || inv.status === "SENT").length;
                setStats([
                    {
                        name: "Total Revenue",
                        value: `$${totalRevenue.toLocaleString()}`,
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
            }
            catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            }
            finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);
    return (<div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Good morning</h1>
                <p className="text-gray-500 mt-1 text-sm">Here's what's happening with your business today.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (<div key={item.name} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <p className="text-sm font-medium text-gray-500">{item.name}</p>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{item.value}</p>
                        <p className={`mt-2 text-sm font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-blue-600'}`}>
                            {item.change} <span className="text-gray-400 font-normal">from last month</span>
                        </p>
                    </div>))}
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
        </div>);
}
//# sourceMappingURL=page.js.map