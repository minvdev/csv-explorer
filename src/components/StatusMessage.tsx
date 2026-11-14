interface StatusMessageProps {
	message: string;
	tone: "info" | "warning" | "error";
}

const ROLE_BY_TONE: Record<StatusMessageProps["tone"], string> = {
	info: "status",
	warning: "status",
	error: "alert",
};
const CLASS_BY_TONE: Record<StatusMessageProps["tone"], string> = {
	info: "text-gray-600",
	warning: "text-orange-600",
	error: "text-red-600",
};

function StatusMessage({ message, tone }: StatusMessageProps) {
	return (
		<p className={`mt-2 text-sm ${CLASS_BY_TONE[tone]}`} role={ROLE_BY_TONE[tone]}>
			{message}
		</p>
	);
}

export default StatusMessage;
