interface FileSelectorProps {
	onFileSelected: (file: File) => void;
}

function FileSelector({ onFileSelected }: FileSelectorProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			onFileSelected(file);
		}
	};

	return <input accept=".csv,text/csv" type="file" onChange={handleChange} />;
}

export default FileSelector;
