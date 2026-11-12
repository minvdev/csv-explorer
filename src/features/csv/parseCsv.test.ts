import { describe, expect, it } from "vitest";

import parseCsv, { CsvParseError } from "./parseCsv";

async function parseErrorOf(text: string): Promise<CsvParseError> {
	try {
		await parseCsv(text);
	} catch (error) {
		expect(error).toBeInstanceOf(CsvParseError);
		return error as CsvParseError;
	}
	throw new Error("Se esperaba un CsvParseError");
}

describe("parseCsv", () => {
	it("parses headers and rows from a valid CSV", async () => {
		const data = await parseCsv("nombre,edad\nAna,30\nLuis,25");
		expect(data.headers).toEqual(["nombre", "edad"]);
		expect(data.rows).toEqual([
			{ nombre: "Ana", edad: "30" },
			{ nombre: "Luis", edad: "25" },
		]);
	});

	it("preserves commas and quotes inside cells", async () => {
		const data = await parseCsv('nombre,nota\n"Pérez, Ana","85,5"');
		expect(data.headers).toEqual(["nombre", "nota"]);
		expect(data.rows).toEqual([{ nombre: "Pérez, Ana", nota: "85,5" }]);
	});

	it("discards blank lines", async () => {
		const data = await parseCsv("nombre,edad\nAna,30\n\n\nLuis,25\n");
		expect(data.rows).toEqual([
			{ nombre: "Ana", edad: "30" },
			{ nombre: "Luis", edad: "25" },
		]);
	});

	it("throws CsvParseError 'empty' with empty text", async () => {
		expect((await parseErrorOf("")).kind).toBe("empty");
	});

	it("throws CsvParseError 'empty' with headers only and no rows", async () => {
		expect((await parseErrorOf("nombre,edad\n")).kind).toBe("empty");
	});

	it("throws CsvParseError 'invalid' with malformed CSV", async () => {
		expect((await parseErrorOf('nombre,edad\n"Ana,30')).kind).toBe("invalid");
	});
});
