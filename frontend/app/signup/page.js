"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

export default function SignupPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            return Swal.fire(
                "Validation",
                "All fields are required",
                "warning",
            );
        }

        if (password !== confirmPassword) {
            return Swal.fire("Validation", "Passwords do not match", "error");
        }

        try {
            setLoading(true);

            const res = await axios.post("http://127.0.0.1:8000/api/signup", {
                name: name,
                email: email,
                password: password,
            });

            Swal.fire("Account Created", "You can now login", "success");

            router.push("/login");
        } catch (error) {
            Swal.fire(
                "Signup Failed",
                error.response?.data?.message || "Something went wrong",
                "error",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-200 to-white">
            <div className="w-[380px] backdrop-blur-lg bg-white/60 border border-white/40 shadow-xl rounded-2xl p-8">
                <h2 className="text-center text-xl font-semibold mb-2 text-black">
                    Create Account
                </h2>

                <p className="text-center text-gray-500 text-sm mb-6">
                    Sign up to access the admin dashboard
                </p>

                <form onSubmit={handleSignup} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?
                    <span
                        className="text-blue-600 cursor-pointer ml-1 font-medium"
                        onClick={() => router.push("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}
