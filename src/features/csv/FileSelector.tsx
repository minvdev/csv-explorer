import type { ReactNode } from "react";

interface FileSelectorProps {
	onFileSelected: (file: File) => void;
	children: ReactNode;
}

function FileSelector({ onFileSelected, children }: FileSelectorProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			onFileSelected(file);
		}
	};

	return (
		<label>
			<input accept=".csv,text/csv" className="sr-only" type="file" onChange={handleChange} />
			{children}
		</label>
	);
}

export default FileSelector;
