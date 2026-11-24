import { afterEach, expect, it, vi } from "vitest";

import observeTruncation from "./observeTruncation";

afterEach(() => vi.unstubAllGlobals());

it("reports actual overflow, updates on resize and preserves the last reading after removal", () => {
	let notify!: (entries: { target: Element }[]) => void;
	const unobserve = vi.fn();
	vi.stubGlobal(
		"ResizeObserver",
		class {
			constructor(callback: typeof notify) {
				notify = callback;
			}
			observe() {}
			unobserve = unobserve;
		},
	);
	const dimensions = { clientWidth: 100, scrollWidth: 100, isConnected: true };
	const target = dimensions as Element;
	const report = vi.fn();
	const cleanup = observeTruncation(target, report);
	expect(report).toHaveBeenLastCalledWith(false);
	dimensions.clientWidth = 99;
	notify([{ target }]);
	expect(report).toHaveBeenLastCalledWith(true);
	Object.assign(dimensions, { isConnected: false, clientWidth: 0, scrollWidth: 0 });
	notify([{ target }]);
	expect(report).toHaveBeenCalledTimes(2);
	cleanup();
	expect(unobserve).toHaveBeenCalledWith(target);
	dimensions.isConnected = true;
	notify([{ target }]);
	expect(report).toHaveBeenCalledTimes(2);
});
