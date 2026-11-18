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
		<table className="border-collapse border-gray-300 text-xs">
			<thead>
				<tr>
					<th
						aria-label="Número de fila"
						className="min-w-12 border border-gray-300 bg-gray-50 px-2 py-1 font-normal"
					/>
					{headers.map((header) => (
						<th
							className={`max-w-75 truncate px-2 py-1 font-normal ${isSelected(header) ? "bg-orange-300" : "border border-gray-300 bg-gray-50"}`}
							key={header}
							ref={isSelected(header) ? scrollSelectedHeaderIntoView : undefined}
							title={header}
						>
							<button
								className="w-full cursor-pointer truncate"
								type="button"
								onClick={() => onSelectColumn(header)}
							>
								{header}
							</button>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map((row, index) => (
					<tr key={index}>
						<td className="min-w-12 border border-gray-300 bg-gray-50 px-2 py-0.5 text-center has-[+_[data-col-selected]]:border-r-orange-400">
							{startIndex + index + 1}
						</td>
						{headers.map((header) => (
							<td
								className={`max-w-75 truncate border px-2 py-0.5 has-[+_[data-col-selected]]:border-r-orange-400 ${bodyCellTone(header, index)}`}
								data-col-selected={isSelected(header) ? "" : undefined}
								key={header}
								title={row[header]}
							>
								{row[header]}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default DataTable;
