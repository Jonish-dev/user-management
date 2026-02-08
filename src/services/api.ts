import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type { User, UserFormData } from "@/types/user";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";


class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    public async get<T>(url: string): Promise<T> {
        const response: AxiosResponse<T> = await this.api.get(url);
        return response.data;
    }

    public async post<T>(url: string, data: unknown): Promise<T> {
        const response: AxiosResponse<T> = await this.api.post(url, data);
        return response.data;
    }

    public async put<T>(url: string, data: unknown): Promise<T> {
        const response: AxiosResponse<T> = await this.api.put(url, data);
        return response.data;
    }

    public async delete<T>(url: string): Promise<T> {
        const response: AxiosResponse<T> = await this.api.delete(url);
        return response.data;
    }
}

export const apiService = new ApiService();

export const userService = {
    getAll: () => apiService.get<User[]>("/users"),
    getById: (id: string) => apiService.get<User>(`/users/${id}`),
    create: (user: UserFormData) => apiService.post<User>("/users", user),
    update: (id: string, user: UserFormData) => apiService.put<User>(`/users/${id}`, user),
    delete: (id: string) => apiService.delete<void>(`/users/${id}`),
};
