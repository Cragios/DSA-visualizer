import { bubbleSort, type BubbleSortStep } from "../DSA";
import { SortVisualizer } from "../components";
import type { SortMarkersProps, SortBarProps } from "../components";
import { SORT_COLORS } from "../components";

function BubbleSortPage({ arr }: { arr: number[] }) {
	return (
		<SortVisualizer
			title="Bubble Sort"
			arr={arr}
			generator={bubbleSort}
			genMarkersProps={(currStep: BubbleSortStep): SortMarkersProps => ({
				markers: [
					{ key: "i", value: currStep.i, note: "pass boundary", colorClass: SORT_COLORS.boundary },
					{ key: "j", value: currStep.j, note: "left comparison index", colorClass: SORT_COLORS.pointer },
				],
				note: !(Number.isFinite(currStep.i) && Number.isFinite(currStep.j))
					? "Initial array"
					: currStep.swapped
						? `Swapping positions ${currStep.j} and ${currStep.j + 1}`
						: `Comparing positions ${currStep.j} and ${currStep.j + 1}`,
			})}
			genSortBarProps={(currStep: BubbleSortStep, value: number, index: number, maxValue: number): SortBarProps => {
				const roles: string[] = [];
				if (index === currStep.i) roles.push("i");
				if (index === currStep.j) roles.push("j");
				else if (index === currStep.j + 1) roles.push("j+1");

				const isBoundary = index === currStep.i;
				const isPointer = index === currStep.j || index === currStep.j + 1;
				const isSwapped = isPointer && currStep.swapped;
				const bgClass = isSwapped
					? SORT_COLORS.key
					: isBoundary
						? SORT_COLORS.boundary
						: isPointer
							? SORT_COLORS.pointer
							: SORT_COLORS.base;

				return { index, value, maxValue, roles, bgClass };
			}}
		/>
	);
}

export default BubbleSortPage;
