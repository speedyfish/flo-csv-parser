"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react";

type SQLWindowProps = {
  sqlStatements: Record<string, string[]>;
  onClose: () => void;
};

export default function SQLWindow({ sqlStatements, onClose }: SQLWindowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Flatten the object into a single string
    const allStatements = Object.entries(sqlStatements)
      .map(([nmi, statements]) => `-- ${nmi}\n${statements.join("\n")}`)
      .join("\n\n");

    navigator.clipboard.writeText(allStatements);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2s
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[95%] max-w-3xl h-[80%] overflow-auto relative shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Close
        </button>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute top-3 right-20 bg-blue-500 text-white px-3 py-1 rounded flex items-center space-x-1 hover:bg-blue-600"
        >
          <Copy className="w-4 h-4" />
          <span>{copied ? "Copied!" : "Copy All"}</span>
        </button>

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">SQL Insert Statements</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm whitespace-pre-wrap">
            {Object.entries(sqlStatements).map(([nmi, statements]) => (
              <React.Fragment key={nmi}>
                <span className="font-semibold">-- {nmi}</span>
                {"\n"}
                {statements.join("\n")}
                {"\n\n"}
              </React.Fragment>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}
