import { useEffect, useRef, type ReactNode } from "react";

export const DETAILS_PANEL_ID = "details-panel";

interface DetailsPanelProps {
	id: string;
	label: string;
	title: string;
	onClose: () => void;
	trigger: HTMLButtonElement;
	children: ReactNode;
}

function DetailsPanel({ id, label, title, onClose, trigger, children }: DetailsPanelProps) {
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		closeButtonRef.current?.focus();
	}, [trigger]);

	return (
		<aside
			aria-label={label}
			className="flex w-72 shrink-0 flex-col overflow-y-auto border-l border-orange-100 bg-white text-sm max-sm:absolute max-sm:inset-x-0 max-sm:bottom-0 max-sm:z-20 max-sm:max-h-1/2 max-sm:w-full max-sm:border-t max-sm:border-l-0 max-sm:shadow-lg"
			id={id}
			onKeyDown={(event) => {
				if (event.key === "Escape") onClose();
			}}
		>
			<div className="sticky top-0 flex h-12 shrink-0 items-center justify-between gap-2 border-b border-orange-100 bg-orange-50 px-4">
				<h2 className="min-w-0 truncate font-semibold text-gray-700" title={title}>
					{title}
				</h2>
				<button
					aria-label="Cerrar detalles"
					className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded text-lg text-gray-500 hover:bg-orange-100 hover:text-orange-700 max-sm:size-10"
					onClick={onClose}
					ref={closeButtonRef}
					type="button"
				>
					×
				</button>
			</div>
			<div className="flex flex-col gap-4 p-4">{children}</div>
		</aside>
	);
}

export default DetailsPanel;
