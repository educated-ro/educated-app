import StudentAssessmentsView from '@/components/modules/Assessments/StudentAssessmentsView'
import TrainerAssessmentsView from '@/components/modules/Assessments/TrainerAssessmentView'
import { getSessionUser } from '@/utils/auth-session'

export default async function AssessmentsPage() {
  const { role, id } = (await getSessionUser()) as any

  switch (role) {
    case 'Student': {
      //@ts-ignore
      return <StudentAssessmentsView userId={id} />
    }

    case 'Trainer': {
      //@ts-ignore
      return <TrainerAssessmentsView userId={id} />
    }

    default: {
      return null
    }
  }
}
