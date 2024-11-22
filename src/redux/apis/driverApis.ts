import { AxiosRequestConfig } from "axios";
import MainApiRequest from "./MainApiRequest";

export const driverApis = {
  create: function* (data: {
    name: string;
    type: string;
    email: string;
    phoneNumber: string;
  }): any {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json"
        // 'Authorization': `Bearer ${authorization}`,
      }
    };
    return yield MainApiRequest.post(`/drivers`, data, config);
  },

  update: function* (
    id: number,
    data: { name: string; type: string; email: string; phoneNumber: string }
  ): any {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json"
        // 'Authorization': `Bearer ${authorization}`,
      }
    };
    return yield MainApiRequest.put(`/drivers/${id}`, data, config);
  },

  delete: function* (id: number): any {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json"
        // 'Authorization': `Bearer ${authorization}`,
      }
    };
    return yield MainApiRequest.delete(`/drivers/${id}`, config);
  },

  list: function* (): any {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json"
        // 'Authorization': `Bearer ${authorization}`,
      }
    };
    return yield MainApiRequest.get(`/drivers/list`, config);
  }
};
