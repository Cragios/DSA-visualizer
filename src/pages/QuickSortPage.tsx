import { quickSort, type QuickSortStep } from "../DSA";
import { SORT_COLORS } from "../components";
import { SortVisualizer } from "../components";
import type { SortBarProps, SortMarkersProps } from "../components";

function QuickSortPage({ arr }: { arr: number[] }) {
	return (
		<SortVisualizer
			title="Quick Sort"
			arr={arr}
			generator={quickSort}
			genMarkersProps={(currStep: QuickSortStep): SortMarkersProps => ({
				markers: [
					{ key: "l", value: currStep.l, note: "left pointer", colorClass: SORT_COLORS.pointer },
					{ key: "r", value: currStep.r, note: "right pointer", colorClass: SORT_COLORS.pointer },
					{ key: "p", value: currStep.p, note: "pivot value", colorClass: SORT_COLORS.key },
				],
				note: `Partitioning around pivot ${currStep.p}`,
			})}
			genSortBarProps={(currStep: QuickSortStep, value: number, index: number, maxValue: number): SortBarProps => {
				const roles: string[] = [];
				if (index === currStep.L) roles.push("L");
				if (index === currStep.R) roles.push("R");
				if (index === currStep.l) roles.push("l");
				if (index === currStep.r) roles.push("r");

				const isBoundary = index === currStep.L || index === currStep.R;
				const isPivot = index === currStep.l && index === currStep.r;
				const isPointer = index === currStep.l || index === currStep.r;
				const bgClass = isBoundary
					? SORT_COLORS.boundary
					: isPivot
						? SORT_COLORS.key
						: isPointer
							? SORT_COLORS.pointer
							: SORT_COLORS.base;

				return { index, value, maxValue, roles, bgClass };
			}}
		/>
	);
}

export default QuickSortPage;
