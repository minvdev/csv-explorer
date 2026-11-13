import { describe, expect, it } from "vitest";

import columnStats, { normalizeNumber } from "./columnStats";
import type { CsvRow } from "./types";

describe("normalizeNumber", () => {
	it("acepta enteros y decimales con punto y con coma", () => {
		expect(normalizeNumber("85")).toBe(85);
		expect(normalizeNumber("85.5")).toBe(85.5);
		expect(normalizeNumber("85,5")).toBe(85.5);
	});

	it("trata igual punto y coma como separador decimal", () => {
		expect(normalizeNumber("1.234")).toBe(1.234);
		expect(normalizeNumber("1,234")).toBe(1.234);
	});

	it("recorta espacios", () => {
		expect(normalizeNumber(" 42 ")).toBe(42);
	});

	it("soporta negativos y notación exponencial", () => {
		expect(normalizeNumber("-5")).toBe(-5);
		expect(normalizeNumber("1e3")).toBe(1000);
	});

	it("devuelve null con texto no numérico", () => {
		expect(normalizeNumber("abc")).toBeNull();
	});

	it("devuelve null con celdas vacías", () => {
		expect(normalizeNumber("")).toBeNull();
		expect(normalizeNumber("   ")).toBeNull();
	});
});

describe("columnStats", () => {
	it("calcula mínimo, máximo y media de una columna numérica", () => {
		const rows = [{ edad: "30" }, { edad: "10" }, { edad: "20" }];
		expect(columnStats(rows, "edad")).toEqual({ kind: "numeric", min: 10, max: 30, mean: 20 });
	});

	it("redondea la media a 2 decimales", () => {
		const rows = [{ v: "1" }, { v: "1" }, { v: "2" }];
		expect(columnStats(rows, "v")).toEqual({ kind: "numeric", min: 1, max: 2, mean: 1.33 });
	});

	it("acepta decimales con coma", () => {
		const rows = [{ v: "85,5" }, { v: "90" }];
		expect(columnStats(rows, "v")).toEqual({
			kind: "numeric",
			min: 85.5,
			max: 90,
			mean: 87.75,
		});
	});

	it("ignora celdas vacías", () => {
		const rows = [{ v: "10" }, { v: "" }, { v: "30" }];
		expect(columnStats(rows, "v")).toEqual({ kind: "numeric", min: 10, max: 30, mean: 20 });
	});

	it("soporta valores negativos", () => {
		const rows = [{ v: "-5" }, { v: "5" }];
		expect(columnStats(rows, "v")).toEqual({ kind: "numeric", min: -5, max: 5, mean: 0 });
	});

	it("marca como no numérica una columna con algún texto", () => {
		const rows = [{ v: "10" }, { v: "abc" }];
		expect(columnStats(rows, "v")).toEqual({ kind: "non-numeric" });
	});

	it("marca como no numérica una columna sin valores", () => {
		const emptyRows = [{ v: "" }, {}] as CsvRow[];
		expect(columnStats(emptyRows, "v")).toEqual({ kind: "non-numeric" });
	});
});
