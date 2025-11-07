import { useSelector } from 'react-redux';
import { Container, Box, Stack } from '@mui/material'
import { TopSection } from '../top/TopSection'
import { Listings } from '../listings/Listings'
import { Header } from '../header/Header';
import { type RootState } from '../../redux/store';

export function Layout() {
  const doctorsMeta = useSelector((state: RootState) => state.doctors.meta);
  const ambulancesMeta = useSelector((state: RootState) => state.ambulances.meta);
  const doctorsLoading = useSelector((state: RootState) => state.doctors.loading);
  const ambulancesLoading = useSelector((state: RootState) => state.ambulances.loading);
  
  const doctorsCount = doctorsMeta?.totalItems ?? 0;
  const ambulancesCount = ambulancesMeta?.totalItems ?? 0;

  return (
    <Container maxWidth={false} disableGutters sx={{ minHeight: '100vh', px: 0, py: 0 }}>
      <Stack spacing={2} sx={{ minHeight: '100vh' }}>
        <Box>
          <Header/>
        </Box>
        <Box sx={{ width: '100%', height: '20vh' }}>
          <TopSection 
            doctors={doctorsCount} 
            ambulances={ambulancesCount}
            doctorsLoading={doctorsLoading || doctorsMeta === null}
            ambulancesLoading={ambulancesLoading || ambulancesMeta === null}
          />
        </Box>
        <Box>
          <Listings />
        </Box>
      </Stack>
    </Container>
  )
}


