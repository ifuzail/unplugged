import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export const FileUploader = ({ fieldChange, mediaUrl}) => {
  
  const [file, setFile] = useState([])
  const [fileUrl, setFileUrl] = useState(mediaUrl)

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      'image/*' : ['.png', '.jpeg', '.jpg' , '.svg', '.webp']
    }
  })

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-zinc-800 rounded-xl cursor-pointer'>
    <input {...getInputProps()}  className='cursor-pointer'/>
    {
      fileUrl ? (
        <>
         <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
          <Image
           src={fileUrl}
           alt='image'
           width={500}
           height={500}
           className='rounded-lg'
          />
         </div>
          <p className='text-zinc-400 text-center p-4'>click or drag photo to replace</p>
         </>
      ) : (
       <div className='flex flex-col justify-center items-center h-60 relative'>
        <Image
         src='/upload-image.png'
         width={50}
         height={50}
         alt='upload the image'
        />
        <h3 className='text-zinc-300 mb-2 mt-2'>Drag photo here</h3>
        <p className='text-sm font-normal text-zinc-500 mb-6'>SVG, PNG, JPG or WEBP </p>

       </div>
      )       
    }
  </div>
  )
}
