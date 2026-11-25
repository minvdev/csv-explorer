import { chipTone } from "@components/ui";

interface FileDetailsProps {
	fileName: string;
	shownRows: number;
	totalRows: number;
	columns: number;
}

function FileDetails({ fileName, shownRows, totalRows, columns }: FileDetailsProps) {
	const searching = shownRows !== totalRows;
	const detail = searching
		? `${shownRows} de ${totalRows} filas`
		: `${totalRows} ${totalRows === 1 ? "fila" : "filas"}, ${columns} ${columns === 1 ? "columna" : "columnas"}`;
	const compactDetail = searching ? `${shownRows} de ${totalRows}` : `${totalRows} x ${columns}`;

	return (
		<div className="flex min-w-0 items-center gap-2 font-mono whitespace-nowrap max-xs:hidden">
			<span
				className="max-w-175 min-w-0 truncate text-xs font-semibold text-gray-900 max-2xl:max-w-100 max-xl:max-w-50 max-lg:max-w-25"
				title={fileName}
			>
				{fileName}
			</span>
			<span
				className={`${chipTone} shrink-0 truncate max-lg:max-w-40 max-md:max-w-25`}
				title={detail}
			>
				<span className="max-lg:hidden">{detail}</span>
				<span className="hidden max-lg:inline" aria-label={detail}>
					{compactDetail}
				</span>
			</span>
		</div>
	);
}

export default FileDetails;
