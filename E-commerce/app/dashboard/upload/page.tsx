"use client"
import React, { useState } from 'react'
import { CldImage } from 'next-cloudinary'
import BoutonCloudinary from '../produits/(components)/BoutonCloudinary'


interface ImageData {
  url: string
  publicId: string
}

const Upload = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null)
  
  const handleImageUpload = (data: ImageData) => {
    setImageData(data)
    console.log('Image reçue:', data)
  }

  return (
    <div className="space-y-4 p-4">
      <BoutonCloudinary onUploadComplete={handleImageUpload} />
      
      {imageData && (
        <div className="mt-4">
          <CldImage 
            src={imageData.publicId} 
            width={300} 
            height={200} 
            alt="Image uploadée"
            className="rounded-lg border"
          />
          <div className="mt-2 space-y-1">
            <p className="text-sm">Public ID: {imageData.publicId}</p>
            <p className="text-xs text-gray-500 break-all">URL: {imageData.url}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Upload