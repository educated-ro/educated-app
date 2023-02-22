import { Avatar, Badge, Box, Popover, Stack, TextField, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import React, { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import useUserSession from '@/hooks/useUserSession'
import moment from 'moment'
import { hasRightsToCorrectAssessment } from '@/utils/assessments'
import { AssessmentSessionComment } from '@/types/assessment'

type QuestionActionsProps = {
  id: string
}

export default function QuestionActions({ id }: QuestionActionsProps) {
  const { setValue, watch } = useFormContext()

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const input = useRef<HTMLInputElement | null>(null)

  const user = useUserSession()

  if (!hasRightsToCorrectAssessment(user.role)) return null

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNewComments = () => {
    if (!input.current) return null

    setValue(`studentAnswer.pb-${id}.comments`, [
      ...comments,
      {
        user: {
          name: user.name,
          image: user.image,
        },
        date: new Date(),
        comment: input.current.value,
      },
    ])

    input.current.value = ''
  }

  const open = Boolean(anchorEl)

  const exerciseState = watch(`studentAnswer.pb-${id}.state`)
  const comments: AssessmentSessionComment[] = watch(`studentAnswer.pb-${id}.comments`) ?? []

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' px={6} py={3} alignItems='center'>
        <Stack direction='row' gap={3}>
          <IconButton
            size='small'
            onClick={() => setValue(`studentAnswer.pb-${id}.state`, 'correct')}
            sx={{
              width: 35,
              height: 35,
              ...(exerciseState === 'correct'
                ? {
                    backgroundColor: '#5AC450',
                    color: '#fff',
                    borderColor: '#5AC450',
                  }
                : {
                    backgroundColor: '#E5EBF2',
                    color: '#67809E',
                  }),
              '&:hover': {
                backgroundColor: '#5AC450',
                color: '#fff',
                borderColor: '#5AC450',
                transition: '0.5s',
              },
            }}
          >
            <CheckIcon />
          </IconButton>

          <IconButton
            size='small'
            onClick={() => setValue(`studentAnswer.pb-${id}.state`, 'wrong')}
            sx={{
              width: 35,
              height: 35,
              ...(exerciseState === 'wrong'
                ? {
                    backgroundColor: '#EC6560',
                    color: '#fff',
                    borderColor: '#EC6560',
                  }
                : {
                    backgroundColor: '#E5EBF2',
                    color: '#67809E',
                  }),
              '&:hover': {
                backgroundColor: '#D82F20',
                color: '#fff',
                borderColor: '#D82F20',
                transition: '0.2ms',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Badge badgeContent={comments.length} color='warning'>
            <IconButton
              size='small'
              sx={{
                width: 35,
                height: 35,
                color: '#fff',
                backgroundColor: '#0965DC',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: '#0965DC',
                },
              }}
              onClick={handleClick}
            >
              <ModeCommentIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Badge>
        </Stack>

        <Box display='flex' justifyContent='flex-end' flexGrow={1} width={100}>
          <TextField
            variant='standard'
            sx={{ '&.MuiTextField-root': { width: 61 } }}
            label='Punctaj'
            value={watch(`studentAnswer.pb-${id}.score`) ?? ''}
            onChange={e => setValue(`studentAnswer.pb-${id}.score`, e.target.value)}
          />
        </Box>
      </Stack>

      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 40,
          horizontal: 55,
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          '.MuiPaper-root': {
            width: 530,
            borderRadius: 4,
          },
        }}
      >
        <Stack direction='row' justifyContent='space-between' p={3}>
          <Typography variant='h6'>Observatii</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Box p={3}>
          {comments.map(comment => (
            <Stack direction='row' alignItems='start' gap={1} key={comment.comment}>
              <Avatar src={comment.user.image} sx={{ width: 24, height: 24 }} />
              <Box>
                <Stack direction='row' gap={1}>
                  <Typography variant='h6' fontSize={15}>
                    {comment.user.name}
                  </Typography>
                  <Typography variant='body1' color='#929EAF'>
                    {moment(comment.date).fromNow()}
                  </Typography>
                </Stack>

                {comment.comment.split('\n').map(c => (
                  <Typography variant='body1' key={c} my={1}>
                    {c}
                  </Typography>
                ))}
              </Box>
            </Stack>
          ))}
        </Box>

        <Stack direction='row' alignItems='start' p={3} sx={{ backgroundColor: '#F8F8FA' }} gap={2}>
          <Avatar src={user.image} sx={{ width: 34, height: 34 }} />
          <TextField variant='standard' sx={{ flexGrow: 1, borderBottom: 'none' }} multiline InputProps={{ disableUnderline: true }} placeholder='Comment' inputRef={input} />
          <IconButton sx={{ backgroundColor: '#0965DC', color: '#fff', '&:hover': { backgroundColor: '#0965DC', color: '#fff' } }} onClick={handleNewComments} size='small'>
            <ArrowUpwardIcon />
          </IconButton>
        </Stack>
      </Popover>
    </Box>
  )
}
