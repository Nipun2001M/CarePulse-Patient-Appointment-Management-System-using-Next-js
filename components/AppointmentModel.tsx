'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'
import { string } from 'zod'
import { Appointment } from '@/types/appwrite.type'
import AppointmentForm from './forms/AppointmentForm'
  

const AppointmentModel = ({type,patientId,
    userId,
appointment,
}:{
    type :"schedule" | "cancel"
    patientId:string
    userId:string
appointment?:Appointment

}) => {
    const [open, setopen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setopen}>
    <DialogTrigger asChild>
        <Button variant="ghost" className={`capitalize ${type==='schedule' && 'text-green-500'}`}>{type}</Button>
    </DialogTrigger>
    <DialogContent className='shad-dialog sm:max-w-wd '>
      <DialogHeader className='mb-4 space-y-3'>
        <DialogTitle className='capitalize'>{type} Appontment</DialogTitle>
        <DialogDescription>
         Please Fill Fallowing Details to  {type} Appointment
        </DialogDescription>
      </DialogHeader>
   <AppointmentForm
   userId={userId}
   patientId={patientId}
   type={type}
   appointment={appointment}
   setopen={setopen}
   
   />
    </DialogContent>
  </Dialog>
  
  )
}

export default AppointmentModel