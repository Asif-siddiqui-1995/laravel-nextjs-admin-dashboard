"use client";

import {useEffect, useState} from "react";
import {getUsers} from "../services/userService";
import Layout from "../components/Layout";
import Link from "next/link";

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then((res) => {
            setUsers(res.data);
        });
    }, []);

    return (
        <Layout>
            <h1>Users</h1>

            <Link href="/users/create">Add User</Link>

            {users.map((user) => (
                <div key={user.id}>
                    {user.name} - {user.email}
                    <Link href={`/users/edit/${user.id}`}>Edit</Link>
                </div>
            ))}
        </Layout>
    );
}
