"use client"

import { ColumnDef } from "@tanstack/react-table"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal } from "lucide-react"
import StatusBadge from "../StatusBadge"
import { format } from "path"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppointmentModel from "../AppointmentModel"
import { Appointment } from "@/types/appwrite.type"


export const columns: ColumnDef<Appointment>[] = [
    {
        header:'ID',
        cell:({row})=><p className="text-14-medium">{row.index+1}</p>


    },
    {
        accessorKey: "patient",
        header:'Patient',
        cell:({row})=>{
            const appointment=row.original;
            return <p className="text-14-medium">{appointment.patient.name}</p>

        }



    },
  {
    accessorKey: "status",
    header: "Status",
    cell:({row})=>{
        return <div className="min-w-[115px]">
            <StatusBadge
            status={row.original.status}
            />


        </div>

    }
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell:({row})=>{
       return  <p className="text-14-reguler min-w-[100px]">
            {formatDateTime(row.original.schedule).dateTime}

        </p>
    }
  },
  {
    accessorKey: "primaryPhysician",
    header:"Doctor",
    cell: ({ row }) => {
        const doctor=Doctors.find((doc)=>doc.name===row.original.primaryPhysician)
        return  (
            <div className="flex items-center gap-3">
                <Image
                    src={doctor ? doctor.image : ''}
                    width={40}
                    height={40}
                    alt="doc"
                />
                <p className="whitespace-nowrap">
                    Dr. {doctor?.name}
                </p>
            </div>
        );
     
    },
  },
  {
    id: "actions",
    header:()=> <div className="pt-4">Actions</div>,
    cell: ({ row :{original:data}}) => {
      return(
        <div className="flex gap-1">
          <AppointmentModel type="schedule"
          patientId={data.patient.$id}
          userId={data.userId}
          appointment={data}
          // title="Shedule Appointment"
          // description="Please Confirm the fallowing details to schedule"

          />
          
          <AppointmentModel type="cancel"
          patientId={data.patient.$id}
          userId={data.userId}
          appointment={data}
          // title="cancel Appointment"
          // description="Are you sure you want to cancel you appointment"

          />



        </div>
      )

      
    },
  },
]
