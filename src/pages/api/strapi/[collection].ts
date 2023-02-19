import type { NextApiRequest, NextApiResponse } from 'next'
import AssessmentsSessionService from '@/services/AssessmentsSession.service'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { collection } = req.query

  switch (collection) {
    case 'new-session': {
      const response = await AssessmentsSessionService.createNewSession(req)
      res.status(200).json(response && response.data.sessionId)
      break
    }

    case 'save-session': {
      await AssessmentsSessionService.saveCurrentSession(req)
      res.status(200).json({})
      break
    }

    case 'change-assessment-status': {
      await AssessmentsSessionService.changeAssessmentStatus(req)
      res.status(200).json({})
      break
    }
  }
}

export default handler
