import { Upload } from "lucide-react";

type CSVInputReuploadProps = {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  setData: (data: string[][]) => void;
};

const CSVInputReupload = ({
  file,
  onFileSelect,
  setData,
}: CSVInputReuploadProps) => {
  return (
    <div className="flex items-center justify-between w-full border-2 border-gray-300 rounded-lg p-3 bg-white">
      {/* Left: icon + filename */}
      <div className="flex items-center space-x-2 min-w-0">
        <Upload className="w-5 h-5 text-gray-700 flex-shrink-0" />
        <span
          className="text-sm font-medium truncate dark:text-black"
          title={file?.name}
        >
          {file?.name}
        </span>
      </div>

      {/* Right: button */}
      <div className="flex items-center">
        <button
          className="
                px-3 py-1 
                text-md
                whitespace-nowrap
            "
          onClick={() => {
            onFileSelect(null);
            setData([]);
          }}
        >
          Re-upload
        </button>
      </div>
    </div>
  );
};

export default CSVInputReupload;
