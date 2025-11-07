import { Grid } from '@mui/material'
import { StatTile } from '../tiles/StatTile'

type Props = {
  doctors: number
  ambulances: number
}

export function TopSection({ doctors, ambulances }: Props) {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid>
        <StatTile title="Doctors" value={doctors} color="#0ea5e9" />
      </Grid>
      <Grid>
        <StatTile title="Ambulances" value={ambulances} color="#22c55e" />
      </Grid>
    </Grid>
  )
}


