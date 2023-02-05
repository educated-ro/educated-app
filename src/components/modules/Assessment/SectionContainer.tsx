'use client'

import React from 'react'
import { AssessmentSection } from '@/types/assessment'
import QuestionWrapper from '@/components/modules/Assessment/AssesmentQuestions'
import { Alert } from 'flowbite-react'

type SectionContainerProps = {
  sections: AssessmentSection[]
}

const SectionHeader = ({ title, points, description }: Partial<AssessmentSection>) => {
  if (!title && !points && !description) return null

  return (
    <div className='flex flex-col my-12'>
      <div className='flex justify-between'>
        <h2 className='font-bold'>{title}</h2>
        <h2 className='font-bold'>{points} puncte </h2>
      </div>
      <p className='text-sm text-gray-400 max-w-xl'>{description}</p>
    </div>
  )
}

const SectionBody = ({ items }: Partial<AssessmentSection>) => (
  <div className='flex flex-col gap-4'>
    {items?.map((item, i) => (
      <QuestionWrapper key={item.requirement} position={i + 1} {...item} />
    ))}
  </div>
)

export default function SectionContainer({ sections }: SectionContainerProps) {
  return (
    <div className='flex flex-col'>
      {sections.map(({ items, ...others }, i) => (
        <div key={i} className='w-full'>
          <SectionHeader {...others} />
          <SectionBody items={items} />
        </div>
      ))}
    </div>
  )
}
