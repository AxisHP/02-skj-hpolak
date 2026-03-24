import { useEffect, useState } from "react";
import { getUsers } from "../../api/userAPI";
import type { User } from "../../types/User";
import UserList from "./UserList";

export default function UserPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getUsers()
        .then(setUsers)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p>Nacitavam...</p>
    }

    if (error) {
        return <p>Chyba: {error}</p>
    }

    return <UserList users={users} />
}