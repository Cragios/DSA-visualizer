import { describe, expect, it } from "vitest";

import { bubbleSort, insertionSort, quickSort } from "../index.ts";

const cases = [
	{ name: "mixed values and duplicates", input: [5, -1, 3, 3, 0], expected: [-1, 0, 3, 3, 5] },
	{ name: "already sorted values", input: [-2, 0, 7], expected: [-2, 0, 7] },
	{ name: "reverse sorted values", input: [4, 3, 2, 1], expected: [1, 2, 3, 4] },
	{ name: "an empty array", input: [], expected: [] },
	{ name: "a single value", input: [42], expected: [42] },
];

function testGeneratorSort(name: string, sort: (input: number[]) => Iterable<{ arr: number[] }>) {
	describe(name, () => {
		it.each(cases)("sorts $name", ({ input, expected }) => {
			const working = [...input];
			const steps = Array.from(sort(working));

			expect(working).toEqual(expected);
			expect(steps.at(-1)?.arr).toEqual(expected);
		});
	});
}

testGeneratorSort("bubbleSort", bubbleSort);
testGeneratorSort("insertionSort", insertionSort);

describe("quickSort", () => {
	it.each(cases)("sorts $name", ({ input, expected }) => {
		const working = [...input];
		const iterator = quickSort(working);
		let result = iterator.next();

		while (!result.done) {
			result = iterator.next();
		}

		expect(result.value).toEqual(expected);
		expect(working).toEqual(expected);
	});
});
