
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  value?: string | null;
  className?: string;
  previewClassName?: string;
  accept?: string;
}

export const FileUpload = ({
  onFileChange,
  value,
  className,
  previewClassName,
  accept = "image/*",
}: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onFileChange(file);
    } else {
      setPreview(null);
      onFileChange(null);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {preview ? (
        <div className="relative">
          <img 
            src={preview} 
            alt="Preview" 
            className={cn("rounded-md object-cover", previewClassName || "w-full h-40")} 
          />
          <Button 
            variant="destructive" 
            size="icon" 
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "border-2 border-dashed border-muted-foreground/25 rounded-md flex flex-col items-center justify-center p-6 cursor-pointer hover:border-primary/50 transition-colors",
            previewClassName || "h-40"
          )}
        >
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground text-center">
            Haz clic para subir una imagen o arrastra y suelta aquí
          </p>
        </div>
      )}
      <input
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept={accept}
        ref={fileInputRef}
      />
    </div>
  );
};
