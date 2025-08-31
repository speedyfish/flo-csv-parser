import { SQLStatements, sanitizeSQL } from "./src/app/components/SQLPanel";
import { describe, it, expect } from "vitest";

const input: SQLStatements = {
  NMI1: [
    "INSERT INTO meter_readings (\"nmi\", \"timestamp\", \"consumption\") VALUES ('NMI1', '2025-08-31 10:00:00', '100');",
    "INSERT INTO meter_readings (\"nmi\", \"timestamp\", \"consumption\") VALUES ('NMI1', '2025-08-31 10:00:00', '200');",
  ],
  NMI2: [
    "INSERT INTO meter_readings (\"nmi\", \"timestamp\", \"consumption\") VALUES ('NMI2', '2025-08-31 11:00:00', '50');",
  ],
};

const expected: SQLStatements = {
  NMI1: [
    "INSERT INTO meter_readings (\"nmi\", \"timestamp\", \"consumption\") VALUES ('NMI1', '2025-08-31 10:00:00', '200');",
  ],
  NMI2: [
    "INSERT INTO meter_readings (\"nmi\", \"timestamp\", \"consumption\") VALUES ('NMI2', '2025-08-31 11:00:00', '50');",
  ],
};

describe("sanitizeSQL", () => {
  it("removes duplicate timestamps per NMI", () => {
    expect(sanitizeSQL(input)).toEqual(expected);
  });

  it("does not remove unique timestamps", () => {
    const result = sanitizeSQL({
      NMI3: ["INSERT INTO ... VALUES ('NMI3', '2025-08-31 12:00:00', '10');"],
    });
    expect(result["NMI3"].length).toBe(1);
  });
});
