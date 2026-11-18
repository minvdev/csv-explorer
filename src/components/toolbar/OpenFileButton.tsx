import { buttonTone, buttonToneDisabled } from "@components/ui";

interface OpenFileButtonProps {
	disabled?: boolean;
}

function OpenFileButton({ disabled = false }: OpenFileButtonProps) {
	return (
		<span aria-disabled={disabled} className={disabled ? buttonToneDisabled : buttonTone}>
			Abrir archivo
		</span>
	);
}

export default OpenFileButton;
