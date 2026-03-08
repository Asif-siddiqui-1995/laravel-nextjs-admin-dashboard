"use client";
import {useRouter} from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await logoutUser();

            localStorage.removeItem("token");

            Swal.fire("Success", "Logged out successfully", "success");

            router.push("/login");
        } catch (error) {
            localStorage.removeItem("token");
            router.push("/login");
        }
    };
    return (
        <div className="h-16 bg-white shadow flex items-center justify-end px-6 gap-4">
            <div className="flex items-center gap-2">
                <img
                    src="https://i.pravatar.cc/30"
                    className="rounded-full"
                    alt="Admin"
                />
                <span className="text-black font-medium">Admin</span>
            </div>

            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
                Logout
            </button>
        </div>
    );
}
