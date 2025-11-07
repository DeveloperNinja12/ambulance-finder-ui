import { createSlice } from '@reduxjs/toolkit';
import { fetchAmbulances, addAmbulance } from './ambulances/api';

interface IAmbulance {
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
}

interface IAmbulancesState {
  loading: boolean;
  error: string | null;
  data: Array<IAmbulance>;
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  } | null;
}

const initialAmbulancesState: IAmbulancesState = {
  loading: false,
  data: [],
  error: null,
  meta: null,
};

export const ambulancesCollection = createSlice({
  name: 'ambulances',
  initialState: initialAmbulancesState,
  reducers: {
    addAmbulance: (state, action) => {
      const newAmbulance: IAmbulance = {
        ...action.payload,
        id: action.payload.id || `ambulance-${Date.now()}`,
      };
      state.data.push(newAmbulance);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAmbulances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAmbulances.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.items;
        state.meta = action.payload.meta;
      })
      .addCase(fetchAmbulances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch ambulances';
      })
      .addCase(addAmbulance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAmbulance.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload.data);
      })
      .addCase(addAmbulance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add ambulance';
      });
  },
});

export default ambulancesCollection.reducer;