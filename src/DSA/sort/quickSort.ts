export interface QuickSortStep {
	arr: number[];
	l: number;
	r: number;
	p: number;
	L: number;
	R: number;
}

export function* quickSort(arr: number[], l: number = 0, r: number = arr.length): Generator<QuickSortStep, number[], unknown> {
	const n = r - l;
	if (n <= 1) return [...arr];

	const L = l;
	const R = r;
	const p = arr[l];
	let curr = p;
	for (let i = 0; i < n; i++) {
		if (curr < p) {
			arr[l] = curr;
			curr = arr[++l];
		} else {
			if (r - l < n) arr[r] = curr;
			curr = arr[--r];
		}
		yield { arr: [...arr], l, r, p, L, R }; // yield after placing curr
	}
	arr[l] = p;
	yield { arr: [...arr], l, r, p, L, R }; // yield after inserting pivot

	yield* quickSort(arr, L, l);
	yield* quickSort(arr, r + 1, R);

	return arr;
}
