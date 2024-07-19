"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"




export enum FormFieldType{
  INPUT='input',
  TEXTAREA='textarea',
  CHECKBOX='checkbox',
  PHONE_INPUT='phoneInput',
  DATE_PICKER='datePicker',
  SELECT='select',
  SKELITON='skeliton'


}
 
 
const PatientForm=()=> {
  // 1. Define your form.

const router=useRouter()

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:""
    },
  })
  const [isLoading, setisLoading] = useState(false)

 
  // 2. Define a submit handler.
  async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
    setisLoading(true)
    console.log('name',name,email,phone)
    console.log('onsubmit called')

    try{
      const userData={name,email,phone}
      const user=await createUser(userData)
      console.log('userrr',user)
      if(user){
        router.push(`/patients/${user.$id}/register`)

      }

    }catch(error){
      console.log(error)
    }

    setisLoading(false);

  }


return(
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Schedule Your first Appintment</p>

        <CustomFormField
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="name"
        label="Full Name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
/>

<CustomFormField
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="email"
        label="Email"
        placeholder="JohnDoe@gmail.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
/>

<CustomFormField
        control={form.control}
        fieldType={FormFieldType.PHONE_INPUT}
        name="phone"
        label="Phone Number"
        placeholder="(555) 123-4567"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
/>


<SubmitButton isLoading={isLoading}>Get started</SubmitButton>
        </section>
    
      
    </form>
  </Form>
)
}

export default PatientForm