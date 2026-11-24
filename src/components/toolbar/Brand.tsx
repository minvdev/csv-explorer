import logoUrl from "@/assets/logo/logo-cuadro.svg";

function Brand() {
	return (
		<div className="flex shrink-0 items-center gap-2">
			<img className="size-4.5 shrink-0" src={logoUrl} alt="" />
			<span className="text-sm font-semibold whitespace-nowrap text-gray-900 max-md:sr-only">
				CSV Explorer
			</span>
		</div>
	);
}

export default Brand;
