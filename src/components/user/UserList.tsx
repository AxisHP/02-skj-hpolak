import { NavLink } from "react-router-dom";
import type { User } from "../../types/User";

interface UserListProps {
    users: User[];
}

export default function UserList({ users }: UserListProps) {
    return (
        <ul>
            {users.map(u => (
                <li key={u.id}>
                    <NavLink to={`/user-detail/${u.id}`} className="text-decoration-none">
                        <strong>{u.name}</strong> - {u.email} 
                        {u.isActive ? ' (Active)' : ' (Inactive)'}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}