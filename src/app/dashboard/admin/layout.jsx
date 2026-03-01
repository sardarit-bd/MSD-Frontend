"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    BookOpen,
    Activity,
    Database,
    BarChart3,
    ChevronDown,
    FolderTree
} from "lucide-react";
import { NodeProvider } from "../context/NodeContext";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if user is admin
        const token = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("user");

        if (!token || !userData) {
            router.push("/login");
            return;
        }

        try {
            const parsedUser = JSON.parse(userData);
            if (parsedUser.role !== "admin") {
                router.push("/");
            } else {
                setUser(parsedUser);
            }
        } catch (error) {
            router.push("/login");
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        router.push("/login");
    };

    const navigation = [
        { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Content Structure", href: "/dashboard/admin/nodes", icon: FolderTree },
        { name: "Users", href: "/dashboard/admin/users", icon: Users },
        { name: "Medical Topics", href: "/dashboard/admin/medical-topics", icon: BookOpen },
        { name: "Procedures", href: "/dashboard/admin/procedures", icon: Activity },
        { name: "Resources", href: "/dashboard/admin/resources", icon: Database },
        { name: "Commentary", href: "/dashboard/admin/commentary", icon: FileText },
        { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
        { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <NodeProvider>
            <div className="min-h-screen bg-gray-50">
                {/* Mobile sidebar backdrop */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <div
                    className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex h-16 items-center justify-between border-b px-4">
                        <h1 className="text-xl font-bold text-blue-600">MediAdmin</h1>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="rounded-lg p-1 hover:bg-gray-100 lg:hidden"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <nav className="mt-4 space-y-1 px-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <Icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </Link>
                            );
                        })}

                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Logout
                        </button>
                    </nav>

                    <div className="absolute bottom-0 left-0 right-0 border-t bg-gray-50 p-4">
                        <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                {user.name?.charAt(0) || "A"}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                <span className="text-xs text-blue-600 font-medium">{user.role}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="lg:pl-64">
                    {/* Top bar */}
                    <header className="sticky top-0 z-10 bg-white shadow-sm">
                        <div className="flex h-16 items-center justify-between px-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
                            >
                                <Menu className="h-5 w-5" />
                            </button>

                            <div className="flex items-center space-x-4 ml-auto">
                                <span className="text-sm text-gray-600">
                                    Welcome, {user.name}!
                                </span>
                                <div className="relative">
                                    <button className="flex items-center space-x-2 text-sm">
                                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                            {user.name?.charAt(0) || "A"}
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="p-6">
                        {children}
                    </main>
                </div>
            </div>
        </NodeProvider>
    );
}