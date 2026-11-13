import { describe, expect, it } from "vitest";

import filterRows, { normalizeText } from "./filterRows";
import type { CsvRow } from "./types";

const ROWS = [
	{ nombre: "Ana", ciudad: "Madrid" },
	{ nombre: "José", ciudad: "Barcelona" },
	{ nombre: "Luis", ciudad: "Sevilla" },
];

describe("normalizeText", () => {
	it("convierte a minúsculas y elimina acentos", () => {
		expect(normalizeText("Árbol José")).toBe("arbol jose");
	});
});

describe("filterRows", () => {
	it("encuentra coincidencias parciales en cualquier columna", () => {
		expect(filterRows(ROWS, "mad")).toEqual([{ nombre: "Ana", ciudad: "Madrid" }]);
	});

	it("ignora mayúsculas", () => {
		expect(filterRows(ROWS, "ANA")).toEqual([{ nombre: "Ana", ciudad: "Madrid" }]);
	});

	it("ignora acentos", () => {
		expect(filterRows(ROWS, "jose")).toEqual([{ nombre: "José", ciudad: "Barcelona" }]);
	});

	it("devuelve todas las filas con una query vacía", () => {
		expect(filterRows(ROWS, "")).toBe(ROWS);
	});

	it("devuelve todas las filas con una query de solo espacios", () => {
		expect(filterRows(ROWS, "   ")).toBe(ROWS);
	});

	it("devuelve un array vacío sin coincidencias", () => {
		expect(filterRows(ROWS, "zzz")).toEqual([]);
	});

	it("no rompe con celdas vacías o ausentes", () => {
		const rowsWithEmptyCells = [
			{ nombre: "Pep", ciudad: "" },
			{ nombre: "Ana", ciudad: undefined },
		] as CsvRow[];
		expect(filterRows(rowsWithEmptyCells, "ana")).toEqual([
			{ nombre: "Ana", ciudad: undefined },
		]);
	});

	it("no muta las filas originales", () => {
		filterRows(ROWS, "ana");
		expect(ROWS).toHaveLength(3);
	});
});
