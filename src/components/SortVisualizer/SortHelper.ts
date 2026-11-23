/** Tailwind background classes used to identify sorting-bar roles. */
export const SORT_COLORS = {
	base: "bg-slate-600",
	pointer: "bg-blue-600",
	key: "bg-emerald-600",
	boundary: "bg-rose-600",
} as const;

/** Minimum state shape required for a sorting algorithm step. */
export interface SortStep {
	/** Array values at this point in the algorithm. */
	arr: number[];
}

/** Produces the sequence of visualization states for an input array. */
export type SortGenerator<TStep extends SortStep> = (array: number[]) => Iterable<TStep>;
