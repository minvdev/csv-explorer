import { buttonTone, buttonToneDisabled } from "@components/ui";
import FileSelector from "@features/csv/FileSelector";

interface EmptyStateProps {
	isLoading: boolean;
	onFileSelected: (file: File) => void;
}

function EmptyState({ isLoading, onFileSelected }: EmptyStateProps) {
	return (
		<section className="relative flex min-h-full items-center overflow-hidden bg-linear-to-br from-orange-50/70 via-white to-white px-6 max-sm:px-4">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-2/5 bg-orange-50 lg:block"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-orange-100/60 to-transparent lg:hidden"
			/>
			<div className="relative mx-auto grid w-full max-w-5xl items-center gap-12 py-12 lg:grid-cols-2 [@media(max-height:700px)]:grid-cols-1 [@media(max-height:400px)]:py-4">
				<div className="mx-auto max-w-md lg:mx-0">
					<p className="text-sm font-semibold tracking-wide text-orange-600 uppercase">
						CSV Explorer
					</p>
					<h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900">
						Tus datos, claros de un vistazo.
					</h1>
					<p className="mt-4 text-sm leading-6 text-gray-600">
						Carga un CSV para consultar sus filas, aplicar filtros y conocer cada una de
						sus columnas.
					</p>
					<div className="mt-7">
						<FileSelector disabled={isLoading} onFileSelected={onFileSelected}>
							<span className={isLoading ? buttonToneDisabled : buttonTone}>
								{isLoading ? "Cargando..." : "Abrir archivo CSV"}
							</span>
						</FileSelector>
					</div>
				</div>
				<div
					aria-hidden="true"
					className="relative mx-auto w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-lg shadow-orange-950/5 [@media(max-height:700px)]:hidden"
				>
					<div className="mb-4 flex items-center gap-1.5">
						<span className="size-2 rounded-full bg-orange-200" />
						<span className="size-2 rounded-full bg-orange-300" />
						<span className="size-2 rounded-full bg-orange-400" />
					</div>
					<div className="grid grid-cols-4 gap-px overflow-hidden rounded border border-gray-100 bg-gray-100 text-[10px]">
						{Array.from({ length: 28 }, (_, index) => (
							<span
								className={
									index < 4
										? "h-7 bg-orange-100"
										: index % 4 === 0
											? "h-7 bg-orange-50"
											: "h-7 bg-white"
								}
								key={index}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default EmptyState;
