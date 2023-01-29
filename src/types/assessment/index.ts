type SectionItemTypes = 'one-option' | 'multiple-options' | 'code' | 'with-sub-items' | 'short-answer' | 'long-answer'

type AssessmentMetadata = {
  header: string
  title: string
  description: string
  started: boolean
  timer: Date | null
}

type AssessmentOption = {
  id: string
  value: string | number
  label?: string
}

type SectionItem = {
  id: string
  type: SectionItemTypes
  media: {
    type: string
    src: string
  } | null
  requirement: string
  options?: AssessmentOption[]
  subItems?: SectionItem[]
}

type AssessmentSection = {
  title: string
  points: number
  description: string
  items: SectionItem[]
}

type Assessment = {
  id: string
  name: string
  description: string
  metadata: AssessmentMetadata
  sections: AssessmentSection[]
}

export type { AssessmentMetadata, AssessmentSection, AssessmentOption, Assessment, SectionItemTypes, SectionItem }
