import PatientForm from "@/components/forms/PatientForm";
import PasskeyModel from "@/components/PasskeyModel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home({searchParams}:SearchParamProps) {
  const isAdmin=searchParams.admin
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModel/>}
    <section className="remove-scrollbar container ">
      <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <Image
        src="/assets/icons/logo-full.svg"
        height={1000}
        width={1000}
        alt="patient"
        className="mb-12 h-10 w-fit"
        />
        <PatientForm/>
        <div className="text-14-reguler mt-20 flex justify-between">
       <p className="justify-items-end text-dark-600 xl:text-left">
       © 2024 CarePulse
       </p>
       <Link href="/?admin=true" className="text-green-500">Admin</Link>
        </div>

      </div>

    </section>
    <Image
    src="/assets/images/onboarding-img.png"
    alt="doc"
    height={1000}
    width={1000}
    className="side-img max-w-[50%]"/>
    


    </div>
   
  );
}
