'use client'

import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploaderProps={
    files:File[] |undefined,
    onChange:(file:File[])=>void 

}

 const FileUploader=({files,onChange}:FileUploaderProps)=>{
  const onDrop = useCallback((acceptedFiles:File[]) => {
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files.length>0?(
        <Image
        src={convertFileToUrl(files[0])}
        width={1000}
        height={1000}
        alt='uploaded img'
        className='max-h-[400px] overflow-hidden object-cover'
        />

      ):(<>
      <Image
      src="/assets/icons/upload.svg"
      width={40}
      height={40}
      alt='up icon'

      />
      <div className='file-upload_label'>
        <p className=' text-14-reguler'>
            <span className='text-green-500'>Click to Upload</span>
             Or Drag And drop
            

        </p>
        <p>SVG,PNG,JPG,GIF</p>

      </div>
      </>)}
    
    </div>
  )
}

export default FileUploader