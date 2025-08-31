import { Upload } from "lucide-react";
import { useState } from "react";

interface CSVInputProps {
  onFileSelect: (file: File) => void;
  onParseCSV: (file: File) => void;
}

export default function CSVInput({ onFileSelect, onParseCSV }: CSVInputProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList) => {
    if (files && files[0]) {
      const selectedFile = files[0];
      onFileSelect(selectedFile);
      onParseCSV(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  return (
    <label
      htmlFor="file-upload"
      className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition
          ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-white"
          }
        `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="w-10 h-10 text-black mb-2" />
      <p className="font-semibold text-black">
        Click to upload
        <span className="font-normal"> or drag and drop</span>
      </p>
      <p className="text-sm text-gray-500 mt-1">
        CSV, XLS, XLSX · File size max 20mb
      </p>
      <input
        id="file-upload"
        type="file"
        accept=".csv,.xls,.xlsx"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  );
}
