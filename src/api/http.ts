import apiClient from './api-client';
import {type AxiosRequestConfig, type AxiosResponse } from 'axios';

export const http = {
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        const response = await apiClient.get<T>(url, config) as AxiosResponse;
        return response;
    },

    post: async<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        const response = await apiClient.post<T>(url, config) as AxiosResponse;
        return response;
    }
}