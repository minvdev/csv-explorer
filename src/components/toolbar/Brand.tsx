import logoUrl from "@/assets/logo/logo-cuadro.svg";

function Brand() {
	return (
		<div className="flex items-center gap-2">
			<img src={logoUrl} alt="" />
			<span className="text-sm font-semibold text-gray-900">CSV Explorer</span>
		</div>
	);
}

export default Brand;
