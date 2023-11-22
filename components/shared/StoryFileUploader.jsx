import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export const StoryFileUploader = ({ fieldChange}) => {
  
  const [file, setFile] = useState([])
  const [fileUrl, setFileUrl] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      'image/*' : ['.png', '.jpeg', '.jpg' ]
    }
  })

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-zinc-800 rounded-xl cursor-pointer '>
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
           className='rounded-lg w-72'
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
        <h3 className='text-zinc-300 mb-2 mt-2 font-semibold text-xl'>Drag or click to upload your story</h3>
        <p className='text-sm font-normal text-zinc-300 mb-2'>make sure to upload vertical image. </p>
        <p className='text-xs font-normal text-zinc-500 mb-6'>PNG , JPEG , JPG are supported only.</p>

       </div>
      )       
    }
  </div>
  )
}
