import { Grid } from '@mui/material'
import { DoctorsList } from '../lists/doctors/DoctorsList'
import { AmbulanceList } from '../lists/ambulances/AmbulanceList'

export function Listings() {
    return (
        <Grid container spacing={2} sx={{ p: 4 }}>
            <Grid item size={12}>
                <DoctorsList />
            </Grid>
            <Grid item size={12}>
                <AmbulanceList />
            </Grid>
        </Grid>
    );
};