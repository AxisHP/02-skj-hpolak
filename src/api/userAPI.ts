import type { User } from "../types/User";

const API_BASE = 'https://localhost:7286/User';

export async function getUsers(): Promise<User[]> {
    const response = await fetch(API_BASE);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json() as User[];
}