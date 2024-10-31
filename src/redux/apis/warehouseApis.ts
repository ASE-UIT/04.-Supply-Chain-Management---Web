import { AxiosRequestConfig } from "axios";
import MainApiRequest from "./MainApiRequest"

export type CreateWarehouseType = {
    name: string,
    ownerId: number,
    address: string,
    type: string,
    status: string,
    capacity: number,
    availability: boolean
}

export const warehouseApis = {
    create: function* (data: CreateWarehouseType): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.post(`/warehouses`, data, config)
    },

    update: function* (data: CreateWarehouseType): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.put(`/warehouses`, data, config)
    },

    delete: function* (id: string): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.delete(`/warehouses/${id}`, config)
    },

    list: function* (): any {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authorization}`,
            },
        }
        return yield MainApiRequest.get(`/warehouses/list`, config)
    },
};