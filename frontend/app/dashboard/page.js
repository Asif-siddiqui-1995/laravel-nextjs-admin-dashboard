"use client";

import {useState, useEffect} from "react";
import Layout from "../components/Layout";
import {FaPencilAlt, FaTrash} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

import {
    getUsers,
    createUser,
    updateUser,
    deleteUserApi,
    logoutUser,
} from "../services/userService";

import {useRouter} from "next/navigation";

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        showPassword: false,
    });

    const router = useRouter();

    // Fetch Current User Profile
    const fetchProfile = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setCurrentUser(res.data.user);
        } catch (error) {
            console.error("Failed to fetch profile");
        }
    };

    // Fetch Users
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await getUsers();
            setUsers(res.data);
        } catch (error) {
            Swal.fire("Error", "Failed to load users", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        fetchProfile();
        fetchUsers();
    }, []);

    // Open Add Modal
    const openAddModal = () => {
        setEditUser(null);
        setForm({
            name: "",
            email: "",
            password: "",
            role: "",
            showPassword: false,
        });
        setModalOpen(true);
    };

    // Open Edit Modal
    const openEditModal = (user) => {
        setEditUser(user);
        setForm({
            name: user.name || "",
            email: user.email || "",
            password: "",
            role: user.roles?.length > 0 ? user.roles[0].name : "",
            showPassword: false,
        });
        setModalOpen(true);
    };

    // Handle Change
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Save User
    const saveUser = async () => {
        try {
            if (!form.name || !form.email) {
                return Swal.fire(
                    "Validation",
                    "Name and Email required",
                    "warning",
                );
            }

            const payload = {
                name: form.name,
                email: form.email,
                ...(form.password && {password: form.password}),
            };

            if (
                currentUser?.roles?.some((r) => r.name === "admin") &&
                form.role
            ) {
                payload.role = form.role;
            }

            if (editUser) {
                await updateUser(editUser.id, payload);
            } else {
                await createUser(payload);
            }

            fetchUsers();
            setModalOpen(false);
            Swal.fire("Success", "User saved successfully", "success");
        } catch (error) {
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    // Delete User
    const deleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteUserApi(user.id);
                    fetchUsers();
                    Swal.fire("Deleted!", "User has been deleted.", "success");
                } catch (error) {
                    Swal.fire("Error", "Delete failed", "error");
                }
            }
        });
    };

    return (
        <Layout>
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-semibold text-black">Users</h1>

                <button
                    onClick={openAddModal}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                    + Add New
                </button>
            </div>

            {/* TABLE */}

            <div className="bg-white shadow rounded-xl overflow-hidden">
                {loading ? (
                    <div className="p-6 text-center text-gray-500">
                        Loading users...
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-6 py-4 text-black">
                                    Name
                                </th>
                                <th className="text-left px-6 py-4 text-black">
                                    Email
                                </th>
                                <th className="text-left px-6 py-4 text-black">
                                    Roles
                                </th>
                                <th className="text-center px-6 py-4 text-black">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 text-black">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 text-black">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-4 text-black">
                                        {user.roles && user.roles.length > 0
                                            ? user.roles
                                                  .map((r) => r.name)
                                                  .join(", ")
                                            : "No Role"}
                                    </td>

                                    <td className="px-6 py-4 flex justify-center gap-3">
                                        <button
                                            onClick={() => openEditModal(user)}
                                            className="bg-blue-50 p-2 rounded hover:bg-blue-100"
                                        >
                                            <FaPencilAlt className="text-blue-600" />
                                        </button>

                                        <button
                                            onClick={() => deleteUser(user)}
                                            className="bg-red-50 p-2 rounded hover:bg-red-100"
                                        >
                                            <FaTrash className="text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* MODAL */}

            {modalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/40"
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-xl w-[420px] p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-6 text-black">
                            {editUser ? "Edit User" : "Add User"}
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-black mb-1">
                                    Enter Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2.5 rounded-lg text-black focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-1">
                                    Enter Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2.5 rounded-lg text-black focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Role Dropdown — only for admin */}
                            {currentUser?.roles?.some(
                                (r) => r.name === "admin",
                            ) && (
                                <div>
                                    <label className="block text-sm font-medium text-black mb-1">
                                        Select Role
                                    </label>
                                    <select
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2.5 rounded-lg text-black focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">
                                            -- Select Role --
                                        </option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                        <option value="guest">Guest</option>
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-black mb-1">
                                    Enter Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            form.showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2.5 rounded-lg text-black focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span
                                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                                        onClick={() =>
                                            setForm({
                                                ...form,
                                                showPassword:
                                                    !form.showPassword,
                                            })
                                        }
                                    >
                                        {form.showPassword ? "Hide" : "Show"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={saveUser}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
