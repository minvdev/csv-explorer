import { useCallback } from "react";

import type { CsvRow } from "./types";

interface DataTableProps {
	headers: string[];
	rows: CsvRow[];
	startIndex: number;
	selectedColumn: string | null;
	onSelectColumn: (column: string) => void;
}

function DataTable({ headers, rows, startIndex, selectedColumn, onSelectColumn }: DataTableProps) {
	const isSelected = (header: string) => header === selectedColumn;

	const scrollSelectedHeaderIntoView = useCallback((node: HTMLTableCellElement | null) => {
		node?.scrollIntoView({ block: "nearest", inline: "nearest" });
	}, []);

	const bodyCellTone = (header: string, index: number) => {
		if (!isSelected(header)) {
			return "border-gray-300 bg-white";
		}
		const isFirstRow = index === 0;
		const isLastRow = index === rows.length - 1;
		return [
			"border-gray-300 bg-orange-100 border-l-orange-400 border-r-orange-400",
			isFirstRow ? "border-t-orange-400" : "",
			isLastRow ? "border-b-orange-400" : "",
		]
			.filter(Boolean)
			.join(" ");
	};

	return (
		<table className="w-full border-collapse border-gray-300 text-xs">
			<colgroup>
				<col className="w-12" />
			</colgroup>
			<thead>
				<tr>
					<th
						aria-label="Número de fila"
						className="w-12 border border-gray-300 bg-gray-50 px-2 py-1 font-normal"
					/>
					{headers.map((header) => (
						<th
							className={`px-2 py-1 font-normal ${isSelected(header) ? "bg-orange-300" : "border border-gray-300 bg-gray-50"}`}
							key={header}
							ref={isSelected(header) ? scrollSelectedHeaderIntoView : undefined}
							title={header}
						>
							<button
								className="w-full cursor-pointer hover:underline hover:decoration-current"
								type="button"
								onClick={() => onSelectColumn(header)}
							>
								<span className="block max-w-75 truncate">{header}</span>
							</button>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map((row, index) => (
					<tr key={index}>
						<td className="w-12 border border-gray-300 bg-gray-50 px-2 py-0.5 text-center has-[+_[data-col-selected]]:border-r-orange-400">
							{startIndex + index + 1}
						</td>
						{headers.map((header) => (
							<td
								className={`border px-2 py-0.5 has-[+_[data-col-selected]]:border-r-orange-400 ${bodyCellTone(header, index)}`}
								data-col-selected={isSelected(header) ? "" : undefined}
								key={header}
								title={row[header]}
							>
								<div className="max-w-75 truncate">{row[header]}</div>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default DataTable;
