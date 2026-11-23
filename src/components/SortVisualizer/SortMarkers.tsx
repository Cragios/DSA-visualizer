/** Describes a value and its role in the current sorting step. */
export interface SortMarker {
	/** Short label identifying the role, such as an index name. */
	key: string;
	/** Value associated with the role. */
	value: number;
	/** Brief explanation of the role. */
	note: string;
	/** Tailwind class used to color the marker. */
	colorClass: string;
}

/** Properties used to render the current algorithm markers and note. */
export interface SortMarkersProps {
	/** Marker values and labels for the current step. */
	markers: SortMarker[];
	/** Summary of the current algorithm operation. */
	note: string;
}

/**
 * Renders the index markers and operation note for a sorting step.
 * @param props Markers and the current operation note.
 */
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
