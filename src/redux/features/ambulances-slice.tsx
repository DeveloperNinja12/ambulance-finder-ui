import { createSlice } from '@reduxjs/toolkit';
import { fetchAmbulances, addAmbulance, deleteAmbulance } from './ambulances/api';

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
        const newItems = action.payload.data.items;
        
        if (newItems.length < state.data.length && state.data.length > 0) {
          state.meta = action.payload.meta;
        } else {
          state.data = newItems;
          state.meta = action.payload.meta;
        }
        state.error = null;
      })
      .addCase(fetchAmbulances.rejected, (state, action) => {
        state.loading = false;
        const errorMessage = action.error?.message || action.payload?.message || 'Failed to fetch ambulances';
        state.error = errorMessage;
      })
      .addCase(addAmbulance.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAmbulance.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload.data);
        state.error = null;
        if (state.meta) {
          state.meta.totalItems += 1;
          state.meta.totalPages = Math.ceil(state.meta.totalItems / state.meta.limit);
        } else {
          state.meta = {
            page: 1,
            limit: 10,
            totalItems: 1,
            totalPages: 1,
          };
        }
      })
      .addCase(addAmbulance.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteAmbulance.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAmbulance.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((ambulance) => ambulance.id !== action.payload.id);
        if (state.meta) {
          state.meta.totalItems = Math.max(0, state.meta.totalItems - 1);
          state.meta.totalPages = Math.ceil(state.meta.totalItems / state.meta.limit);
        }
        state.error = null;
      })
      .addCase(deleteAmbulance.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default ambulancesCollection.reducer;