import { insertionSort, type InsertionSortStep } from "../DSA";
import { SORT_COLORS } from "../components";
import { SortVisualizer } from "../components";
import type { SortBarProps, SortMarkersProps } from "../components";

function InsertionSortPage({ arr }: { arr: number[] }) {
	return (
		<SortVisualizer
			title="Insertion Sort"
			arr={arr}
			generator={insertionSort}
			genMarkersProps={(currStep: InsertionSortStep): SortMarkersProps => {
				const hasCurrentIndices = Number.isFinite(currStep.i) && Number.isFinite(currStep.j);
				const inserting = hasCurrentIndices && currStep.inserted;

				return {
					markers: [
						{ key: "i", value: currStep.i, note: "key index", colorClass: SORT_COLORS.boundary },
						{
							key: "j",
							value: currStep.j,
							note: "comparison index",
							colorClass: SORT_COLORS.pointer,
						},
						{ key: "key", value: currStep.key, note: "value to insert", colorClass: SORT_COLORS.key },
					],
					note: !hasCurrentIndices
						? "Initial array"
						: inserting
							? `key ≥ arr[j] | Insert key(${currStep.key}) at j+1(${currStep.j + 1})`
							: `key < arr[j] | Shift ${currStep.arr[currStep.j]} from j(${currStep.j}) to j+1(${currStep.j + 1})`,
				};
			}}
			genSortBarProps={(currStep: InsertionSortStep, value: number, index: number, maxValue: number): SortBarProps => {
				const roles: string[] = [];
				if (index === currStep.j + 1 && currStep.inserted) roles.push("key");
				if (index === currStep.j) roles.push("j");
				if (index === currStep.j + 1) roles.push("j+1");
				if (index === currStep.i) roles.push("i");

				const isBoundary = index === currStep.i;
				const isPointer = index === currStep.j || index === currStep.j + 1;
				const isKey = index === currStep.j + 1 && currStep.inserted;
				const bgClass = isKey
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

export default InsertionSortPage;
