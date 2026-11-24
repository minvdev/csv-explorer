import { useCallback } from "react";

import { DETAILS_PANEL_ID } from "@components/DetailsPanel";

import DataCell from "./DataCell";
import type { CsvRow } from "./types";

import "./DataTable.css";

interface DataTableProps {
	headers: string[];
	rows: CsvRow[];
	startIndex: number;
	selectedColumn: string | null;
	onSelectColumn: (column: string, trigger: HTMLButtonElement) => void;
	onSelectCell: (value: string, trigger: HTMLButtonElement) => void;
}

function DataTable({
	headers,
	rows,
	startIndex,
	selectedColumn,
	onSelectColumn,
	onSelectCell,
}: DataTableProps) {
	const isSelected = (header: string) => header === selectedColumn;

	const scrollSelectedHeaderIntoView = useCallback((node: HTMLTableCellElement | null) => {
		node?.scrollIntoView({ block: "nearest", inline: "nearest" });
	}, []);

	return (
		<table className="csv-table w-full border-separate border-spacing-0 text-xs">
			<colgroup>
				<col className="w-12" />
			</colgroup>
			<thead>
				<tr>
					<th
						aria-label="Número de fila"
						className="w-12 bg-gray-50 px-2 py-1 font-normal"
					/>
					{headers.map((header) => (
						<th
							className={`px-2 py-1 font-normal ${isSelected(header) ? "border-b-orange-400 bg-orange-300" : "bg-gray-50"}`}
							key={header}
							ref={isSelected(header) ? scrollSelectedHeaderIntoView : undefined}
							title={header}
						>
							<button
								aria-controls={DETAILS_PANEL_ID}
								aria-expanded={isSelected(header)}
								className="w-full cursor-pointer hover:underline hover:decoration-current"
								type="button"
								onClick={(event) => onSelectColumn(header, event.currentTarget)}
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
						<td className="w-12 bg-gray-50 px-2 py-0.5 text-center has-[+_[data-col-selected]]:border-r-orange-400">
							{startIndex + index + 1}
						</td>
						{headers.map((header) => (
							<td
								className={`px-2 py-0.5 has-[+_[data-col-selected]]:border-r-orange-400 ${isSelected(header) ? "border-r-orange-400 bg-orange-100" : "bg-white"}`}
								data-col-selected={isSelected(header) ? "" : undefined}
								key={header}
								title={row[header]}
							>
								<DataCell value={row[header]} onSelect={onSelectCell} />
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default DataTable;
