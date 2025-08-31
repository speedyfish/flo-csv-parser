"use client"; // if you're on Next.js App Router

import React, { useState } from "react";
import Papa from "papaparse";
import CSVInput from "./components/CSVInput";
import CSVInputReupload from "./components/CSVInputReupload";
import CSVPreview from "./components/CSVPreview";
import CSVFullscreen from "./components/CSVFullscreen";
import SQLPanel from "./components/SQLPanel";

export default function CsvUploader() {
  const [data, setData] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [expanded, setExpanded] = useState(false);

  const parseCSV = (file: File): void => {
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

  let nmi = "";
  let intervalLength = 0;
  let noOfConsumptions = 0;
  let sqlStatementsByNmi: Record<string, string[]> = {};

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === "200") {
      nmi = data[i][1];
      intervalLength = Number(data[i][8]);
      noOfConsumptions = (24 * 60) / intervalLength;
      // Initialize sqlStatementsByNmi if doesnt exist
      if (!sqlStatementsByNmi[nmi]) sqlStatementsByNmi[nmi] = [];
    }

    if (data[i][0] === "300") {
      const startingDate = data[i][1];
      const year = Number(startingDate.substring(0, 4));
      const month = Number(startingDate.substring(4, 6)) - 1;
      const day = Number(startingDate.substring(6, 8));
      let timestamp = new Date(year, month, day, 0, 0, 0);

      for (let a = 2; a < 2 + noOfConsumptions && a < data[i].length; a++) {
        const timestampStr = timestamp
          .toLocaleString("sv-SE")
          .replace("T", " ");
        const consumption = data[i][a];
        sqlStatementsByNmi[nmi].push(
          `INSERT INTO meter_readings ("nmi", "timestamp", "consumption") VALUES ('${nmi}', '${timestampStr}', '${consumption}');`
        );

        timestamp = new Date(timestamp.getTime() + intervalLength * 60 * 1000);
      }
    }
  }

  return (
    <div className="bg-background p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column: Upload + Preview */}
        <div className="md:w-1/3 w-full">
          <h1>Upload CSV to generate INSERT SQL statements</h1>

          {data.length === 0 ? (
            <CSVInput onFileSelect={setFile} onParseCSV={parseCSV} />
          ) : (
            <CSVInputReupload
              file={file}
              onFileSelect={setFile}
              setData={setData}
            />
          )}

          {file && (
            <p className="mt-3 text-sm text-gray-700">
              Selected file: <span className="font-medium">{file.name}</span>
            </p>
          )}

          {error && <p className="text-red-500 mt-2">{error}</p>}

          {data.length > 0 && <h1 className="my-3">CSV Preview</h1>}

          {data.length > 0 && (
            <div className="relative">
              <CSVPreview data={data} onExpand={() => setExpanded(true)} />
              {expanded && (
                <CSVFullscreen data={data} onClose={() => setExpanded(false)} />
              )}
            </div>
          )}
        </div>

        {/* Right column: Third component */}
        {Object.keys(sqlStatementsByNmi).length > 0 && (
          <div className="md:w-2/3 w-full bg-gray-100 p-4 rounded-lg shadow-lg">
            <SQLPanel sqlStatements={sqlStatementsByNmi} />
          </div>
        )}
      </div>
    </div>
  );
}
