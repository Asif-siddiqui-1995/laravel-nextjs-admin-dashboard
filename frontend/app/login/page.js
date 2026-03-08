"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // LOGIN FUNCTION
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return Swal.fire(
                "Validation",
                "Email and Password required",
                "warning",
            );
        }

        try {
            setLoading(true);

            const res = await axios.post("http://127.0.0.1:8000/api/login", {
                email: email,
                password: password,
            });

            const token = res.data.token;

            // Save token
            localStorage.setItem("token", token);

            Swal.fire("Success", "Login successful", "success");

            // Redirect to dashboard
            router.push("/dashboard");
        } catch (error) {
            Swal.fire(
                "Login Failed",
                error.response?.data?.message || "Invalid credentials",
                "error",
            );
        } finally {
            setLoading(false);
        }
    };

    // LOGOUT FUNCTION

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-200 to-white">
            <div className="w-[380px] backdrop-blur-lg bg-white/60 border border-white/40 shadow-xl rounded-2xl p-8">
                <h2 className="text-center text-xl font-semibold mb-2 text-black">
                    Sign in with email
                </h2>

                <p className="text-center text-gray-500 text-sm mb-6">
                    Login to access your admin dashboard
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Already have an account?
                        <span
                            className="text-blue-600 cursor-pointer ml-1"
                            onClick={() => router.push("/signup")}
                        >
                            Sign up here
                        </span>
                    </p>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90"
                    >
                        {loading ? "Signing in..." : "Get Started"}
                    </button>
                </form>
            </div>
        </div>
    );
}
