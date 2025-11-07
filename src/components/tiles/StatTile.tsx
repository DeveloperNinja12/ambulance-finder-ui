import { Paper, Typography } from '@mui/material'
import styled from 'styled-components'

const Tile = styled(Paper)<{ $accent: string }>`
  padding: 32px 24px;
  border-radius: 20px;
  border: 1px solid rgba(0,0,0,0.06);
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 200px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(p) => p.$accent};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.15);
  }

  .value {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin-top: 8px;
  }

  .number {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1;
    color: ${(p) => p.$accent};
    margin-bottom: 8px;
  }

  .title {
    margin: 0;
    color: rgba(0,0,0,0.7);
    font-weight: 600;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: center;
  }
`

type Props = {
  title: string
  value: number | string
  color?: string
  fullHeight?: boolean
}

export function StatTile({ title, value, color = '#3b82f6' }: Props) {
  return (
    <Tile elevation={0} variant="outlined" $accent={color}>
      <div className="value">
        <Typography className="number" component="div">
          {value}
        </Typography>
      </div>
      <Typography className="title" variant="body2" component="div">
        {title}
      </Typography>
    </Tile>
  )
}


