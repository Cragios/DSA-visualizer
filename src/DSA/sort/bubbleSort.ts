export interface BubbleSortStep {
	arr: number[];
	i: number;
	j: number;
	swapped: boolean;
}

function swap(arr: number[], i: number, j: number): void {
	const temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
	return;
}

export function* bubbleSort(arr: number[]): Generator<BubbleSortStep> {
	yield { arr: [...arr], i: NaN, j: NaN, swapped: false }; // yield initial state
	const n = arr.length;
	for (let i = n; i > 0; i--) {
		let swapped = false;
		for (let j = 0; j < i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				swap(arr, j, j + 1);
				swapped = true;
				yield { arr: [...arr], i, j, swapped: true }; // yield after every comparison
			} else yield { arr: [...arr], i, j, swapped: false }; // yield after every comparison
		}
		if (!swapped) break;
	}
}
