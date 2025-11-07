import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { type AppDispatch, type RootState } from '../../store';
import { fetchDoctors, addDoctor as addDoctorThunk, deleteDoctor as deleteDoctorThunk } from './api';

export const useDoctorsStore = () => {
  const { data, loading, error, meta } = useSelector((state: RootState) => state.doctors);
  const dispatch = useDispatch<AppDispatch>();
  const dispatchfetchDoctors = useCallback((payload: {limit?: number, page?: number}) => {
    return dispatch(fetchDoctors(payload));
  }, [dispatch]);
  return { data, loading, error, meta, dispatchfetchDoctors};
}

export const useAddDoctor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.doctors);
  
  const addDoctor = useCallback((doctorData: {
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
  }) => {
    return dispatch(addDoctorThunk(doctorData));
  }, [dispatch]);
  
  return { addDoctor, loading, error };
}

export const useDeleteDoctor = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const deleteDoctor = useCallback((doctorId: string) => {
    return dispatch(deleteDoctorThunk(doctorId));
  }, [dispatch]);
  
  return { deleteDoctor };
}

