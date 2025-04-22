"use client"
import React, { useState } from 'react'
import { CldImage, CldUploadWidget } from 'next-cloudinary'

// Définir l'interface pour le résultat d'upload Cloudinary
interface CloudinaryResult {
  info: {
    secure_url: string;
    public_id: string;
  };
}

const Upload = () => {
  const [publicId, setPublicId] = useState<string>('')
  
  return (
    <>
    {publicId && <CldImage src={publicId} width={150} height={200} alt='Image'></CldImage>}
      <CldUploadWidget
        onSuccess={(result: CloudinaryResult, ) => {
          // Avec les types correctement définis, TypeScript comprend la structure
          const url = result.info.secure_url;
          const publicId = result.info.public_id;
          
          // Mettre à jour l'état avec l'ID public
          setPublicId(publicId);
          
          // Afficher ces valeurs spécifiques
          console.log("URL:", url);
          console.log("Public ID:", publicId);
          
        }}
        uploadPreset="dcjfs98o"
      >
        {({ open }: { open: () => void }) => {
          return (
            <button onClick={() => open()}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
      
      {publicId && (
        <p className="mt-2">Image uploadée avec l'ID: {publicId}</p>
      )}
    </>
  )
}

export default Upload