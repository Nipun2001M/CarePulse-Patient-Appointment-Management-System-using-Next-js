"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Value } from "@radix-ui/react-select";
import { decryptKey, encryptKey } from "@/lib/utils";



const PasskeyModel = () => {
  const router = useRouter();
  const path=usePathname();
  const [open, setOpen] = useState(true);
  const [passkey, setpasskey] = useState("")
  const [error, setError] = useState('')
  const encryptedkey=typeof window !=="undefined" ? window.localStorage.getItem('acessKey'):null
  useEffect(()=>{
    const acesskey=encryptedkey && decryptKey(encryptedkey)
    if(path){
        if(acesskey===process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
           
            setOpen(false)
            router.push('/admin')
    
            
    
        }else{
            setOpen(true)
        }

    }



  },[encryptedkey])


  const  validatePasskey=(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
    e.preventDefault()
    if(passkey===process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
        const enryptedkey=encryptKey(passkey)
        localStorage.setItem('acessKey',enryptedkey)
        setOpen(false)
        router.push('/admin')

        


        

    }else{
        setError('invalid passkey please try again')
    }




}

  const closemodel = () => {
    setOpen(false);
    router.push("/");
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Acess Verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => {
                closemodel();
              }}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To acess the admin page please enter the passkey
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP maxLength={6} value={passkey} onChange={(Value)=>{setpasskey(Value)}}>
            <InputOTPGroup >
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
           
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="shad-error text-14-regular mt-4 flex justify-center">{error}</p>}
        </div>
        <AlertDialogFooter>
          
          <AlertDialogAction onClick={(e)=>validatePasskey(e)
        
        }
        className="shad-primary-btn w-full"
        >Enter admin passkey</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModel;
