import type { UserRole } from "./enums";

export interface User {
    publicId: string;
    name: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    phoneNumber: string;
    address: string;
    role: UserRole;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    phoneNumber: string;
    address: string;
    password: string;
}

export interface UserCreateRequest extends RegisterRequest {
    role: UserRole;
}

export interface UserUpdateRequest {
    name: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    phoneNumber: string;
    address: string;
    role: UserRole;
}
