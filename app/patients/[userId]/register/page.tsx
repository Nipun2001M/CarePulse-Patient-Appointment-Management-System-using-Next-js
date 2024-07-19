import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async({params:{userId}}:SearchParamProps) => {
    const user=await getUser(userId)

  return (


    <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[496px]">
        <Image
        src="/assets/icons/logo-full.svg"
        height={1000}
        width={1000}
        alt="patient"
        className="mb-12 h-10 w-fit"
        />
        {/* <PatientForm/> */}
        <RegisterForm user={user}/>
        <p className="justify-items-end text-dark-600 xl:text-left py-12">
       © 2024 CarePulse
       </p>

      </div>

    </section>
    <Image
    src="/assets/images/register-img.png"
    alt="doc"
    height={1000}
    width={1000}
    className="side-img max-w-[390px]"/>
    


    </div>
   
  )
}

export default Register