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

	it("parses a semicolon-separated CSV", async () => {
		const data = await parseCsv("nombre;edad\nAna;30");
		expect(data.headers).toEqual(["nombre", "edad"]);
		expect(data.rows).toEqual([{ nombre: "Ana", edad: "30" }]);
	});

	it("parses a tab-separated CSV", async () => {
		const data = await parseCsv("nombre\tedad\nAna\t30");
		expect(data.headers).toEqual(["nombre", "edad"]);
		expect(data.rows).toEqual([{ nombre: "Ana", edad: "30" }]);
	});

	it("parses a single-column quoted CSV", async () => {
		const data = await parseCsv('nombre\n"Ana"\n"Luis"');
		expect(data.headers).toEqual(["nombre"]);
		expect(data.rows).toEqual([{ nombre: "Ana" }, { nombre: "Luis" }]);
	});

	it("parses escaped quotes inside cells", async () => {
		const data = await parseCsv('texto\n"dijo ""hola"""');
		expect(data.rows).toEqual([{ texto: 'dijo "hola"' }]);
	});

	it("parses empty cells as empty strings", async () => {
		const data = await parseCsv("a,b,c\n1,,3\n4,,6");
		expect(data.rows).toEqual([
			{ a: "1", b: "", c: "3" },
			{ a: "4", b: "", c: "6" },
		]);
	});

	it("skips rows without any value", async () => {
		const data = await parseCsv("a,b,c\n,,\n1,,3");
		expect(data.rows).toEqual([{ a: "1", b: "", c: "3" }]);
	});

	it("fills missing cells of short rows with empty strings", async () => {
		const data = await parseCsv("a,b\n1\n2,3");
		expect(data.rows).toEqual([
			{ a: "1", b: "" },
			{ a: "2", b: "3" },
		]);
	});

	it("discards extra values of long rows", async () => {
		const data = await parseCsv("a,b\n1,2,3");
		expect(data.rows).toEqual([{ a: "1", b: "2" }]);
	});

	it("discards whitespace-only lines", async () => {
		const data = await parseCsv("a,b\n  \n1,2\n\t\n3,4");
		expect(data.rows).toEqual([
			{ a: "1", b: "2" },
			{ a: "3", b: "4" },
		]);
	});

	it("reports no warnings for a clean CSV", async () => {
		const data = await parseCsv("nombre,edad\nAna,30");
		expect(data.warnings).toEqual([]);
	});

	it("reports warnings for tolerated errors without rejecting the file", async () => {
		const data = await parseCsv("a,b\n1");
		expect(data.rows).toEqual([{ a: "1", b: "" }]);
		expect(data.warnings).toContain("TooFewFields");
	});

	it("reports the delimiter warning for a single-column quoted CSV", async () => {
		const data = await parseCsv('nombre\n"Ana"');
		expect(data.warnings).toContain("UndetectableDelimiter");
	});
});
