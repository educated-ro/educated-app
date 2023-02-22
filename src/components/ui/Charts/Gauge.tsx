import { useGauge } from 'use-gauge'
import { Box } from '@mui/material'
import React from 'react'
import './Gauge.styles.css'

type GaugeProps = {
  startAngle: number
  endAngle: number
  numTicks?: number
  diameter?: number
  domain: [minValue: number, maxValue: number]
  value: number
  gradient: [start: string, end: string]
}
export default function Gauge({ startAngle, endAngle, numTicks = 0, diameter = 10, domain, value, gradient }: GaugeProps) {
  const { ticks, valueToAngle, getTickProps, getArcProps, getSVGProps } = useGauge({
    startAngle,
    endAngle,
    numTicks,
    diameter,
    domain,
  })

  return (
    <Box>
      <svg {...getSVGProps()} style={{ width: '100%', overflow: 'visible', display: 'block' }}>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor={gradient[0]} />
            <stop offset='100%' stopColor={gradient[1]} />
          </linearGradient>
        </defs>

        <g id='arcs'>
          <path
            {...getArcProps({
              startAngle: startAngle,
              endAngle: endAngle,
              offset: 25,
            })}
            fill='none'
            className='stroke-gray-200'
            strokeLinecap='round'
            strokeWidth={24}
          />
          <path
            {...getArcProps({
              startAngle: startAngle,
              endAngle: valueToAngle(value),
              offset: 25,
            })}
            fill='none'
            stroke='url(#gradient)'
            strokeLinecap='round'
            strokeWidth={24}
          />
        </g>
        <g id='ticks'>
          {ticks.map(angle => {
            return (
              <React.Fragment key={`tick-group-${angle}`}>
                <line className='stroke-gray-300' strokeWidth={2} {...getTickProps({ angle, length: 6 })} key='line' />
              </React.Fragment>
            )
          })}
        </g>

        <g id='text'>
          <text style={{ fontSize: 45, marginLeft: -10, fontWeight: 'bold', fill: '#2E66D5' }} x='1%' dominantBaseline='middle' textAnchor='middle'>
            {value}
          </text>
        </g>
      </svg>
    </Box>
  )
}
