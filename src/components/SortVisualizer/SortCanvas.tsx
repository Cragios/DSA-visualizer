import { SortBar } from "../../components";
import type { SortStep, SortBarProps } from "../../components";

/** Properties used to render the bars for the current sorting step. */
export interface SortCanvasProps<TStep extends SortStep> {
	/** Current algorithm state, including the array being visualized. */
	currStep: TStep;
	/** Largest array value, used to scale bar heights. */
	maxValue: number;
	/** Builds display properties for each bar from the current step and value. */
	genSortBarProps: (step: TStep, value: number, index: number, maxValue: number) => SortBarProps;
}

/**
 * Renders the array for the current sorting step as a row of bars.
 * @param props Current step, value scale, and bar-props generator.
 */
export function SortCanvas<TStep extends SortStep>({ currStep, maxValue, genSortBarProps }: SortCanvasProps<TStep>) {
	return (
		<div className="min-h-0 min-w-0 w-full flex-1 overflow-x-auto overflow-y-hidden overscroll-x-contain rounded-[14px] border border-slate-700 bg-slate-900 px-4 pt-5 pb-12 scrollbar-thin [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-600 max-[520px]:px-2.5 max-[520px]:pt-4 max-[520px]:pb-10.5">
			<div className="flex h-full w-max min-w-full items-end justify-center gap-0">
				{currStep.arr.map((value, index) => (
					<SortBar key={index} {...genSortBarProps(currStep, value, index, maxValue)} />
				))}
			</div>
		</div>
	);
}
