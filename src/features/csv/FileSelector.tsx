import type { ReactNode } from "react";

interface FileSelectorProps {
	onFileSelected: (file: File) => void;
	disabled?: boolean;
	children: ReactNode;
}

function FileSelector({ onFileSelected, disabled = false, children }: FileSelectorProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (file) {
			onFileSelected(file);
		}
	};

	return (
		<label className={disabled ? "cursor-not-allowed" : undefined}>
			<input
				accept=".csv,text/csv"
				className="sr-only"
				disabled={disabled}
				type="file"
				onChange={handleChange}
			/>
			{children}
		</label>
	);
}

export default FileSelector;
