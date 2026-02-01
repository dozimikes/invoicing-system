"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
const AuthContext_1 = require("@/context/AuthContext");
require("./globals.css");
exports.metadata = {
    title: "Invoicing System",
    description: "A premium invoicing system for modern businesses.",
};
function RootLayout({ children, }) {
    return (<html lang="en">
            <body className="antialiased">
                <AuthContext_1.AuthProvider>
                    {children}
                </AuthContext_1.AuthProvider>
            </body>
        </html>);
}
//# sourceMappingURL=layout.js.map