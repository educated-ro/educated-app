import React from 'react'
import { SectionItem } from '@/types/assessment'
import QuestionMedia from '@/components/modules/Assessment/AssesmentQuestions/QuestionMedia'
import QuestionFields from '@/components/modules/Assessment/AssesmentQuestions/Fields'
import RequirementText from '@/components/modules/Assessment/Requirement/RequirementText'
import { Box, Stack, Typography } from '@mui/material'

type QuestionWrapperProps = SectionItem & {
  position: number | string
  showBorders?: boolean
  isLastItem?: boolean
}

export default function QuestionWrapper(props: QuestionWrapperProps) {
  const { requirement, position, subItems, type, media, showBorders = true, isLastItem = false, ...others } = props

  if (type === 'with-sub-items') {
    if (!subItems) return null

    return (
      <Box sx={{ backgroundColor: '#fff', p: 4, ...(!isLastItem ? { borderBottom: `1px solid ${showBorders ? '#EBEFF3' : '#fff'}` } : { boxShadow: '0px 5.44477px 15px rgba(0, 0, 0, 0.02)' }) }}>
        <Stack direction='row'>
          <Stack direction='row' gap={1}>
            <Typography color='#0868DC' fontWeight={700} fontSize={18}>
              {position}.
            </Typography>
            <Box flexGrow={1} sx={{ textAlign: 'justify' }}>
              <RequirementText content={requirement} />
              <Box>
                {subItems.map((item, id) => (
                  <QuestionWrapper key={item.requirement} position={String.fromCharCode(97 + id)} {...item} id={`studentAnswer.sub-${item.id}`} showBorders={false} />
                ))}
              </Box>
            </Box>

            <QuestionMedia media={media} />
          </Stack>
        </Stack>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        ...(!isLastItem
          ? { borderBottom: `1px solid ${showBorders ? '#EBEFF3' : '#fff'}` }
          : { borderBottomLeftRadius: 12, borderBottomRightRadius: 12, boxShadow: '0px 5.44477px 15px rgba(0, 0, 0, 0.02)' }),
        backgroundColor: '#fff',
      }}
    >
      <Stack direction='row' sx={{ px: showBorders ? 4 : 0, py: 3 }}>
        <Stack direction='row' gap={1} alignItems='baseline'>
          <Typography color='#0868DC' fontWeight={700} fontSize={18}>
            {position}.
          </Typography>
          <Box flexGrow={1} sx={{ textAlign: 'justify' }}>
            <RequirementText content={requirement} />
          </Box>
        </Stack>
        <QuestionMedia media={media} />
      </Stack>

      <Box sx={{ px: showBorders ? 6 : 3, pb: 3 }}>
        <QuestionFields type={type} {...others} />
      </Box>
    </Box>
  )
}
