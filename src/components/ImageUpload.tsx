import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, X, Image, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  selectedImage?: File | null;
  isProcessing?: boolean;
  acceptedFormats?: string[];
  maxSize?: number; // in MB
  className?: string;
}

const ImageUpload = ({
  onImageSelect,
  onImageRemove,
  selectedImage,
  isProcessing = false,
  acceptedFormats = ["image/jpeg", "image/png", "image/webp"],
  maxSize = 10,
  className
}: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return `File type not supported. Please use ${acceptedFormats.map(f => f.split('/')[1]).join(', ')}`;
    }
    
    if (file.size > maxSize * 1024 * 1024) {
      return `File size too large. Maximum size is ${maxSize}MB`;
    }
    
    return null;
  };

  const handleFileSelect = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setUploadProgress(0);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 50);

    setTimeout(() => {
      onImageSelect(file);
      setUploadProgress(100);
    }, 500);
  }, [onImageSelect, maxSize, acceptedFormats]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemoveImage = () => {
    setError(null);
    setUploadProgress(0);
    onImageRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      <Card 
        className={cn(
          "relative overflow-hidden transition-all duration-300 cursor-pointer",
          "border-2 border-dashed hover:border-primary/50",
          isDragOver && "border-primary bg-primary/5 scale-[1.02]",
          selectedImage && "border-solid border-border"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !selectedImage && fileInputRef.current?.click()}
      >
        <CardContent className="p-8">
          {!selectedImage ? (
            <div className="text-center space-y-4">
              <div className={cn(
                "w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all duration-300",
                isDragOver 
                  ? "bg-primary text-primary-foreground scale-110" 
                  : "bg-muted text-muted-foreground"
              )}>
                <Upload className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {isDragOver ? "Drop your image here" : "Upload an image"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Drag & drop or click to select • {acceptedFormats.map(f => f.split('/')[1]).join(', ')} • Max {maxSize}MB
                </p>
              </div>
              
              <Button variant="outline" className="pointer-events-none">
                <FileImage className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Image className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{selectedImage.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                {!isProcessing && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {uploadProgress < 100 && uploadProgress > 0 && (
                <div className="space-y-2">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-center text-muted-foreground">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        
        {isProcessing && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-muted-foreground">Processing...</p>
            </div>
          </div>
        )}
      </Card>
      
      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
          {error}
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptedFormats.join(',')}
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default ImageUpload;