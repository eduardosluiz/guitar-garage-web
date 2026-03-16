// src/components/admin/MediaUpload.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash, Video } from "lucide-react";
import React from "react";

interface MediaUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  acceptVideo?: boolean;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  value,
  onChange,
  onRemove,
  acceptVideo = false
}) => {
  const onUpload = (result: any) => {
    if (result.event === "success") {
      onChange(result.info.secure_url);
    }
  };

  return ( 
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        {value.map((url) => {
          const isVideo = url.endsWith('.mp4') || url.endsWith('.mov') || url.includes('/video/upload/');
          
          return (
            <div key={url} style={{ position: 'relative', width: '150px', height: '150px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.2)', backgroundColor: '#000' }}>
              <div style={{ position: 'absolute', top: '4px', right: '4px', zIndex: 10 }}>
                <button 
                  type="button" 
                  onClick={() => onRemove(url)} 
                  style={{ backgroundColor: '#f06548', color: 'white', border: 'none', padding: '4px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  <Trash size={12} />
                </button>
              </div>
              {isVideo ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--gold)' }}>
                  <Video size={32} />
                  <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>VÍDEO</span>
                </div>
              ) : (
                <img src={url} alt="Upload" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
          );
        })}
      </div>
      <CldUploadWidget 
        onSuccess={onUpload} 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          multiple: true, // Permite selecionar vários arquivos
          clientAllowedFormats: acceptVideo ? ["png", "jpg", "jpeg", "webp", "mp4", "mov", "avi"] : ["png", "jpg", "jpeg", "webp"],
          maxFileSize: acceptVideo ? 50000000 : 10000000,
          language: "pt", // Interface em português
          text: {
            pt: {
              menu: {
                files: "Meus Arquivos",
                camera: "Câmera"
              },
              local: {
                browse: "Escolher Arquivos",
                dd_instruction: "Arraste e solte os arquivos aqui"
              }
            }
          }
        }}
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
              {acceptVideo ? "Subir Fotos/Vídeos" : "Subir Fotos"}
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
   );
}
 
export default MediaUpload;
