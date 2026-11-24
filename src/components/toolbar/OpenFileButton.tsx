import filePlusUrl from "@/assets/file-plus.svg";
import { buttonTone, buttonToneDisabled } from "@components/ui";

interface OpenFileButtonProps {
	disabled?: boolean;
}

function OpenFileButton({ disabled = false }: OpenFileButtonProps) {
	return (
		<span className={disabled ? buttonToneDisabled : buttonTone}>
			<img className="hidden size-4 shrink-0 max-xs:block" src={filePlusUrl} alt="" />
			<span className="max-xs:sr-only">Abrir</span>
			<span className="lg:ml-1 max-lg:sr-only"> archivo</span>
		</span>
	);
}

export default OpenFileButton;
