import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import StatusBar from "./StatusBar";
import { StatusContext, type StatusEntry } from "./StatusContext";

function renderStatusBar(statuses: StatusEntry[]) {
	return renderToStaticMarkup(
		<StatusContext.Provider
			value={{ statuses, showStatus: vi.fn(), removeStatus: vi.fn(), clearStatuses: vi.fn() }}
		>
			<StatusBar />
		</StatusContext.Provider>,
	);
}

describe("StatusBar", () => {
	it("mounts both announcement regions before any messages arrive", () => {
		const html = renderStatusBar([]);

		expect(html).toContain('aria-live="polite"');
		expect(html).toContain('role="alert"');
	});

	it("preserves message order and shows close buttons for dismissible messages", () => {
		const html = renderStatusBar([
			{ id: 1, message: "Sin resultados", tone: "info", dismissible: false },
			{ id: 2, message: "Aviso", tone: "warning", dismissible: true },
			{ id: 3, message: "Error", tone: "error", dismissible: true },
		]);

		expect(html).toMatch(/>Sin resultados<\/p>.*>Aviso<button.*>Error<button/);
		expect(html.match(/aria-label="Cerrar mensaje"/g)).toHaveLength(2);
	});
});
