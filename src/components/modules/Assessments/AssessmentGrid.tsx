'use client'

import { Grid } from '@mui/material'
import { Children, ReactNode } from 'react'

type AssessmentGrid = {
  children: ReactNode
}

export default function AssessmentGrid({ children }: AssessmentGrid) {
  return (
    <Grid container spacing={4}>
      {Children.map(children, child => (
        <Grid item md={6} xs={12} sm={6} lg={3}>
          {child}
        </Grid>
      ))}
    </Grid>
  )
}
