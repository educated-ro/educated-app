import { useRouter } from 'next/navigation'
import useUserSession from '@/hooks/useUserSession'
import { useCallback } from 'react'
import { AssessmentSession } from '@/types/assessment'
import { debounce } from 'lodash'
import axios from 'axios'
import { useMutation } from 'react-query'

const getNextStatusByRole = (role: string) => {
  if (role === 'Trainer') return 'finished'

  if (role === 'Student') return 'under-evaluation'
}

export default function useAssessmentActions() {
  const router = useRouter()
  const { role, id } = useUserSession()

  const { mutateAsync: handleChangeStatus, isLoading: isChangeStatusLoading } = useMutation<AssessmentSession, unknown, AssessmentSession>(
    data =>
      axios.put('/api/strapi/change-assessment-status', {
        ...data,
        status: getNextStatusByRole(role),
      }),
    {
      onSuccess: res => {
        router.refresh()
        router.push('/assessments', {})
      },
    },
  )

  const { isLoading: newSessionLoading, mutate: handleNewSession } = useMutation((assessmentId: string) => axios.post('/api/strapi/new-session', { userId: id, assessmentId }), {
    onSuccess: res => {
      router.refresh()
      router.push(`/assessments/${res.data}`)
    },
  })

  const { mutate: claim } = useMutation((data: AssessmentSession & { user: { role: string; id: number } }) => axios.put('/api/strapi/claim-session', data), {
    onSuccess: res => {
      router.refresh()
      router.push(`/assessments/${res.data}`)
    },
  })

  const handleUpdateSession = useCallback(
    debounce(
      value => axios.put('/api/strapi/save-session', value),

      500,
    ),
    [],
  )

  const claimSession = (data: AssessmentSession) => claim({ ...data, user: { role, id } })

  return { handleChangeStatus, isChangeStatusLoading, handleUpdateSession, handleNewSession, claimSession }
}
