"use client"

import { formatDateTime } from "@/lib/utils"
import { Appointment } from "@/types/appwrite.types"
import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../StatusBadge"
import Image from "next/image"
import { Doctors } from "@/constants"
import AppointmentModal from "../AppointmentModal"

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p>{row.index + 1}</p>
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => <div className="text-14-medium">{row.original.patient.name}</div>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="min-w-[115px]">
      <StatusBadge status={row.original.status} />
    </div>
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => <div className="text-14-regular min-w-[100px]">{formatDateTime(row.original.schedule).dateTime}</div>
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({row}) => {
      const appointment = row.original;

      const doctor = Doctors.find(doc => doc.name === appointment.primaryPhysician)
      return (
        <div className="flex items-center gap-3">
          <Image
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            src={doctor?.image!}
            alt='doctor'
            height={100}
            width={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">{doctor?.name}</p>
        </div>
      )
    }
  },
  {
    accessorKey: 'actions',
    header: () => <div className="pl-4">Actions</div>,
    cell: ({row}) => {
      const appointment = row.original;

      return (
        <div className="flex items-center gap-1">
          <AppointmentModal
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            type='schedule'
          />
          <AppointmentModal
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            type='cancel'
          />
        </div>
      )
    }
  }
]
