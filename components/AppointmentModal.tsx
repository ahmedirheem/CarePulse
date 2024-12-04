import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Appointment } from '@/types/appwrite.types'
import { Button } from "./ui/button";
import { useState } from "react";
import AppointmentForm from "./forms/AppointmentForm";

interface AppointmentModalProps {
  patientId: string
  userId: string
  appointment?: Appointment
  type: 'schedule' | 'cancel'
}

const AppointmentModal = ({ patientId, userId, appointment, type }: AppointmentModalProps) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className={`capitalize ${type === 'schedule' && 'text-green-500'}`}>
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:w-max-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} appointment
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          patientId={patientId}
          userId={userId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>

    </Dialog>
  )
}

export default AppointmentModal
