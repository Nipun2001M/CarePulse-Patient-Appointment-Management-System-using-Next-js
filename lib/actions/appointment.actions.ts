'use server'

import { ID, Query } from "node-appwrite"
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config"
import { parseStringify } from "../utils"
import { Appointment } from "@/types/appwrite.type"
import { revalidatePath } from "next/cache"

export const createAppointment=async(appointmentdata:CreateAppointmentParams)=>{
    try{
        console.log('appointmentdata',appointmentdata)
        const newappointment=await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),{
                ...appointmentdata
              
            
            }



        )

        return parseStringify(newappointment)


    }catch(error){
        console.log(error)
    }
}

export const getAppointment=async(appointmentId:string)=>{

    try{
        const appointment=await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId
        )
        return parseStringify(appointment)



    }catch(error){
        console.log(error)
    }

}

export const getRecentAppointmentList=async()=>{
    try{
        const appointments=await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            // [Query.orderDesc('$createdAt')]



        )
        console.log(appointments)
        const initialcount={
            sheduledCount:0,
            pendingCount:0,
            cancelledCount:0
        }
        const counts=(appointments.documents as Appointment[]).reduce(
            (acc,appointment)=>{
            if(appointment.status==='scheduled'){
                acc.sheduledCount+=1;
            }else if(appointment.status==='pending'){
                acc.pendingCount+=1
            }else if(appointment.status==="cancelled"){
                acc.cancelledCount+=1
            }

            return acc

        },initialcount); 

        const data={
            totalCount:appointments.total,
            ...counts,
            documents:appointments.documents
        }
        // console.log('ap doc',appointments.documents)
        return parseStringify(data)

        
    }catch(error){
        console.log(error)
    }

}
 

export const updateAppointment=async({userId,appointmentId,appointment,type}:UpdateAppointmentParams)=>{
    try{
        const updatedAppointment=await databases.updateDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
            appointment

        )
        if(!updateAppointment){
            throw new Error('appointment not found')

        }
        //sms

        revalidatePath('/admin')
        return parseStringify(updatedAppointment)

    }catch(error){
        console.log(error)
    }

}