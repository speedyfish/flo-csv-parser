"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react";

type SQLStatements = Record<string, string[]>;

type SQLPanelProps = {
  sqlStatements: SQLStatements;
};

export default function SQLPanel({ sqlStatements }: SQLPanelProps) {
  const [copied, setCopied] = useState(false);
  const [sanitized, setSanitized] = useState(true);

  const handleCopy = () => {
    const allStatements = Object.entries(sqlStatements)
      .map(([nmi, statements]) => `-- ${nmi}\n${statements.join("\n")}`)
      .join("\n\n");

    navigator.clipboard.writeText(allStatements);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  function sanitizeSQL(sqlStatements: SQLStatements): SQLStatements {
    const sanitized: SQLStatements = {};

    Object.entries(sqlStatements).forEach(([nmi, statements]) => {
      const seenTimestamps = new Map<string, string>();

      statements.forEach((stmt) => {
        // Extract the timestamp from the statement using regex
        const match = stmt.match(/VALUES \('.*?', '(.*?)',/);
        if (match) {
          const timestamp = match[1];
          // Always overwrite: this ensures older duplicates are replaced
          seenTimestamps.set(timestamp, stmt);
        }
      });

      // Save deduplicated statements for this NMI
      sanitized[nmi] = Array.from(seenTimestamps.values());
    });

    return sanitized;
  }

  const sqlStatementsRefined = sanitized
    ? sanitizeSQL(sqlStatements)
    : sqlStatements;

  const toggleSanitized = () => {
    setSanitized(!sanitized);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-lg overflow-auto h-full font-mono text-sm">
      {/* Copy button */}
      <div className="flex items-center justify-between mb-4">
        {/* Santized statements toggle button */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setSanitized(!sanitized)}
        >
          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              sanitized ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                sanitized ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
          <span className="text-sm font-medium">
            {sanitized
              ? "Sanitized - Every statement has a unique nmi and timestamp"
              : "Unsanitized - May duplicate nmi and timestamp"}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="mb-4 bg-blue-500 text-white px-3 py-1 flex items-center space-x-1 "
        >
          <Copy className="w-4 h-4" />
          <span>{copied ? "Copied!" : "Copy All"}</span>
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2">
        SQL Insert Statements{" ("}
        {Object.values(sqlStatementsRefined).reduce(
          (acc, statements) => acc + statements.length,
          0
        )}{" "}
        statements)
      </h2>

      <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
        {Object.entries(sqlStatementsRefined).map(([nmi, statements]) => (
          <div key={nmi} className="mb-4">
            {/* NMI comment */}
            <span className="text-green-600 font-semibold">
              -- {nmi} ({statements.length} statements)
            </span>
            <div>
              {statements.map((stmt, idx) => {
                // Simple highlighting: keywords blue, strings red
                const highlighted = stmt
                  .replace(
                    /\b(INSERT|INTO|VALUES|UUID|NUMERIC|TIMESTAMP)\b/g,
                    (match) =>
                      `<span class="text-blue-600 font-bold">${match}</span>`
                  )
                  .replace(
                    /'([^']*)'/g,
                    (match) => `<span class="text-red-600">${match}</span>`
                  );

                return (
                  <pre
                    key={idx}
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
