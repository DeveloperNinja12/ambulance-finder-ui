import * as React from 'react';
import { useSelector } from 'react-redux';
import { Container, Box, Stack } from '@mui/material'
import { TopSection } from '../top/TopSection'
import { Listings } from '../listings/Listings'
import { Header } from '../header/Header';
import { useDoctorsStore } from '../../redux/features/doctors/hooks';
import { useAmbulancesStore } from '../../redux/features/ambulances/hooks';
import { type RootState } from '../../redux/store';

export function Layout() {
  const { dispatchfetchDoctors } = useDoctorsStore();
  const { dispatchfetchAmbulances } = useAmbulancesStore();

  const doctorsCount = useSelector((state: RootState) => state.doctors.meta?.totalItems ?? 0);
  const ambulancesCount = useSelector((state: RootState) => state.ambulances.meta?.totalItems ?? 0);

  React.useEffect(() => {
    dispatchfetchDoctors({ page: 1, limit: 1 });
    dispatchfetchAmbulances({ page: 1, limit: 1 });
  }, [dispatchfetchDoctors, dispatchfetchAmbulances]);

  return (
    <Container maxWidth={false} disableGutters sx={{ minHeight: '100vh', px: 0, py: 0 }}>
      <Stack spacing={2} sx={{ minHeight: '100vh' }}>
        <Box>
          <Header/>
        </Box>
        <Box sx={{ width: '100%', height: '20vh' }}>
          <TopSection doctors={doctorsCount} ambulances={ambulancesCount} />
        </Box>
        <Box>
          <Listings />
        </Box>
      </Stack>
    </Container>
  )
}


