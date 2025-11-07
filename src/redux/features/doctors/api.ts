import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../../api/http';
import apiClient from '../../../api/api-client';

export interface DoctorResponse {
    success: boolean;
    message: string;
    data: {
        items: Array<{
            doctorName: string;
            designation: string;
            location: string;
            careerObject: string;
            qualifications: Array<string>;
            experience: string;
            fees: number;
            availability: string;
            languages: Array<string>;
            email: string;
            id: string;
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

export const fetchDoctors = createAsyncThunk(
    'doctors/fetchDoctors',
    async (payload: queryParamsPayload = {}) => {
        let url = '/doctors';
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
        
        const response = await http.post<DoctorResponse>(url, {});
        return response as unknown as DoctorResponse;
    }
);

export interface AddDoctorPayload {
    doctorName: string;
    designation: string;
    location: string;
    careerObject: string;
    qualifications: string[];
    experience: string;
    fees: number;
    availability: string;
    languages: string[];
    email: string;
}

export interface AddDoctorResponse {
    success: boolean;
    message: string;
    data?: unknown;
}

export const addDoctor = createAsyncThunk(
    'doctors/addDoctor',
    async (payload: AddDoctorPayload, { rejectWithValue }) => {
        try {
            const response = await apiClient.post<AddDoctorResponse>('/doctors/add', payload);
            return response as unknown as AddDoctorResponse;
        } catch (error: unknown) {
            const errorData = error && typeof error === 'object' && 'message' in error 
                ? error 
                : { message: 'Failed to add doctor' };
            return rejectWithValue(errorData);
        }
    }
);

export interface DeleteDoctorPayload {
    id: string;
}

export interface DeleteDoctorResponse {
    success: boolean;
    message: string;
}

export const deleteDoctor = createAsyncThunk(
    'doctors/deleteDoctor',
    async (doctorId: string, { rejectWithValue }) => {
        try {
            const payload: DeleteDoctorPayload = { id: doctorId };
            const response = await apiClient.delete<DeleteDoctorResponse>('/doctors/delete', { data: payload });
            return { id: doctorId, response: response as unknown as DeleteDoctorResponse };
        } catch (error: unknown) {
            const errorData = error && typeof error === 'object' && 'message' in error 
                ? error 
                : { message: 'Failed to delete doctor' };
            return rejectWithValue(errorData);
        }
    }
);

