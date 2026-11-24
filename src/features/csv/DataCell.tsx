import { useEffect, useRef, useState } from "react";

import { DETAILS_PANEL_ID } from "@components/DetailsPanel";

import observeTruncation from "./observeTruncation";

interface DataCellProps {
	value: string;
	onSelect: (value: string, trigger: HTMLButtonElement) => void;
}

function DataCell({ value, onSelect }: DataCellProps) {
	const textRef = useRef<HTMLDivElement>(null);
	const [truncated, setTruncated] = useState(false);

	useEffect(() => {
		const text = textRef.current;
		if (!text) return;

		return observeTruncation(text, setTruncated);
	}, [value]);

	return (
		<div className={`relative max-w-75 ${truncated ? "hover:underline" : ""}`}>
			<div className="truncate" ref={textRef} aria-hidden={truncated || undefined}>
				{value}
			</div>
			{truncated && (
				<button
					aria-label={value}
					aria-controls={DETAILS_PANEL_ID}
					className="absolute inset-0 cursor-pointer rounded-xs focus-visible:outline-2 focus-visible:outline-orange-600"
					onClick={(event) => onSelect(value, event.currentTarget)}
					type="button"
				/>
			)}
		</div>
	);
}

export default DataCell;
