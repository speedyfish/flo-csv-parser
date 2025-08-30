"use client"; // if you're on Next.js App Router

import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { Upload } from "lucide-react";

export default function CsvUploader() {
  const [data, setData] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const parseCSV = (file: File) => {
    if (file.type !== "text/csv") {
      setError("Please upload a valid CSV file.");
      return;
    }

    Papa.parse(file, {
      complete: (results) => {
        console.log("Parsed results:", results.data);
        setData(results.data as string[][]);
        setError(null);
      },
      error: (err) => {
        setError(`Error parsing CSV: ${err.message}`);
      },
    });
  };

  const handleFiles = (files: FileList) => {
    if (files && files[0]) {
      const selectedFile = files[0];
      setFile(selectedFile);
      parseCSV(selectedFile);
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
    <div className="min-h-screen bg-background">
      <div className="p-6 max-w-lg mx-auto">
        <h1 className="text-xl font-bold mb-4 font-medium">
          Upload CSV to generate INSERT SQL statements
        </h1>

        {data.length === 0 ? (
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
        ) : (
          <div className="flex items-center justify-between w-full border-2 border-gray-300 rounded-lg p-3 bg-white">
            {/* Left: icon + filename */}
            <div className="flex items-center space-x-2 min-w-0">
              <Upload className="w-5 h-5 text-gray-700 flex-shrink-0" />
              <span className="text-sm font-medium truncate" title={file?.name}>
                {file?.name}
              </span>
            </div>

            {/* Right: button */}
            <div className="flex items-center space-x-2">
              <button
                className="
        px-3 py-1 
        bg-brand-yellow 
        text-white 
        rounded 
        shadow-none 
        transition-shadow duration-150 
        hover:shadow-[4px_4px_0_0_var(--brand-black)]
        text-md
      "
                onClick={() => {
                  setFile(null);
                  setData([]);
                }}
              >
                Upload new file
              </button>
            </div>
          </div>
        )}

        {file && (
          <p className="mt-3 text-sm text-gray-700">
            Selected file: <span className="font-medium">{file.name}</span>
          </p>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {data.length > 0 && (
          <div className="mt-4 border rounded-lg p-4 bg-gray-100 max-h-64 overflow-y-auto">
            <h2 className="font-semibold mb-2">Parsed Data:</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-200 sticky top-0">
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th
                        key={key}
                        className="border border-gray-300 px-3 py-2 text-left font-semibold text-black"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 10).map((row, i) => (
                    <tr key={i} className="odd:bg-white even:bg-gray-50">
                      {Object.values(row).map((val, j) => (
                        <td
                          key={j}
                          className="border border-gray-300 px-3 py-2 text-black"
                        >
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
