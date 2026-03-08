"use client";

import {useState} from "react";
import {createUser} from "../../services/userService";
import {useRouter} from "next/navigation";

export default function CreateUser() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createUser({name, email});

        router.push("/users");
    };

    return (
        <div>
            <h1>Create User</h1>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit">Save</button>
            </form>
        </div>
    );
}
