// src/components/admin/MediaUpload.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash, Video, ChevronLeft, ChevronRight, Star } from "lucide-react";
import React from "react";

export interface MediaItem {
  url: string;
  ordem: number;
}

interface MediaUploadProps {
  value: MediaItem[];
  onChange: (value: MediaItem[] | ((prev: MediaItem[]) => MediaItem[])) => void;
  acceptVideo?: boolean;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  value,
  onChange,
  acceptVideo = false
}) => {
  const onUpload = (result: any) => {
    if (result.event === "success") {
      const newUrl = result.info.secure_url;
      
      // Usamos atualização funcional para evitar que uploads simultâneos se sobrescrevam
      onChange((prev) => {
        // Evita duplicatas se o evento disparar duas vezes por erro do widget
        if (prev.some(item => item.url === newUrl)) return prev;
        
        const newMedia: MediaItem = {
          url: newUrl,
          ordem: prev.length
        };
        return [...prev, newMedia];
      });
    }
  };

  const onRemove = (url: string) => {
    onChange((prev) => {
      const newValue = prev
        .filter((item) => item.url !== url)
        .map((item, index) => ({ ...item, ordem: index }));
      return newValue;
    });
  };

  const moveMedia = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= value.length) return;

    const newValue = [...value];
    const temp = newValue[index];
    newValue[index] = newValue[targetIndex];
    newValue[targetIndex] = temp;

    const finalValue = newValue.map((item, i) => ({ ...item, ordem: i }));
    onChange(finalValue);
  };

  const setAsMain = (index: number) => {
    const newValue = [...value];
    const item = newValue.splice(index, 1)[0];
    newValue.unshift(item);

    const finalValue = newValue.map((item, i) => ({ ...item, ordem: i }));
    onChange(finalValue);
  };

  // Sort value by order just in case
  const sortedValue = [...value].sort((a, b) => a.ordem - b.ordem);

  return ( 
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        {sortedValue.map((item, index) => {
          const { url, ordem } = item;
          const isVideo = url.endsWith('.mp4') || url.endsWith('.mov') || url.includes('/video/upload/');
          const isMain = ordem === 0;
          
          return (
            <div 
              key={url} 
              style={{ 
                position: 'relative', 
                width: '160px', 
                height: '160px', 
                borderRadius: '8px', 
                overflow: 'hidden', 
                border: isMain ? '2px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.1)', 
                backgroundColor: '#000',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Badge Principal */}
              {isMain && !isVideo && (
                <div style={{ 
                  position: 'absolute', 
                  top: '0', 
                  left: '0', 
                  backgroundColor: 'var(--gold)', 
                  color: '#000', 
                  fontSize: '0.6rem', 
                  fontWeight: 800, 
                  padding: '2px 6px', 
                  zIndex: 20,
                  borderBottomRightRadius: '4px'
                }}>
                  CAPA
                </div>
              )}

              {/* Botões de Ação Superiores */}
              <div style={{ position: 'absolute', top: '4px', right: '4px', zIndex: 10, display: 'flex', gap: '4px' }}>
                {!isMain && !isVideo && (
                  <button 
                    type="button" 
                    onClick={() => setAsMain(index)} 
                    title="Definir como principal"
                    style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', padding: '4px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    <Star size={12} fill={isMain ? "var(--gold)" : "none"} color={isMain ? "var(--gold)" : "currentColor"} />
                  </button>
                )}
                <button 
                  type="button" 
                  onClick={() => onRemove(url)} 
                  style={{ backgroundColor: '#f06548', color: 'white', border: 'none', padding: '4px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  <Trash size={12} />
                </button>
              </div>

              {/* Conteúdo (Imagem ou Vídeo) */}
              {isVideo ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--gold)' }}>
                  <Video size={32} />
                  <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>VÍDEO</span>
                </div>
              ) : (
                <img src={url} alt="Upload" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}

              {/* Controles de Ordem Inferiores */}
              <div style={{ 
                position: 'absolute', 
                bottom: '0', 
                left: '0', 
                right: '0', 
                backgroundColor: 'rgba(0,0,0,0.7)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '4px 8px',
                zIndex: 15
              }}>
                <button 
                  type="button" 
                  disabled={index === 0}
                  onClick={() => moveMedia(index, 'left')}
                  style={{ background: 'none', border: 'none', color: index === 0 ? '#444' : '#fff', cursor: index === 0 ? 'default' : 'pointer' }}
                >
                  <ChevronLeft size={16} />
                </button>
                <span style={{ fontSize: '0.65rem', color: '#888', fontWeight: 600 }}>#{ordem + 1}</span>
                <button 
                  type="button" 
                  disabled={index === sortedValue.length - 1}
                  onClick={() => moveMedia(index, 'right')}
                  style={{ background: 'none', border: 'none', color: index === sortedValue.length - 1 ? '#444' : '#fff', cursor: index === sortedValue.length - 1 ? 'default' : 'pointer' }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <CldUploadWidget 
        onSuccess={onUpload} 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          multiple: true,
          clientAllowedFormats: acceptVideo ? ["png", "jpg", "jpeg", "webp", "mp4", "mov", "avi"] : ["png", "jpg", "jpeg", "webp"],
          maxFileSize: acceptVideo ? 50000000 : 10000000,
          language: "pt",
          text: {
            pt: {
              menu: { files: "Meus Arquivos", camera: "Câmera" },
              local: { browse: "Escolher Arquivos", dd_instruction: "Arraste e solte os arquivos aqui" }
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
              {acceptVideo ? "Adicionar Fotos/Vídeos" : "Adicionar Fotos"}
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
   );
}
 
export default MediaUpload;
