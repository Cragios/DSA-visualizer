export interface SortMarker {
	key: string;
	value: number;
	note: string;
	colorClass: string;
}

export interface SortMarkersProps {
	markers: SortMarker[];
	note: string;
}

export function SortMarkers({ markers, note }: SortMarkersProps) {
	return (
		<div
			className="mb-4.5 flex shrink-0 flex-wrap items-center gap-2 max-[520px]:mb-3.5 max-[520px]:gap-1.75"
			aria-label="Current algorithm indices"
		>
			{markers.map((marker) => {
				const className = [
					"inline-flex min-h-10.5 items-center gap-2.25 rounded-[11px] border border-slate-700 bg-slate-800 px-3 py-1.75 shadow-sm transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-px hover:border-slate-600 hover:shadow-lg max-[520px]:min-h-9.5 max-[520px]:gap-1.75 max-[520px]:px-2 max-[520px]:py-1.25",
				]
					.filter(Boolean)
					.join(" ");

				return (
					<span key={marker.key} className={className}>
						<b
							className={`grid size-6.5 min-w-6.5 place-items-center rounded-lg font-mono text-[11px] font-bold text-white drop-shadow-sm max-[520px]:size-5.75 max-[520px]:min-w-5.75 ${
								marker.key === "key" ? "min-w-9.5 px-1.25" : ""
							} ${marker.colorClass}`}
						>
							{marker.key}
						</b>
						<strong className="font-mono text-[13px] text-slate-100">{marker.value}</strong>
						<small className="text-[10px] leading-[1.2] text-slate-400 max-[520px]:hidden">{marker.note}</small>
					</span>
				);
			})}
			<span className="ml-auto rounded-full bg-slate-700 px-2.5 py-1.75 font-mono text-[11px] leading-[1.35] font-semibold text-slate-300 max-[520px]:basis-full max-[520px]:ml-0 max-[520px]:rounded-[9px]">
				{note}
			</span>
		</div>
	);
}
