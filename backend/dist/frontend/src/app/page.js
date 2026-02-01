"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
function Home() {
    return (<main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-white to-gray-100">
            <div className="z-10 max-w-5xl w-full items-center justify-center text-center font-mono text-sm">
                <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 sm:text-7xl mb-8">
                    Invoicing <span className="text-blue-600">Reimagined</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                    Manage your clients, generate professional invoices, and track payments with our modern, premium invoicing platform.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="/login" className="rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-xl hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all transform hover:scale-105 active:scale-95">
                        Get Started
                    </a>
                    <a href="/about" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors">
                        Learn more <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
                {[
            { title: "Fast Invoicing", desc: "Create and send invoices in seconds with our intuitive interface." },
            { title: "Client Management", desc: "Keep track of all your clients and their payment history in one place." },
            { title: "Instant Insights", desc: "Real-time analytics to help you understand your business growth." }
        ].map((feature, i) => (<div key={i} className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                        <p className="text-gray-600">{feature.desc}</p>
                    </div>))}
            </div>
        </main>);
}
//# sourceMappingURL=page.js.map