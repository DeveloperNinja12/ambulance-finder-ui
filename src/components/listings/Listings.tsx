import { Grid } from '@mui/material'
import { DoctorsList } from '../lists/doctors/DoctorsList'
import { AmbulanceList } from '../lists/ambulances/AmbulanceList'

export function Listings() {
    return (
        <Grid container spacing={2}>
            <Grid sx={{ p:4}}>
                <DoctorsList />
            </Grid>
            <Grid sx={{ p:4}}>
                <AmbulanceList />
            </Grid>
        </Grid>
    );
};