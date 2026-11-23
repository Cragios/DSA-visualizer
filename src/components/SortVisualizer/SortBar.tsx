import { SORT_COLORS } from "../../components";

/** Properties used to render one bar in the sorting visualization. */
export interface SortBarProps {
	/** Value represented by the bar. */
	value: number;
	/** Position of the value in the array. */
	index: number;
	/** Largest value in the array, used to scale the bar height. */
	maxValue: number;
	/** Labels describing the bar's current role in the algorithm. */
	roles: string[];
	/** Tailwind background class used to highlight the bar. */
	bgClass: string;
}

/**
 * Renders a value as a labeled, height-scaled bar.
 * @param props Value, index, scaling maximum, role labels, and highlight class.
 */
export function SortBar({ value, index, maxValue, roles, bgClass }: SortBarProps) {
	const classNames = [
		"relative box-border flex min-h-9 w-[clamp(22px,3.4vw,36px)] shrink-0 items-start justify-center rounded-t-[7px] rounded-b-[2px] border border-b-0 border-slate-400 pt-2 font-mono text-[clamp(10px,1vw,12px)] font-bold text-white shadow-md transition-[height,background] duration-200 motion-reduce:transition-none max-[520px]:min-h-7.5 max-[520px]:w-5.5 max-[520px]:basis-5.5 max-[520px]:pt-1.5",
		bgClass || SORT_COLORS.base,
		bgClass === SORT_COLORS.pointer && SORT_COLORS.pointer,
		bgClass === SORT_COLORS.key && SORT_COLORS.key,
		bgClass === SORT_COLORS.boundary && SORT_COLORS.boundary,
	]
		.filter(Boolean)
		.join(" ");
	const height = maxValue > 0 ? `${(value / maxValue) * 100}%` : "0%";

	return (
		<div className={classNames} style={{ height }}>
			{value}
			<span className="absolute -bottom-5.25 left-1/2 -translate-x-1/2 rounded-[5px] bg-slate-700 px-1.25 py-0.5 font-mono text-[9px] leading-[1.2] whitespace-nowrap text-white max-[520px]:text-[8px]">
				{index}
			</span>
			{roles.length > 0 && (
				<span className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 gap-1 max-[520px]:gap-0.5">
					{roles.map((role) => (
						<span
							key={role}
							className={`rounded-[5px] px-1.25 py-0.5 font-mono text-[9px] leading-[1.2] whitespace-nowrap text-white max-[520px]:text-[8px] ${
								bgClass || SORT_COLORS.base
							}`}
						>
							{role}
						</span>
					))}
				</span>
			)}
		</div>
	);
}
