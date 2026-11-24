const listeners = new Map<Element, (truncated: boolean) => void>();
let observer: ResizeObserver | undefined;

export default function observeTruncation(element: Element, report: (truncated: boolean) => void) {
	observer ??= new ResizeObserver((entries) => {
		for (const { target } of entries) {
			if (target.isConnected) {
				listeners.get(target)?.(target.scrollWidth > target.clientWidth);
			}
		}
	});
	listeners.set(element, report);
	observer.observe(element);
	report(element.scrollWidth > element.clientWidth);
	return () => {
		listeners.delete(element);
		observer?.unobserve(element);
	};
}
