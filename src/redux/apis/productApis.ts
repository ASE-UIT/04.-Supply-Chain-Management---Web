import { AxiosRequestConfig } from "axios";
import MainApiRequest from "./MainApiRequest"

export type CreateProductType = {
    name: string,
    quantity: number,
    unit: string,
    status: string,
    type: string,
    size: number,
    weight: number
}

export const productApis = {
    create: function* (data: CreateProductType): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.post(`/products`, data, config)
    },

    update: function* (data: CreateProductType): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.put(`/products`, data, config)
    },

    delete: function* (id: string): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.delete(`/products/${id}`, config)
    },

    list: function* (): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.get(`/products/list`, config)
    },
};