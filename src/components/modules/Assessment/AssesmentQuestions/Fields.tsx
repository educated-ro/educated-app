import { useFormContext } from 'react-hook-form'
import { SectionItem } from '@/types/assessment'
// import Editor from 'react-simple-code-editor'
// import Prism from 'prismjs'
// import 'prismjs/components/prism-clike'
// import 'prismjs/components/prism-javascript'
// import 'prismjs/themes/prism.css'
// import { highlight, languages } from 'prismjs'

export default function QuestionFields({ id, type, options }: Partial<SectionItem>) {
  const { register } = useFormContext()

  const inputProps = register(`studentAnswer.pb-${id}`)

  switch (type) {
    case 'one-option': {
      return (
        <div className='flex justify-between'>
          {options &&
            options.map((option, i) => (
              <div key={option.value} className='flex gap-3 items-center'>
                <input type='radio' value={option.value} className='block checked:bg-blue-500' {...inputProps} />
                <label className='block'>{option.label ?? option.value}</label>
              </div>
            ))}
        </div>
      )
    }

    //TBD
    case 'multiple-options': {
      return null
    }

    case 'code': {
      return <textarea placeholder='here' className='p-3 w-full border border-gray-300' {...inputProps}></textarea>
    }

    case 'short-answer': {
      return <input type='text' placeholder='here' className='w-full p-3 border border-gray-300' {...inputProps} />
    }

    case 'long-answer': {
      return <textarea placeholder='here' className='mx-5 p-3 border border-gray-300' {...inputProps}></textarea>
    }

    default: {
      return null
    }
  }
}
