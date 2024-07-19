"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation, getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.type";

const AppointmentForm = ({
  userId,
  patientId,
  type,
  appointment,
  setopen
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel"|'schedule';
  appointment:Appointment,
  setopen: React.Dispatch<React.SetStateAction<boolean>>

}) => {
  const router = useRouter();


  const AppointmentFormValidation=getAppointmentSchema(type)

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
        primaryPhysician: appointment && appointment.primaryPhysician,
      schedule:appointment?new Date(appointment.schedule): new Date(Date.now()),
      reason:appointment? appointment.reason : "",
      note:appointment?appointment.note:' ',
      cancellationReason:appointment?.cancellationReason || '',
    },
  });
  const [isLoading, setisLoading] = useState(false);

  // 2. Define a submit handler.

  
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setisLoading(true);
    let status;
    switch(type){
        case 'schedule':
            status='scheduled'
            break;
        case 'cancel':
            status='cancelled'
            break;    
        default:
            status='pending'
            break    
    }

    try {
      console.log('ssssssssssss',new Date(values.schedule))
     if(type==='create' && patientId){
        const appointmentdata={
            userId,
            patient:patientId,
            primaryPhysician:values.primaryPhysician,
            schedule: new Date(values.schedule),
            reason:values.reason!,
            note:values.note,
            status:status as Status

        }
        const appointment=await createAppointment(appointmentdata)
        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
     }else{
      const appointmentToUpdate={
        userId,
        appointmentId:appointment?.$id!,
        appointment:{
          primaryPhysician:values?.primaryPhysician,
          schedule:new Date(values?.schedule),
          status:status as Status,
          cancellationReason:values?.cancellationReason



        },
        type}

        const updatedAppointment=await updateAppointment(appointmentToUpdate)
        if(updatedAppointment){
          setopen(false)
          form.reset()

        }
     }
    } catch (error) {
      console.log(error);
    }

    setisLoading(false);
  }
  let buttonLabel;
  switch(type){
    case 'cancel':
        buttonLabel="Cancel Appointment";
        break;
    
    case 'create':
        buttonLabel="Create Appointment";
        break;

    case 'schedule':
        buttonLabel="Schedule Appointment";
        break;    
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
       {type === 'create' && <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">
            Request a New Appointment in 10 seconds{" "}
          </p>        </section>}


          {type !== "cancel" && (
            <>
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Doctor"
                placeholder="Select a doctor"
              >
                {Doctors.map((doctor, i) => (
                  <SelectItem key={doctor.name + i} value={doctor.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <Image
                        src={doctor.image}
                        width={32}
                        height={32}
                        alt="doctor"
                        className="rounded-full border border-dark-500"
                      />
                      <p>{doctor.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="schedule"
                label="expected appointment date"
                showTimeSelect
                dateFormat="MM/dd/yyyy - h:mm aa"
              />

              <div className="flex flex-col  gap-6 xl:flex-row">
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.TEXTAREA}
                  name="reason"
                  label="reason for appointment"
                  placeholder="appointment reason"
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.TEXTAREA}
                  name="note"
                  label="Notes"
                  placeholder="Enter notes "
                />
              </div>
            </>
          )}
          {type==='cancel' &&(
              <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name="cancellationReason"
              label="Reason for Cancellation"
              placeholder="enter Reason for Cancellation "
            />

          )}

          <SubmitButton isLoading={isLoading} className={`${type==='cancel'?'shad-danger-btn':'shad-primary-btn'}`}>{buttonLabel}</SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
