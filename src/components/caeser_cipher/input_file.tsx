import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";

interface InputFileProps {
  onFileUpload: (file: File) => void;
}

export default function InputFile({ onFileUpload }: InputFileProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label
        htmlFor="file-upload"
        className="text-sm font-semibold text-[var(--foreground)]"
      >
        Text File
      </Label>
      <Input
        id="file-upload"
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        className="bg-gray-800 file:bg-blue-50 file:text-black hover:file:bg-blue-100 file:border file:border-solid file:border-black file:rounded-md border-white"
      />
    </div>
  );
}
