import filePlusUrl from "@/assets/file-plus.svg";
import { buttonTone, buttonToneDisabled } from "@components/ui";

interface OpenFileButtonProps {
	isLoading: boolean;
	hasFile: boolean;
}

function OpenFileButton({ isLoading, hasFile }: OpenFileButtonProps) {
	return (
		<span
			className={`${isLoading ? buttonToneDisabled : buttonTone} ${
				hasFile && !isLoading ? "max-xs:w-8 max-xs:justify-center max-xs:px-0" : ""
			}`}
		>
			{isLoading ? (
				"Cargando..."
			) : hasFile ? (
				<>
					<img className="hidden size-4 shrink-0 max-xs:block" src={filePlusUrl} alt="" />
					<span className="max-xs:sr-only">Abrir</span>
					<span className="lg:ml-1 max-lg:sr-only"> archivo</span>
				</>
			) : (
				"Abrir archivo"
			)}
		</span>
	);
}

export default OpenFileButton;
