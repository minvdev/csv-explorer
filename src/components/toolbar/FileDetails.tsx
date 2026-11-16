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

	return (
		<div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1 text-sm">
			<span className="font-medium text-gray-900">{fileName}</span>
			<span className="text-gray-500">{detail}</span>
		</div>
	);
}

export default FileDetails;
