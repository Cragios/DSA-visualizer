import { useMemo, useState } from "react";

import { SortMarkers, SortCanvas, SortControls } from "../../components";
import type {
	SortStep,
	SortGenerator,
	SortControlsProps,
	SortMarkersProps,
	SortCanvasProps,
	SortBarProps,
} from "../../components";

/** Configuration required to render a sorting algorithm visualization. */
export interface SortVisualizerProps<TStep extends SortStep> {
	/** Title displayed above the visualization. */
	title: string;
	/** Initial array supplied to the algorithm. */
	arr: number[];
	/** Generator that yields the algorithm's states for the array. */
	generator: SortGenerator<TStep>;
	/** Builds marker display properties for a given step. */
	genMarkersProps: (step: TStep) => SortMarkersProps;
	/** Builds display properties for each array bar. */
	genSortBarProps: (step: TStep, value: number, index: number, maxValue: number) => SortBarProps;
}

/**
 * Renders a sorting algorithm's steps, markers, bars, and playback controls.
 * @param props Algorithm title, input array, step generator, and display-props builders.
 */
export function SortVisualizer<TStep extends SortStep>({
	title,
	arr,
	generator,
	genMarkersProps,
	genSortBarProps,
}: SortVisualizerProps<TStep>) {
	const steps = useMemo(() => Array.from(generator([...arr])), [generator, arr]);
	const [step, setStep] = useState(0);
	const currStep = steps[step];

	const canvasProps: SortCanvasProps<TStep> = {
		currStep,
		maxValue: Math.max(...arr),
		genSortBarProps,
	};

	const controlProps: SortControlsProps = {
		step,
		setStep,
		stepsLen: steps.length,
	};

	return (
		<div className="mx-auto flex min-h-0 w-full max-w-230 flex-1 flex-col rounded-[20px] border border-slate-700 bg-slate-900 p-[clamp(20px,3.5vw,32px)] font-sans text-slate-100 shadow-xl max-[520px]:rounded-2xl max-[520px]:px-3.5 max-[520px]:py-4 [@media(max-height:700px)]:px-6 [@media(max-height:700px)]:py-4 [@media(max-height:700px)_and_(max-width:520px)]:p-3">
			<h1 className="mb-3.5 shrink-0 text-[clamp(28px,5vw,40px)] leading-tight font-bold tracking-[-0.045em] text-slate-100 [@media(max-height:700px)]:mb-2.5 [@media(max-height:700px)]:text-[clamp(24px,4vh,32px)]">
				{title}
			</h1>
			{currStep !== undefined && <SortMarkers {...genMarkersProps(currStep)} />}
			{currStep !== undefined ? <SortCanvas {...canvasProps} /> : <p>No sorting steps to display.</p>}
			{steps.length > 0 && <SortControls {...controlProps} />}
		</div>
	);
}
