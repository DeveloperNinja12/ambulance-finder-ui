import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { type AppDispatch, type RootState } from '../../store';
import { fetchAmbulances, addAmbulance as addAmbulanceThunk, deleteAmbulance as deleteAmbulanceThunk } from './api';

export const useAmbulancesStore = () => {
  const { data, loading, error, meta } = useSelector((state: RootState) => state.ambulances);
  const dispatch = useDispatch<AppDispatch>();
  const dispatchfetchAmbulances = useCallback((payload: {limit?: number, page?: number}) => {
    return dispatch(fetchAmbulances(payload));
  }, [dispatch]);
  return { data, loading, error, meta, dispatchfetchAmbulances};
}

export const useAddAmbulance = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.ambulances);
  
  const addAmbulance = useCallback((ambulanceData: {
    vehicleNumber: string;
    vehicleType: string;
    vehicleModel: string;
    vehicleYear: number;
    vehicleColor: string;
    vehicleAssignedDriver: string;
    vehicleLocation: string;
    vehicleContactNumber: string;
    vehicleHospital: string;
  }) => {
    return dispatch(addAmbulanceThunk(ambulanceData));
  }, [dispatch]);
  
  return { addAmbulance, loading, error };
}

export const useDeleteAmbulance = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const deleteAmbulance = useCallback((ambulanceId: string) => {
    return dispatch(deleteAmbulanceThunk(ambulanceId));
  }, [dispatch]);
  
  return { deleteAmbulance };
}

