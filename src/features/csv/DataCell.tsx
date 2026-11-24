import { useEffect, useRef, useState } from "react";

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

		const measure = () => setTruncated(text.scrollWidth > text.clientWidth);
		const observer = new ResizeObserver(measure);
		observer.observe(text);
		measure();
		return () => observer.disconnect();
	}, [value]);

	return (
		<div className="max-w-75 truncate" ref={textRef}>
			{truncated ? (
				<button
					className="cursor-pointer text-left hover:underline"
					onClick={(event) => onSelect(value, event.currentTarget)}
					type="button"
				>
					{value}
				</button>
			) : (
				value
			)}
		</div>
	);
}

export default DataCell;
