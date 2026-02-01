"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SettingsPage;
const react_1 = __importDefault(require("react"));
const AuthContext_1 = require("@/context/AuthContext");
function SettingsPage() {
    const { user } = (0, AuthContext_1.useAuth)();
    return (<div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1 text-sm">Manage your account preferences and security settings.</p>
            </div>

            <div className="space-y-6">
                <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Profile Information</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                            <input type="text" defaultValue="User" disabled className="block w-full rounded-xl border-gray-100 bg-gray-50 py-3 px-4 text-gray-500 shadow-sm sm:text-sm border"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input type="email" value={user?.email || ""} disabled className="block w-full rounded-xl border-gray-100 bg-gray-50 py-3 px-4 text-gray-500 shadow-sm sm:text-sm border"/>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-all">
                            Save Changes
                        </button>
                    </div>
                </section>

                <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Security</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-4 border-b border-gray-50">
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">Two-Factor Authentication</p>
                                <p className="text-gray-500 text-xs">Add an extra layer of security to your account.</p>
                            </div>
                            <button className="text-blue-600 font-semibold text-sm hover:underline">Enable</button>
                        </div>
                        <div className="flex items-center justify-between py-4 border-b border-gray-50">
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">Change Password</p>
                                <p className="text-gray-500 text-xs">Update your login credentials regularly.</p>
                            </div>
                            <button className="text-blue-600 font-semibold text-sm hover:underline">Update</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map