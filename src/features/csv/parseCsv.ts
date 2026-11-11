import Papa from "papaparse";

import type { CsvData, CsvRow } from "./types";

function parseCsv(text: string): CsvData {
	const results = Papa.parse<CsvRow>(text, {
		header: true,
		skipEmptyLines: true,
	});

	if (results.errors.length > 0) {
		throw new Error(`Error al parsear el CSV: ${results.errors[0].message}`);
	}

	if (!results.meta.fields || results.data.length === 0) {
		throw new Error("El CSV no contiene filas");
	}

	return { headers: results.meta.fields, rows: results.data };
}

export default parseCsv;
