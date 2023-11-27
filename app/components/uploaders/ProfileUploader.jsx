"use client"

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";

export const ProfileUploader = ({ fieldChange, mediaUrl }) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="cursor-pointer flex items-center flex-col justify-center gap-2">
        <Image
          src={fileUrl || "/upload-image.png"}
          alt="image"
          width={500}
          height={500}
          className="h-24 w-24 rounded-full object-cover object-top"
        />
        <p className="text-zinc-400 text-sm mt-3">
          Change profile photo
        </p>
      </div>
    </div>
  );
};
