// src/components/admin/ImageUpload.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash } from "lucide-react";
import React from "react";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove
}) => {
  const onUpload = (result: any) => {
    // Na versão v6+ do next-cloudinary, o link vem em result.info.secure_url no onSuccess
    if (result.event === "success") {
      onChange(result.info.secure_url);
    }
  };

  return ( 
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        {value.map((url) => (
          <div key={url} style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <div style={{ position: 'absolute', top: '4px', right: '4px', zIndex: 10 }}>
              <button 
                type="button" 
                onClick={() => onRemove(url)} 
                style={{ backgroundColor: '#f06548', color: 'white', border: 'none', padding: '4px', borderRadius: '4px', cursor: 'pointer' }}
              >
                <Trash size={12} />
              </button>
            </div>
            <img src={url} alt="Upload" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      <CldUploadWidget 
        onSuccess={onUpload} 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      >
        {({ open }) => {
          return (
            <button 
              type="button" 
              onClick={() => open()}
              className="btn-boutique-outline"
              style={{ fontSize: '0.7rem' }}
            >
              <ImagePlus size={16} />
              Fazer Upload de Imagem
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
   );
}
 
export default ImageUpload;
