import type { ParseResult } from "papaparse";

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

		const worker = new Worker(new URL("./csv.worker.ts", import.meta.url), {
			type: "module",
		});

		worker.onmessage = (event: MessageEvent<ParseResult<CsvRow>>) => {
			worker.terminate();
			const results = event.data;
			const tolerated = results.errors.filter((error) =>
				TOLERATED_ERROR_CODES.has(error.code),
			);
			const fatal = results.errors.find((error) => !TOLERATED_ERROR_CODES.has(error.code));
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
				rows: results.data.map((row) => sanitizeRow(row, results.meta.fields as string[])),
				warnings: tolerated.map((error) => error.code),
			});
		};
		worker.onerror = () => {
			worker.terminate();
			reject(new Error("CSV worker failed"));
		};
		worker.onmessageerror = () => {
			worker.terminate();
			reject(new Error("CSV worker returned an unreadable message"));
		};
		try {
			worker.postMessage(text);
		} catch (error) {
			worker.terminate();
			reject(error);
		}
	});
}

export default parseCsv;
