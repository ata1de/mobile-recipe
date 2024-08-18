import { api } from "./api";
import { Recipe } from "./recipeServer";

export interface LoginUserAttributes {
    email: string,
    password: string
}
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    recipes: Recipe[];
    createdAt: Date;
}

export interface CreateUserAttributes extends Omit<User, 'id' | 'recipes' | 'createdAt'> {}

export interface AuthenticateResponse {
    isAuthenticated: boolean
}

async function login({ email, password }: LoginUserAttributes) {
    const response = await api.post<{ user: User}>('/auth/login', {
        email,
        password
    })

    return {
        status: response.status,
        user: response.data.user
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

async function check() {
    const response = await api.get('/auth/check')

    return response
}


export const userService = { login, register, check }