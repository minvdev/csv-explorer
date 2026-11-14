import Papa from "papaparse";

import type { CsvData, CsvRow } from "./types";

export type CsvParseErrorKind = "empty" | "invalid";

export class CsvParseError extends Error {
	kind: CsvParseErrorKind;

	constructor(kind: CsvParseErrorKind, message: string) {
		super(message);
		this.name = "CsvParseError";
		this.kind = kind;
	}
}

// Non-fatal Papa warnings we tolerate and normalize instead of rejecting the file.
const TOLERATED_ERROR_CODES = new Set(["UndetectableDelimiter", "TooFewFields", "TooManyFields"]);

function sanitizeRow(row: CsvRow, headers: string[]): CsvRow {
	const sanitized: CsvRow = {};
	for (const header of headers) {
		sanitized[header] = row[header] ?? "";
	}
	return sanitized;
}

function parseCsv(text: string): Promise<CsvData> {
	return new Promise((resolve, reject) => {
		if (text.trim() === "") {
			reject(new CsvParseError("empty", "The file is empty"));
			return;
		}

		Papa.parse<CsvRow>(text, {
			header: true,
			skipEmptyLines: "greedy",
			worker: true,
			complete: (results) => {
				const tolerated = results.errors.filter((error) =>
					TOLERATED_ERROR_CODES.has(error.code),
				);
				const fatal = results.errors.find(
					(error) => !TOLERATED_ERROR_CODES.has(error.code),
				);
				if (fatal) {
					reject(new CsvParseError("invalid", `invalid CSV: ${fatal.message}`));
					return;
				}

				if (!results.meta.fields || results.data.length === 0) {
					reject(new CsvParseError("empty", "The CSV file does not contain rows"));
					return;
				}

				resolve({
					headers: results.meta.fields,
					rows: results.data.map((row) =>
						sanitizeRow(row, results.meta.fields as string[]),
					),
					warnings: tolerated.map((error) => error.code),
				});
			},
			error: (error: Error) => {
				reject(error);
			},
		});
	});
}

export default parseCsv;
