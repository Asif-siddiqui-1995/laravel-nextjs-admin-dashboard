"use client";

import {FaPencilAlt, FaTrash} from "react-icons/fa";
import Swal from "sweetalert2";
import {deleteUserApi} from "../../services/userService";

export default function DashboardTable({
    users,
    setEditUser,
    setModalOpen,
    fetchUsers,
    currentUser,
}) {
    const handleDelete = (user) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then(async (res) => {
            if (res.isConfirmed) {
                await deleteUserApi(user.id);
                fetchUsers();
            }
        });
    };

    return (
        <table className="w-full">
            <thead className="bg-gray-50">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            {user.roles?.map((r) => r.name).join(", ") ||
                                "No Role"}
                        </td>
                        <td className="flex gap-2">
                            <button
                                onClick={() => {
                                    setEditUser(user);
                                    setModalOpen(true);
                                }}
                            >
                                <FaPencilAlt />
                            </button>
                            <button onClick={() => handleDelete(user)}>
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
