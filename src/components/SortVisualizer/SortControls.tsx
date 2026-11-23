import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

const controlButtonClass =
	"grid size-10 shrink-0 place-items-center rounded-[10px] border border-transparent p-0 transition-[background,border-color,transform,box-shadow] duration-150 hover:-translate-y-px focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-indigo-400 disabled:translate-y-0 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none motion-reduce:transition-none";
const stepButtonClass = `${controlButtonClass} border-slate-700 bg-slate-800 text-slate-200 hover:border-slate-600 hover:bg-slate-700`;
const playbackButtonClass = `${controlButtonClass} bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-lg`;

type ControlIconName = "play" | "pause" | "restart" | "previous" | "next";

/**
 * Renders the icon for a sorting playback control.
 * @param name The control icon to display.
 */
function ControlIcon({ name }: { name: ControlIconName }) {
	return (
		<svg className="size-4.75" aria-hidden="true" viewBox="0 0 24 24">
			{name === "play" && <path fill="currentColor" d="M7 4.5v15L19 12 7 4.5z" />}
			{name === "pause" && <path fill="currentColor" d="M6 5h4v14H6zM14 5h4v14h-4z" />}
			{name === "restart" && <path fill="currentColor" d="M12 5V1L7 6l5 5V7a5 5 0 1 1-4.9 6h-2A7 7 0 1 0 12 5z" />}
			{name === "previous" && <path fill="currentColor" d="M6 5h2v14H6zM18 6v12l-9-6 9-6z" />}
			{name === "next" && <path fill="currentColor" d="M16 5h2v14h-2zM6 6v12l9-6-9-6z" />}
		</svg>
	);
}

/** Properties used by the sorting playback controls. */
export interface SortControlsProps {
	/** Current position in the sorting steps. */
	step: number;
	/** Sets the current step directly or from its previous value. */
	setStep: Dispatch<SetStateAction<number>>;
	/** Total number of sorting steps. */
	stepsLen: number;
}

/**
 * Renders controls for navigating and playing through sorting steps.
 * @param props Current step, step setter, and total number of steps.
 */
export function SortControls({ step, setStep, stepsLen }: SortControlsProps) {
	const [playing, setPlaying] = useState(false);
	const stepRef = useRef<number>(step);
	const timerRef = useRef<number | null>(null);

	/** Clears the active playback interval, if present. */
	const clearTimer = () => {
		if (timerRef.current !== null) window.clearInterval(timerRef.current);
		timerRef.current = null;
	};

	/**
	 * Stops playback and applies a step update within the available range.
	 * @param newStep The target step or an updater based on the current step.
	 */
	const changeStep = (newStep: SetStateAction<number>) => {
		clearTimer();
		setPlaying(false);
		setStep((currStep) => {
			const requestedStep = typeof newStep === "function" ? newStep(currStep) : newStep;
			return Math.min(Math.max(requestedStep, 0), Math.max(stepsLen - 1, 0));
		});
	};

	useEffect(() => {
		stepRef.current = step;
	}, [step]);

	// Advance the animation on a timer and stop playback after the final step.
	useEffect(() => {
		if (!playing || !(stepsLen >= 1)) return clearTimer;
		if (playing && stepsLen >= 1) {
			timerRef.current = window.setInterval(() => {
				if (stepRef.current >= stepsLen - 1) setPlaying(false);
				if (stepRef.current < stepsLen - 1) {
					stepRef.current += 1;
					setStep(stepRef.current);
				}
			}, 250);
			return clearTimer;
		}
		return clearTimer;
	}, [playing, setStep, stepsLen]);

	return (
		<div className="mt-5.5 grid shrink-0 grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 border-t border-slate-700 pt-4.25 max-[520px]:grid-cols-1 max-[520px]:gap-y-2.25 [@media(max-height:700px)]:mt-3 [@media(max-height:700px)]:gap-x-3.5 [@media(max-height:700px)]:gap-y-2 [@media(max-height:700px)]:pt-2.5 [@media(max-height:700px)_and_(max-width:520px)]:gap-y-1.5">
			<span className="col-start-1 row-start-2 text-[12px] font-semibold tracking-[0.01em] text-slate-400 max-[520px]:col-start-1 max-[520px]:row-start-2">
				Step {step} of {stepsLen - 1}
			</span>
			<input
				className="col-span-full row-start-1 m-0 h-6 w-full appearance-none rounded-full bg-transparent focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-indigo-400 [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-slate-700 [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-slate-700 [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-slate-900 [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:shadow-sm [&::-moz-range-thumb]:h-3.25 [&::-moz-range-thumb]:w-3.25 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-slate-900 [&::-moz-range-thumb]:bg-indigo-600 [&::-moz-range-thumb]:shadow-sm"
				type="range"
				aria-label="Sorting step"
				min={0}
				max={Math.max(stepsLen - 1, 0)}
				value={step}
				onChange={(event) => changeStep(Number(event.currentTarget.value))}
			/>
			<div
				className="col-start-2 row-start-2 flex gap-2 max-[520px]:col-start-1 max-[520px]:row-start-3 max-[520px]:justify-center"
				role="group"
				aria-label="Playback controls"
			>
				<button
					className={stepButtonClass}
					type="button"
					onClick={() => changeStep((currStep) => currStep - 1)}
					disabled={step === 0 || !(stepsLen > 0)}
					aria-label="Previous step"
					title="Previous step"
				>
					<ControlIcon name="previous" />
				</button>
				<button
					className={playbackButtonClass}
					type="button"
					onClick={() => setPlaying((isPlaying) => !isPlaying)}
					disabled={!(stepsLen > 0) || (!playing && step === stepsLen - 1)}
					aria-label={playing ? "Pause" : "Play"}
					title={playing ? "Pause" : "Play"}
					aria-pressed={playing}
				>
					<ControlIcon name={playing ? "pause" : "play"} />
				</button>
				<button
					className={stepButtonClass}
					type="button"
					onClick={() => changeStep((currStep) => currStep + 1)}
					disabled={step >= stepsLen - 1 || !(stepsLen > 0)}
					aria-label="Next step"
					title="Next step"
				>
					<ControlIcon name="next" />
				</button>
				<button
					className={stepButtonClass}
					type="button"
					onClick={() => changeStep(0)}
					disabled={!(stepsLen > 0)}
					aria-label="Restart"
					title="Restart"
				>
					<ControlIcon name="restart" />
				</button>
			</div>
		</div>
	);
}
