import { api } from "./api";

export interface LoginUserAttributes {
    email: string,
    password: string
}

export interface CreateUserAttributes {
    name: string
    email: string,
    password: string
}

async function login({ email, password }: LoginUserAttributes) {
    const response = await api.post('/auth/login', {
        email,
        password
    })

    return {
        status: response.status,
    }
}

async function register({ name, email, password }: CreateUserAttributes ) {
    const response = await api.post('/auth/register', {
        name,
        email,
        password
    })

    return {
        status: response.status
    }
}


export const userService = { login, register }