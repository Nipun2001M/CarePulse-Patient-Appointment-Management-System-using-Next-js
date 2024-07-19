import AppointmentForm from "@/components/forms/AppointmentForm";
import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import { getpatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";

export default async function NewAppointment({params:{userId}}:SearchParamProps) {
    const patient=await getpatient(userId)
  return (
    <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container ">
      <div className="sub-container max-w-[860px] flex-1 justify-between">
        <Image
        src="/assets/icons/logo-full.svg"
        height={1000}
        width={1000}
        alt="patient"
        className="mb-12 h-10 w-fit"
        />
        {/* <PatientForm/> */}
    <AppointmentForm
    type="create"
    userId={userId}
    patientId={patient.$id}
    />

       <p className="justify-items-end text-dark-600 xl:text-left">
       © 2024 CarePulse
       </p>
   

      </div>

    </section>
    <Image
    src="/assets/images/appointment-img.png"
    alt="doc"
    height={1000}
    width={1000}
    className="side-img max-w-[390px] bg-bottom"/>
    


    </div>
   
  );
}