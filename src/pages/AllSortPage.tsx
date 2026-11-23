import { useState } from "react";
import type { SubmitEvent, SubmitEventHandler } from "react";

import BubbleSortPage from "./BubbleSortPage";
import InsertionSortPage from "./InsertionSortPage";
import QuickSortPage from "./QuickSortPage";

const tabs = [
	{ id: "bubble-sort", label: "Bubble Sort", Page: BubbleSortPage },
	{ id: "insertion-sort", label: "Insertion Sort", Page: InsertionSortPage },
	{ id: "quick-sort", label: "Quick Sort", Page: QuickSortPage },
];
const initArrLen = 20;
const initArr = Array.from<number, number>({ length: Number(initArrLen) }, () => Math.ceil(Math.random() * 100));
const minArrLen = 2;
const maxArrLen = 100;

function AllSortPage() {
	const [activeTab, setActiveTab] = useState(0);
	const [arr, setArr] = useState(initArr);
	const activePage = tabs[activeTab];
	const ActivePage = activePage.Page;

	const handleRandomizeArray: SubmitEventHandler<HTMLFormElement> = (event: SubmitEvent) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		if (!form.reportValidity()) return;
		const length = Number(new FormData(form).get("array-length"));
		setArr(Array.from<number, number>({ length }, () => Math.ceil(Math.random() * 100)));
	};

	return (
		<main className="flex h-svh min-h-150 w-full flex-col gap-3 overflow-hidden p-[clamp(12px,2vw,24px)] text-slate-100 [@media(max-height:700px)]:gap-2 [@media(max-height:700px)]:p-3">
			<div
				className="mx-auto flex w-full max-w-230 shrink-0 gap-1.5 rounded-[14px] border border-slate-700 bg-slate-900 p-1.5"
				role="tablist"
				aria-label="Sorting algorithms"
			>
				{tabs.map((tab, index) => {
					const selected = activeTab === index;

					return (
						<button
							key={tab.id + index}
							className={[
								"min-h-10.5 min-w-0 flex-1 rounded-[9px] border border-transparent px-3 py-2 text-[13px] font-semibold transition-[background,color,border-color] duration-150 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-indigo-400 motion-reduce:transition-none max-[520px]:min-h-10 max-[520px]:px-1 max-[520px]:py-1.75 max-[520px]:text-xs",
								selected
									? "bg-indigo-600 text-white shadow-md"
									: "bg-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-800 hover:text-slate-100",
							].join(" ")}
							id={`${tab.id}-tab`}
							type="button"
							role="tab"
							aria-selected={selected}
							aria-controls="algorithm-panel"
							onClick={() => setActiveTab(index)}
						>
							{tab.label}
						</button>
					);
				})}
			</div>
			<form
				className="mx-auto flex w-full max-w-230 shrink-0 flex-wrap items-center justify-end gap-2.5"
				onSubmit={handleRandomizeArray}
			>
				<label className="flex items-center gap-2 text-sm font-medium text-slate-300" htmlFor="array-length">
					Array length
					<input
						className="w-20 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-2 text-center text-slate-100 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
						id="array-length"
						name="array-length"
						type="number"
						min={minArrLen}
						max={maxArrLen}
						step={1}
						required
						defaultValue={initArrLen}
					/>
				</label>
				<button
					className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
					type="submit"
				>
					Randomize array
				</button>
			</form>
			<section
				className="flex w-full min-h-0 flex-1"
				id="algorithm-panel"
				role="tabpanel"
				aria-labelledby={`${activePage.id}-tab`}
				tabIndex={0}
			>
				<ActivePage arr={arr} />
			</section>
		</main>
	);
}

export default AllSortPage;
