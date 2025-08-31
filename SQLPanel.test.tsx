import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // for matchers like toBeInTheDocument
import { describe, it, expect, vi, beforeEach } from "vitest";
import SQLPanel from "./src/app/components/SQLPanel";

import { mockData } from "./mock";

// Mock clipboard using Vitest's vi.fn()
beforeEach(() => {
  Object.assign(navigator, {
    clipboard: {
      writeText: vi.fn(),
    },
  });
});

describe("SQLPanel", () => {
  it("renders NMI and statement count", () => {
    render(<SQLPanel sqlStatements={mockData} />);
    expect(screen.getByText(/\(240 statements\)/i)).toBeInTheDocument();
    expect(screen.getByText(/-- NEM1201009/i)).toBeInTheDocument();
    expect(screen.getByText(/\(144 statements\)/i)).toBeInTheDocument();
    expect(screen.getByText(/-- NEM1201010/i)).toBeInTheDocument();
    expect(screen.getByText(/\(96 statements\)/i)).toBeInTheDocument();
  });

  it("copies all statements to clipboard", () => {
    render(<SQLPanel sqlStatements={mockData} />);
    const copyButton = screen.getByText(/Copy All/i);
    fireEvent.click(copyButton);

    // Build the expected clipboard content exactly like SQLPanel does
    const expectedClipboardText = Object.entries(mockData)
      .map(([nmi, statements]) => `-- ${nmi}\n${statements.join("\n")}`)
      .join("\n\n");

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expectedClipboardText
    );
  });
});
