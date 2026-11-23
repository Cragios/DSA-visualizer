export interface InsertionSortStep {
	arr: number[];
	i: number;
	j: number;
	key: number;
	inserted: boolean;
}

function shift(arr: number[], from: number, to: number): void {
	arr[to] = arr[from];
}

function insert(arr: number[], index: number, value: number): void {
	arr[index] = value;
}

export function* insertionSort(arr: number[]): Generator<InsertionSortStep> {
	yield { arr: [...arr], i: NaN, j: NaN, key: NaN, inserted: false }; // yield initial state
	const n = arr.length;
	for (let i = 1; i < n; i++) {
		const key = arr[i];
		let j = i - 1;
		while (j >= 0 && key < arr[j]) {
			shift(arr, j, j + 1);
			yield { arr: [...arr], i, j, key, inserted: false }; // yield after every shift
			j--;
		}
		insert(arr, j + 1, key);
		yield { arr: [...arr], i, j, key, inserted: true }; // yield after inserting
	}
	return arr;
}
