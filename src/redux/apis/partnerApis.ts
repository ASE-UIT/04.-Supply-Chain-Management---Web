import { AxiosRequestConfig } from "axios";
import MainApiRequest from "./MainApiRequest"

export const partnerApis = {
    create: function* (data: { name: string, type: string, email: string, phoneNumber: string }): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.post(`/partners`, data, config)
    },

    update: function* (id:number, data: { name: string, type: string, email: string, phoneNumber: string }): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.put(`/partners`, data, config)
    },

    delete: function* (id: number): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.delete(`/partners/${id}`, config)
    },

    list: function* (): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.get(`/partners/list`, config)
    },
};