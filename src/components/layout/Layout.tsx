import { Container, Box, Stack } from '@mui/material'
import { TopSection } from '../top/TopSection'
import { Listings } from '../listings/Listings'
import { Header } from '../header/Header';

export function Layout() {
  return (
    <Container maxWidth={false} disableGutters sx={{ minHeight: '100vh', px: 0, py: 0 }}>
      <Stack spacing={2} sx={{ minHeight: '100vh' }}>
        <Box>
          <Header/>
        </Box>
        <Box sx={{ width: '90%', height: '20vh' }}>
          <TopSection doctors={24} ambulances={56} fullHeight />
        </Box>
        <Box>
          <Listings />
        </Box>
      </Stack>
    </Container>
  )
}


