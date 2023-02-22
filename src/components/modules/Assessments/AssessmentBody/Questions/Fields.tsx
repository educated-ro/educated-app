import { Controller, useFormContext } from 'react-hook-form'
import { SectionItem } from '@/types/assessment'
import { FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material'
import useUserSession from '@/hooks/useUserSession'

export default function QuestionFields({ id, type, options }: Partial<SectionItem>) {
  const { control } = useFormContext()
  const { role } = useUserSession()

  const isDisabled = role === 'Trainer'

  const inputName = `studentAnswer.pb-${id}.value`

  switch (type) {
    case 'one-option': {
      return options ? (
        <Controller
          name={inputName}
          control={control}
          render={({ field }) => (
            <RadioGroup row {...field} sx={{ justifyContent: 'space-between' }}>
              <Grid container>
                {options.map(option => (
                  <Grid item md={3} key={option.value}>
                    <FormControlLabel value={option.value} control={<Radio />} label={option.label ?? option.value} disabled={isDisabled} />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          )}
        />
      ) : null
    }

    //TBD
    case 'multiple-options': {
      return null
    }

    case 'code': {
      return <Controller name={inputName} control={control} render={({ field }) => <TextField {...field} fullWidth multiline value={field.value ?? ''} disabled={isDisabled} />} />
    }

    case 'short-answer': {
      return <Controller name={inputName} control={control} render={({ field }) => <TextField {...field} fullWidth value={field.value ?? ''} disabled={isDisabled} />} />
    }

    case 'long-answer': {
      return <Controller name={inputName} control={control} render={({ field }) => <TextField {...field} fullWidth multiline value={field.value ?? ''} disabled={isDisabled} />} />
    }

    default: {
      return null
    }
  }
}
