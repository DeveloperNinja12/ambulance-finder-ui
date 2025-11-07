import { Grid } from '@mui/material'
import { StatTile } from '../tiles/StatTile'

type Props = {
  doctors: number
  ambulances: number
  fullHeight?: boolean
}

export function TopSection({ doctors, ambulances, fullHeight }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid>
        <StatTile title="Doctors" value={doctors} color="#0ea5e9" fullHeight={fullHeight} />
      </Grid>
      <Grid>
        <StatTile title="Ambulances" value={ambulances} color="#22c55e" fullHeight={fullHeight} />
      </Grid>
    </Grid>
  )
}


