import useUserSession from '@/hooks/useUserSession'
import { useFormContext } from 'react-hook-form'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { getStatusDialogTextAndActionByRole } from '@/utils/assessments'
import useAssessmentActions from '@/components/modules/Assessments/useAssessmentActions'
import { AssessmentSession } from '@/types/assessment'
import { useRouter } from 'next/navigation'
import LoadingButton from '@mui/lab/LoadingButton'

type ChangeStatusDialog = {
  open: boolean
  onClose: () => void
}
export default function ChangeStatusDialog({ open, onClose }: ChangeStatusDialog) {
  const { role } = useUserSession()
  const { getValues, handleSubmit } = useFormContext<AssessmentSession>()
  const router = useRouter()

  const dialogText = getStatusDialogTextAndActionByRole(role, getValues().studentAnswer)

  const { handleChangeStatus, isChangeStatusLoading } = useAssessmentActions()

  const handleConfirm = async (data: AssessmentSession) => {
    try {
      await handleChangeStatus(data)
      onClose()
      router.refresh()
      router.push('/assessments')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>Finalizeaza</DialogTitle>
      <DialogContent>{dialogText?.message ?? 'Esti pe cale sa termini examenul. Esti sigur ca este totul corect ?'}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Inapoi</Button>
        <LoadingButton onClick={handleSubmit(data => handleConfirm(data))} autoFocus disabled={dialogText?.isButtonDisabled ?? false} loading={isChangeStatusLoading}>
          Continua
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
