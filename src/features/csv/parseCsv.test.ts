import { describe, expect, it } from "vitest";

import parseCsv, { CsvParseError } from "./parseCsv";

function parseErrorOf(text: string): CsvParseError {
	try {
		parseCsv(text);
	} catch (error) {
		expect(error).toBeInstanceOf(CsvParseError);
		return error as CsvParseError;
	}
	throw new Error("Se esperaba un CsvParseError");
}

describe("parseCsv", () => {
	it("parsea cabeceras y filas de un CSV válido", () => {
		const data = parseCsv("nombre,edad\nAna,30\nLuis,25");
		expect(data.headers).toEqual(["nombre", "edad"]);
		expect(data.rows).toEqual([
			{ nombre: "Ana", edad: "30" },
			{ nombre: "Luis", edad: "25" },
		]);
	});

	it("preserva comas y comillas dentro de las celdas", () => {
		const data = parseCsv('nombre,nota\n"Pérez, Ana","85,5"');
		expect(data.headers).toEqual(["nombre", "nota"]);
		expect(data.rows).toEqual([{ nombre: "Pérez, Ana", nota: "85,5" }]);
	});

	it("descarta las líneas en blanco", () => {
		const data = parseCsv("nombre,edad\nAna,30\n\n\nLuis,25\n");
		expect(data.rows).toEqual([
			{ nombre: "Ana", edad: "30" },
			{ nombre: "Luis", edad: "25" },
		]);
	});

	it("lanza CsvParseError 'empty' con un texto vacío", () => {
		expect(parseErrorOf("").kind).toBe("empty");
	});

	it("lanza CsvParseError 'empty' con solo cabecera y sin filas", () => {
		expect(parseErrorOf("nombre,edad\n").kind).toBe("empty");
	});

	it("lanza CsvParseError 'invalid' con un CSV mal formado", () => {
		expect(parseErrorOf('nombre,edad\n"Ana,30').kind).toBe("invalid");
	});
});
