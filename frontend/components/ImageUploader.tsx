import React, { useRef, useState, useCallback } from 'react';
import { UploadIcon, CircularProgressIcon } from './Icons';

interface ImageUploaderProps {
  id: string;
  title: string;
  onImageSelect: (file: File) => void;
  imagePreviewUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  title,
  onImageSelect,
  imagePreviewUrl
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = useCallback(
    (file: File | undefined) => {
      if (file) {
        setIsProcessing(true);
        setProgress(0);

        const interval = setInterval(() => {
          setProgress(prev => {
            const next = prev + Math.floor(Math.random() * 10) + 5;
            if (next >= 100) {
              clearInterval(interval);
              onImageSelect(file);
              setIsProcessing(false);
              return 100;
            }
            return next;
          });
        }, 80);
      }
    },
    [onImageSelect]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files?.[0]);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
      handleFileSelect(file);
    }
  };

  const uploaderContent = () => {
    if (isProcessing) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-gray-500">
          <div className="relative w-12 h-12">
            <CircularProgressIcon progress={progress} />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-green-700">
              {progress}%
            </span>
          </div>
          <p className="font-medium mt-2">Uploading... 🌿</p>
        </div>
      );
    }

    if (imagePreviewUrl) {
      return (
        <img
          src={imagePreviewUrl}
          alt={title + ' preview'}
          className="w-full h-full object-cover rounded-lg"
        />
      );
    }

    return (
      <div className="text-center text-gray-500">
        <UploadIcon className="w-10 h-10 mx-auto mb-2" />
        <p className="font-medium">Drag & drop or click to upload</p>
        <p className="text-sm">PNG, JPG, WEBP</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <label
        htmlFor={id}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`w-full aspect-video rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer transition-all duration-300
          ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'}
          ${(imagePreviewUrl || isProcessing) ? 'p-0 border-solid' : 'p-4'}`}
      >
        {uploaderContent()}
      </label>
      <input
        ref={fileInputRef}
        type="file"
        id={id}
        name={id}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
        disabled={isProcessing}
      />
    </div>
  );
};
