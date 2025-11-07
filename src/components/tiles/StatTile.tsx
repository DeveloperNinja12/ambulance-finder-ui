import { Paper, Typography } from '@mui/material'
import styled from 'styled-components'

const Tile = styled(Paper)<{ $accent: string }>`
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.08);
  background: #ffffff;
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;
  width: 30rem;

  h6 {
    margin: 0;
    color: rgba(0,0,0,0.65);
    font-weight: 600;
  }
  .value {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: ${(p) => p.$accent};
  }
`

type Props = {
  title: string
  value: number | string
  color?: string
  fullHeight?: boolean
}

export function StatTile({ title, value, color = '#3b82f6', fullHeight }: Props) {
  return (
    <Tile elevation={0} variant="outlined" $accent={color} style={{ height: fullHeight ? '100%' : undefined }}>
      <Typography variant="subtitle1" component="h6">
        {title}
      </Typography>
      <div className="value">
        <div className="dot" />
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
      </div>
    </Tile>
  )
}


