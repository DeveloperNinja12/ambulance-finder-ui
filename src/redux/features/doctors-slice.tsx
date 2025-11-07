import { createSlice } from '@reduxjs/toolkit';
import { fetchDoctors, addDoctor } from './doctors/api';

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
        state.data = action.payload.data.items.map((doctor) => ({
          ...doctor,
          fees: String(doctor.fees),
        }));
        state.meta = action.payload.meta;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch doctors';
      })
      .addCase(addDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDoctor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add doctor';
      });
  },
});

export default doctorsCollection.reducer;