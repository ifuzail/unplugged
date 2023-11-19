import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export const VideoFileUploader = ({ fieldChange, mediaUrl}) => {
  
  const [file, setFile] = useState([])
  const [fileUrl, setFileUrl] = useState()

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    if (acceptedFiles.length > 0) {
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  }, [file])

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4']
    }
  })

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-zinc-800 rounded-xl cursor-pointer'>
    <input {...getInputProps()}  className='cursor-pointer'/>
    {
      fileUrl ? (
        <>
         <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
          <video
           controls
           controlsList='nodownload'
           src={fileUrl}
           alt='image'
           className='rounded-lg w-[500px] h-[500px]'
          />
         </div>
          <p className='text-zinc-400 text-center p-4'>click or drag video to replace</p>
         </>
      ) : (
       <div className='flex flex-col justify-center items-center h-60 relative'>
        <Image
         src='/upload-video.png'
         width={50}
         height={50}
         alt='upload the video'
        />
        <h3 className='text-zinc-300 mb-2 mt-2'>Drag video here</h3>
        <p className='text-sm font-normal text-zinc-500 mb-6'>Only in mp4 </p>

       </div>
      )       
    }
  </div>
  )
}
