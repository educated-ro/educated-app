import React from 'react'
import { SectionItem } from '@/types/assessment'
import QuestionMedia from '@/components/modules/Assessment/AssesmentQuestions/QuestionMedia'
import QuestionFields from '@/components/modules/Assessment/AssesmentQuestions/Fields'
import RequirementText from '@/components/modules/Assessment/Requirement/RequirementText'

type QuestionWrapperProps = SectionItem & {
  position: number | string
  showBorders?: boolean
}

export default function QuestionWrapper(props: QuestionWrapperProps) {
  const { requirement, position, subItems, type, media, showBorders = true, ...others } = props

  if (type === 'with-sub-items' && subItems) {
    return (
      <div className='w-full bg-white p-6'>
        <div className='flex my-4'>
          <div className='text-gray-900 font-bold mx-6'>{position}.</div>
          <div className='text-justify flex-1'>
            <RequirementText content={requirement} />
            <div>
              {subItems.map((item, id) => (
                <QuestionWrapper key={item.requirement} position={String.fromCharCode(97 + id)} {...item} id={`studentAnswer.sub-${item.id}`} showBorders={false} />
              ))}
            </div>
          </div>

          <QuestionMedia media={media} />
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white ${showBorders ? 'shadow shadow-xs shadow-gray-100 rounded-md' : 'my-6'} p-6`}>
      <div className={`flex ${showBorders && 'px-6'}`}>
        <div className='flex mb-6'>
          <div className={`text-gray-900 font-bold ${showBorders && 'mr-6'}`}>{position}.</div>
          <div className='text-justify flex-1'>
            <RequirementText content={requirement} />
          </div>
        </div>
        <QuestionMedia media={media} />
      </div>
      <div className={`${showBorders && 'px-6'}`}>
        <QuestionFields type={type} {...others} />
      </div>
    </div>
  )
}
