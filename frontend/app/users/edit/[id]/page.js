"use client";

import {useEffect, useState} from "react";
import {getUser, updateUser} from "../../../services/userService";
import {useParams, useRouter} from "next/navigation";

export default function EditUser() {
    const params = useParams();
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        getUser(params.id).then((res) => {
            setName(res.data.name);
            setEmail(res.data.email);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await updateUser(params.id, {name, email});

        router.push("/users");
    };

    return (
        <div>
            <h1>Edit User</h1>

            <form onSubmit={handleSubmit}>
                <input value={name} onChange={(e) => setName(e.target.value)} />

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit">Update</button>
            </form>
        </div>
    );
}
