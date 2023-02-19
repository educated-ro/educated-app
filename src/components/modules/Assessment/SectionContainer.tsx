'use client'

import React from 'react'
import { AssessmentSection } from '@/types/assessment'
import QuestionWrapper from '@/components/modules/Assessment/AssesmentQuestions'
import { Box, Stack, Typography } from '@mui/material'

type SectionContainerProps = {
  sections: AssessmentSection[]
}

const SectionHeader = ({ title, points, description }: Partial<AssessmentSection>) => {
  if (!title && !points && !description) return null

  return (
    <Box sx={{ p: 4, backgroundColor: '#fff', boxShadow: '0px 5.44477px 15px rgba(0, 0, 0, 0.02)', borderTopLeftRadius: 12, borderTopRightRadius: 12, borderBottom: '1px solid #EBEFF3' }}>
      <Stack direction='row' justifyContent='space-between'>
        <Typography fontWeight={600}>{title}</Typography>
        <Typography fontWeight={600} color='#0967DC'>
          {points} puncte
        </Typography>
      </Stack>
      {Boolean(description) && (
        <Typography color='#556B86' mt={2}>
          {description}
        </Typography>
      )}
    </Box>
  )
}

export default function SectionContainer({ sections }: SectionContainerProps) {
  return (
    <Stack gap={5}>
      {sections.map(({ items, ...others }, i) => (
        <Box key={`section-${i}`}>
          <SectionHeader {...others} />
          <Stack>
            {items?.map((item, i) => (
              <QuestionWrapper key={item.requirement} position={i + 1} isLastItem={i === items.length - 1} {...item} />
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  )
}
