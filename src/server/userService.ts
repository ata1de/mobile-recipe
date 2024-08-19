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

export interface UpdateUserResponse {
    user: string[]
}

export interface UpdateUserRequest extends Omit<User, 'recipes' | 'createdAt'> {}

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
    const response = await api.get<AuthenticateResponse>('/auth/check')

    return {
        isAuthenticated: response.data.isAuthenticated
    }
}

async function update(data: UpdateUserRequest) {
    const response = await api.put<UpdateUserResponse>(`/user/${data.id}`, data)

    console.log(response.data)

    return {
        user: response.data.user[0],
        status: response.status
    }
}

async function logOut() {
    const response = await api.post('/auth/logout')

    return response
}

async function getUser(id: number) {
    const response = await api.get<User>(`/user/${id}`)

    console.log(response.data)

    return response.data
}


export const userService = { login, register, check, update, logOut, getUser }