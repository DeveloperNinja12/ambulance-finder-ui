import { createSlice } from '@reduxjs/toolkit';
import { fetchDoctors, addDoctor, deleteDoctor } from './doctors/api';

interface IDoctor {
  doctorName: string;
  designation: string;
  location: string;
  careerObject: string;
  qualifications: Array<string>;
  experience: string;
  fees: string;
  availability: string;
  languages: Array<string>;
  email: string;
  id: string;

}

interface IDoctorState {
  loading: boolean;
  error: string | null;
  data: Array<IDoctor>;
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  } | null;
}
const initialDoctorsState: IDoctorState = {
  loading: false,
  data: [],
  error: null,
  meta: null,
};

export const doctorsCollection = createSlice({
  name: 'doctors',
  initialState: initialDoctorsState,
  reducers: {
    addDoctor: (state, action) => {
      const newDoctor: IDoctor = {
        ...action.payload,
        id: action.payload.id || `doctor-${Date.now()}`,
        fees: typeof action.payload.fees === 'number' ? String(action.payload.fees) : action.payload.fees,
      };
      state.data.push(newDoctor);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        const newItems = action.payload.data.items.map((doctor) => ({
          ...doctor,
          fees: String(doctor.fees),
        }));
        
        if (newItems.length < state.data.length && state.data.length > 0) {
          state.meta = action.payload.meta;
        } else {
          state.data = newItems;
          state.meta = action.payload.meta;
        }
        state.error = null;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        const errorMessage = action.error?.message || action.payload?.message || 'Failed to fetch doctors';
        state.error = errorMessage;
      })
      .addCase(addDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDoctor.fulfilled, (state) => {
        state.loading = false;
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
      .addCase(addDoctor.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((doctor) => doctor.id !== action.payload.id);
        if (state.meta) {
          state.meta.totalItems = Math.max(0, state.meta.totalItems - 1);
          state.meta.totalPages = Math.ceil(state.meta.totalItems / state.meta.limit);
        }
        state.error = null;
      })
      .addCase(deleteDoctor.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default doctorsCollection.reducer;