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
import { PatientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser, registerPatient } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes,PatientFormDefaultValues } from "@/constants";
import { Select, SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

// export enum FormFieldType{
//   INPUT='input',
//   TEXTAREA='textarea',
//   CHECKBOX='checkbox',
//   PHONE_INPUT='phoneInput',
//   DATE_PICKER='datePicker',
//   SELECT='select',
//   SKELITON='skeliton'

// }

const RegisterForm = ({ user }: { user: User }) => {
  // 1. Define your form.

  const router = useRouter();
//
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
    ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });
  const [isLoading, setisLoading] = useState(false);

  // 2. Define a submit handler.
  async function onSubmit(
    values: z.infer<typeof PatientFormValidation>) {
    setisLoading(true);
   let formData;
   if(values.identificationDocument && values.identificationDocument.length>0){
    const blobFile=new Blob([values.identificationDocument[0]],{
      type:values.identificationDocument[0].type


    })

    formData=new FormData()
    formData.append('blobFile',blobFile)
    formData.append('fileName',values.identificationDocument[0].name)




   }


    try {
      const patientData={
        ...values,
        userid:user.$id,
        birthDate:new Date(values.birthDate),
        identificationDocument:formData
      }
// @ts-ignore
    const patient=await registerPatient(patientData)
    if(patient) router.push(`/patients/${user.$id}/new-appointment`)
     
    } catch (error) {
      console.log(error);
    }

    setisLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about your self</p>
        </section>
        <section className="mb-12 space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Date of birth"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELITON}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <label htmlFor={option} className="cursor-pointer">
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            label="Address"
            placeholder="14,main street ,Kandy"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="occupation"
            placeholder="Software Engineer"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="Emergency contact Name"
            placeholder="Guradians name"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            placeholder="(555) 123-4567"
          />
        </div>
        <section className="mb-12 space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        {/* <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="select a Physician"


            
          >
            {Doctors.map((doctor)=>(
              <SelectItem key={doctor.name} value={doctor.name}>

                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                  src={doctor.image}
                  height={32}
                  width={32}
                  alt={doctor.name}
                  className="rounded-full border border-dark-500"
                  
                  />
                  <p>{doctor.name}</p>

                </div>
              </SelectItem>
            ))}

          </CustomFormField> */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary care physician"
          placeholder="Select a physician"
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

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="Blue Cross"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insurancePolicyNumber"
            label="insurance Policy Number"
            placeholder="ABC12344"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="allergies"
            label="allergies (if any)"
            placeholder="Peanuts,penicillin"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="currentMedication"
            label="current Medication (if any)"
            placeholder="ibuprofen 200mg "
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="familyMedicalHistory"
            label="family Medical History"
            placeholder="Mother has diabitics"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="appendectomy  "
          />
        </div>
        <section className="mb-12 space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="identificationType"
          label="Identification Type"
          placeholder="select a Identification type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="identificationNumber"
          label="identification number "
          placeholder="1234567"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELITON}
          name="identificationDocument"
          label="Scanned Copy of Identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="mb-12 space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent And Privacy</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="treatmentConsent"
          label="i concent to treatments"
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="i concent to disclosure of information"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name="privacyConsent"
          label="i concent to to privacy policy"
        />

        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
