import { Controller, useFormContext } from 'react-hook-form'
import { SectionItem } from '@/types/assessment'
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
// import Editor from 'react-simple-code-editor'
// import Prism from 'prismjs'
// import 'prismjs/components/prism-clike'
// import 'prismjs/components/prism-javascript'
// import 'prismjs/themes/prism.css'
// import { highlight, languages } from 'prismjs'

export default function QuestionFields({ id, type, options }: Partial<SectionItem>) {
  const { register, control } = useFormContext()

  const inputName = `studentAnswer.pb-${id}`
  const inputProps = register(inputName)

  switch (type) {
    case 'one-option': {
      return options ? (
        <Controller
          name={inputName}
          control={control}
          render={({ field }) => (
            <RadioGroup row {...field} sx={{ justifyContent: 'space-between' }}>
              {options.map(option => (
                <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label ?? option.value} />
              ))}
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
      return <Controller name={inputName} control={control} render={({ field }) => <TextField {...field} fullWidth multiline value={field.value ?? ''} />} />
    }

    case 'short-answer': {
      return <Controller name={inputName} control={control} render={({ field }) => <TextField {...field} fullWidth value={field.value ?? ''} />} />
    }

    case 'long-answer': {
      return <Controller name={inputName} control={control} render={({ field }) => <TextField {...field} fullWidth multiline value={field.value ?? ''} />} />
    }

    default: {
      return null
    }
  }
}
