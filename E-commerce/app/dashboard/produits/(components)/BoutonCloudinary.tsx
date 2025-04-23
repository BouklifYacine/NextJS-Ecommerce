"use client"
import { CldUploadWidget } from 'next-cloudinary'
import React from 'react'

interface CloudinaryResult {
  info: {
    secure_url: string
    public_id: string
  }
}

interface BoutonCloudinaryProps {
  onUploadComplete: (data: { url: string; publicId: string }) => void
}

const BoutonCloudinary = ({ onUploadComplete }: BoutonCloudinaryProps) => {
  return (
    <CldUploadWidget
      uploadPreset="dcjfs98o"
      options={{
        sources: ['local'],
        multiple: false,
        maxFiles: 1
      }}
      onSuccess={(result: CloudinaryResult) => {
        const url = result.info.secure_url
        const publicId = result.info.public_id
        
        onUploadComplete({ url, publicId })
      }}
    >
      {({ open }) => (
        <button
          onClick={() => open()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Uploader une image
        </button>
      )}
    </CldUploadWidget>
  )
}

export default BoutonCloudinary