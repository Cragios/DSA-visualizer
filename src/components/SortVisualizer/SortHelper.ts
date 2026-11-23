export const SORT_COLORS = {
	base: "bg-slate-600",
	pointer: "bg-blue-600",
	key: "bg-emerald-600",
	boundary: "bg-rose-600",
} as const;

export interface SortStep {
	arr: number[];
}
export type SortGenerator<TStep extends SortStep> = (array: number[]) => Iterable<TStep>;
