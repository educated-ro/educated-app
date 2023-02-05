'use client'

import axios from 'axios'
import moment from 'moment'
import { Assessment, AssessmentSession } from '@/types/assessment'
import { Table, Tabs } from 'flowbite-react'
import { useRouter } from 'next/navigation'

type AssessmentsTabsProps = {
  userId: string
  takenAssessments: AssessmentSession[]
  assessments: Assessment[]
}

export default function AssessmentsTabs({ userId, takenAssessments, assessments }: AssessmentsTabsProps) {
  const router = useRouter()
  const handleRowClick = (assessmentId: string) => {
    axios
      .post('/api/strapi/new-session', {
        assessmentId,
        userId,
      })
      .then(res => {
        router.refresh()
        router.push(`/assessments/${res.data}`)
      })
  }

  return (
    <Tabs.Group aria-label='Tabs with underline' style='underline'>
      <Tabs.Item title='All'>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>Assessment name</Table.HeadCell>
            <Table.HeadCell>Publicat</Table.HeadCell>
            <Table.HeadCell>Author</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {assessments.map(assessment => (
              <Table.Row key={assessment.id} className='bg-white dark:border-gray-700 dark:bg-gray-800' onClick={() => handleRowClick(assessment.id)}>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{assessment.name}</Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{moment(assessment.publishedAt).fromNow()}</Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Tabs.Item>
      <Tabs.Item active={true} title='Yours'>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>Assessment name</Table.HeadCell>
            <Table.HeadCell>Started</Table.HeadCell>
            <Table.HeadCell>Finish</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {takenAssessments.map(assessment => (
              <Table.Row key={assessment.sessionId} className='bg-white dark:border-gray-700 dark:bg-gray-800' onClick={() => router.push(`/assessments/${assessment.sessionId}`)}>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{assessment.assessment.name}</Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{assessment.status}</Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{moment(assessment.finishedAt).fromNow()}</Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>...</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Tabs.Item>
    </Tabs.Group>
  )
}
