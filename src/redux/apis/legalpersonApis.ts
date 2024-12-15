import { AxiosRequestConfig } from "axios";
import MainApiRequest from "./MainApiRequest"

export const legalpersonApis = {
    create: function* (data: { name: string, adress: string, email: string, phoneNumber: string, identityNumber: string }): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.post(`/legal-persons`, data, config)
    },

    update: function* (id: number, data: { name: string, adress: string, email: string, phoneNumber: string, identityNumber: string }): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.put(`/legal-persons${id}`, data, config)
    },

    delete: function* (id: number): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.delete(`/legal-persons/${id}`, config)
    },

    list: function* (): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.get(`/legal-persons/list`, config)
    },
};