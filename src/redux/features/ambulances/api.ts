import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../../api/http';
import apiClient from '../../../api/api-client';

export interface AmbulanceResponse {
    success: boolean;
    message: string;
    data: {
        items: Array<{
            vehicleNumber: string;
            vehicleType: string;
            vehicleModel: string;
            vehicleYear: number;
            vehicleColor: string;
            vehicleAssignedDriver: string;
            vehicleLocation: string;
            vehicleContactNumber: string;
            vehicleHospital: string;
            provider?: string;
            id?: string;
        }>;
    };
    meta: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    };
}

type queryParamsPayload = {
    page?: number,
    limit?: number,
}

export const fetchAmbulances = createAsyncThunk(
    'ambulances/fetchAmbulances',
    async (payload: queryParamsPayload = {}) => {
        let url = '/ambulances';
        const queryParams: string[] = [];
        
        if (payload.page !== undefined) {
            queryParams.push(`page=${payload.page}`);
        }
        if (payload.limit !== undefined) {
            queryParams.push(`limit=${payload.limit}`);
        }
        
        if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
        }
        
        const response = await http.post<AmbulanceResponse>(url);
        return response as unknown as AmbulanceResponse;
    }
);

export interface AddAmbulancePayload {
    vehicleNumber: string;
    vehicleType: string;
    vehicleModel: string;
    vehicleYear: number;
    vehicleColor: string;
    vehicleAssignedDriver: string;
    vehicleLocation: string;
    vehicleContactNumber: string;
    vehicleHospital: string;
}

export interface AddAmbulanceResponse {
    success: boolean;
    message: string;
    data: {
        vehicleNumber: string;
        vehicleType: string;
        vehicleModel: string;
        vehicleYear: number;
        vehicleColor: string;
        vehicleAssignedDriver: string;
        vehicleLocation: string;
        vehicleContactNumber: string;
        vehicleHospital: string;
        provider?: string;
        id: string;
    };
}

export const addAmbulance = createAsyncThunk(
    'ambulances/addAmbulance',
    async (payload: AddAmbulancePayload, { rejectWithValue }) => {
        try {
            const response = await apiClient.post<AddAmbulanceResponse>('/ambulances/add', payload);
            return response as unknown as AddAmbulanceResponse;
        } catch (error: unknown) {
            const errorData = error && typeof error === 'object' && 'message' in error 
                ? error 
                : { message: 'Failed to add ambulance' };
            return rejectWithValue(errorData);
        }
    }
);


