"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen bg-blue-600 text-white fixed left-0 top-0 p-5">
            <h2 className="text-xl font-bold mb-8">Admin Dashboard</h2>

            <nav className="flex flex-col gap-4">
                <Link
                    href="/dashboard"
                    className={`p-2 rounded ${
                        pathname === "/dashboard"
                            ? "bg-blue-800"
                            : "hover:bg-blue-500"
                    }`}
                >
                    Dashboard
                </Link>

                <Link
                    href="/dashboard"
                    className={`p-2 rounded ${
                        pathname === "" ? "bg-blue-800" : "hover:bg-blue-500"
                    }`}
                >
                    Users
                </Link>
            </nav>
        </div>
    );
}
